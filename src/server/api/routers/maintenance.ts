import {
  listMaintenanceSchema,
  scheduleMaintenanceSchema,
} from "../schema/maintenance";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const maintenanceRouter = createTRPCRouter({
  scheduleMaintenance: protectedProcedure
    .input(scheduleMaintenanceSchema)
    .mutation(
      async ({
        ctx: { db },
        input: { serviceId, startTime, endTime, title },
      }) => {
        const newMaintenance = await db.maintenance.create({
          data: {
            service: {
              connect: {
                id: serviceId,
              },
            },
            title,
            startTime,
            endTime,
          },
        });
        return newMaintenance;
      },
    ),

  listMaintenance: publicProcedure
    .input(listMaintenanceSchema)
    .query(async ({ ctx: { db }, input: { activeOnly } }) => {
      return db.maintenance.findMany({
        where: activeOnly ? { endTime: { gte: new Date() } } : undefined,
        include: {
          service: true,
        },
      });
    }),
});
