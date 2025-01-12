import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { incidentRouter } from "./routers/incident";
import { maintenanceRouter } from "./routers/maintenance";
import { serviceRouter } from "./routers/service";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  service: serviceRouter,
  incident: incidentRouter,
  maintenance: maintenanceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
