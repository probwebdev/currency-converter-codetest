import { oxrRouter } from './routers/oxr';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  oxr: oxrRouter,
});

export type AppRouter = typeof appRouter;
export type * from './routers/oxr.types';
