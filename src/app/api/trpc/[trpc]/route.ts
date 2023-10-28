import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/trpc'
import { Handlers } from '@highlight-run/node'
import { H } from '@highlight-run/node'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
    onError: ({ error, req }) => {
  
      Handlers.trpcOnError({ error, req } as any, { projectID: 'odzlr0le', serviceName: 'mypdf-genius-trpc', serviceVersion: 'git-sha' })
    },
  })

export { handler as GET, handler as POST }
 H.init({projectID: 'odzlr0le'})