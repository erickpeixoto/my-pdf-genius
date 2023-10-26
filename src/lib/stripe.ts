import { PLANS } from '@/config/stripe'
import { db } from '@/db'

import Stripe from 'stripe'
import { getUser } from './auth'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2023-08-16',
  typescript: true,
})

export async function getUserSubscriptionPlan() {

  const user = await getUser()

  if (!user?.id) {
    return {
      ...PLANS[0],
      isSubscribed: false,
      isCanceled: false,
      stripeCurrentPeriodEnd: null,
    }
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  })


  if (!dbUser) {
    return {
      ...PLANS[0],
      isSubscribed: false,
      isCanceled: false,
      stripeCurrentPeriodEnd: null,
    }
  }

  const isSubscribed = Boolean(
    dbUser.stripePriceId &&
      dbUser.stripeCurrentPeriodEnd && // 86400000 = 1 day
      dbUser.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
  )
  const environment = process.env.NODE_ENV === 'production' ? 'production' : 'test';
  
  const plan = isSubscribed
    ? PLANS.find((plan) => plan.price.priceIds[environment] === dbUser.stripePriceId)
    : null

    let stripePlan; 

    if (dbUser.stripeSubscriptionId) {
    
      try {
        stripePlan = await stripe.subscriptions.retrieve(dbUser.stripeSubscriptionId) as any;
    
        // Plan has been changed
        if (stripePlan.plan.id !== dbUser.stripePriceId) {
          await db.user.update({
            where: {
              id: dbUser.id,
            },
            data: {
              stripeSubscriptionId: stripePlan.id,
              stripeCustomerId: stripePlan.customer as string,
              stripePriceId: stripePlan.plan.id,
              stripeCurrentPeriodEnd: new Date(stripePlan.current_period_end * 1000),
            },
          });
        }
      } catch (error) {
        // Handle errors if the subscription retrieval fails
        console.error("Error retrieving subscription:", error);
      }
    }
 
    console.log('stripePlan', {stripePlan});

  return {
    ...plan,
    stripeSubscriptionId: dbUser.stripeSubscriptionId,
    stripeCurrentPeriodEnd: dbUser.stripeCurrentPeriodEnd,
    stripeCustomerId: dbUser.stripeCustomerId,
    isSubscribed,
    isCanceled: stripePlan?.status === 'canceled',
  }
}