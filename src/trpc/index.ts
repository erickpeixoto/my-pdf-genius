import {
  privateProcedure,
  router,
} from './trpc'
import { TRPCError } from '@trpc/server'
import { db } from '@/db'
import { z } from 'zod'
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query'
import { absoluteUrl } from '@/lib/utils'
import {
  getUserSubscriptionPlan,
  stripe,
} from '@/lib/stripe'
import { PLANS } from '@/config/stripe'
import Stripe from 'stripe'
import { getUserPreferredLanguage } from '@/lib/dictionary'


export const  appRouter  =  router({

  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const filesWithMessageCount = await db.file.findMany({
      where: {
        userId,
      },
      include: {
        _count: {
          select: { messages: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // temporary
    });

    return filesWithMessageCount
  }),

  createStripeSession: privateProcedure
    .input(
      z.object({
        isSubscribed: z.boolean().optional(),
        isManagedMode: z.boolean().optional(),
        planName:  z.union([
          z.literal('explorer'),
          z.literal('champion'),
          z.literal('elite')
        ]),
      })
    )
    .mutation(
      async ({ ctx, input }) => {
        const { userId } = ctx
        const billingUrl = absoluteUrl('/dashboard/billing')
        const lang = getUserPreferredLanguage();
        
        if (!userId)
          throw new TRPCError({ code: 'UNAUTHORIZED' })

        const dbUser = await db.user.findFirst({
          where: {
            id: userId,
          },
        })

        if (!dbUser)
          throw new TRPCError({ code: 'UNAUTHORIZED' })

        // if the user is already subscribed, redirect to billing page
        if (input.isSubscribed && input.isManagedMode) {
          const subscriptionPlan = await getUserSubscriptionPlan()

          if (subscriptionPlan && dbUser.stripeCustomerId) {
         
            const stripeSession = await stripe.billingPortal.sessions.create({
              customer: dbUser.stripeCustomerId
            })
            return { url: stripeSession.url }
          }
        }
        const environment = process.env.NODE_ENV === 'production' ? 'production' : 'test';
        const pricePlan = PLANS.find((plan) => plan.slug === input.planName)?.price.priceIds[environment]
       
        const stripeSessionConfig = {
          success_url: billingUrl,
          cancel_url: billingUrl,
          payment_method_types: ['card'],
          mode: 'subscription',
          currency: lang === 'pt-br' ? 'brl' : 'usd', 
          billing_address_collection: 'auto',
          line_items: [{
              price: pricePlan, 
              quantity: 1,
            }],
          metadata: {
            userId: userId,
          },
      
        } as Stripe.Checkout.SessionCreateParams;

        if (!input.isSubscribed && input.planName === 'explorer') {
          stripeSessionConfig.subscription_data = {
            trial_period_days: 10,
          };
          stripeSessionConfig.payment_method_collection = 'if_required';
        }

        const stripeSession = await stripe.checkout.sessions.create(stripeSessionConfig)
        return { url: stripeSession.url }
      }
    ),
  

  getFileMessages: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        fileId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx
      const { fileId, cursor } = input
      const limit = input.limit ?? INFINITE_QUERY_LIMIT

      const file = await db.file.findFirst({
        where: {
          id: fileId,
          userId,
        },
      })

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

      const messages = await db.message.findMany({
        take: limit + 1,
        where: {
          fileId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          id: true,
          isUserMessage: true,
          createdAt: true,
          text: true,
        },
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (messages.length > limit) {
        const nextItem = messages.pop()
        nextCursor = nextItem?.id
      }

      return {
        messages,
        nextCursor,
      }
    }),

  getFileUploadStatus: privateProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ input, ctx }) => {
      const file = await db.file.findFirst({
        where: {
          id: input.fileId,
          userId: ctx.userId,
        },
      })

      if (!file) return { status: 'PENDING' as const }

      return { status: file.uploadStatus }
    }),

  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx

      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId,
        },
      })

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

      return file
    }),

  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx

      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      })

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

      await db.file.delete({
        where: {
          id: input.id,
        },
      })

      return file
    }),

  getQuestions: privateProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ input }) => {
      
      const { fileId } = input
      
      const response = await fetch('http://localhost:3000/api/questions', {
        method: 'POST',
        body: JSON.stringify({
          fileId
        }),
      })

      return response
    }),
})

export type AppRouter = typeof appRouter
