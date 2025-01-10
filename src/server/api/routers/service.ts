import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  createServiceSchema,
  deleteServiceSchema,
  updateServiceStatusSchema,
} from "../schema/service";

export const serviceRouter = createTRPCRouter({
  addService: protectedProcedure
    .input(createServiceSchema)
    .mutation(async ({ ctx: { db }, input: { name, status } }) => {
      const newService = await db.service.create({
        data: {
          name: name,
          statusHistory: {
            create: {
              status: status,
              date: new Date(),
              description: "A new service was added",
            },
          },
        },
      });
      return newService;
    }),

  listServices: publicProcedure.query(async ({ ctx: { db } }) => {
    return db.service.findMany({});
  }),

  getLatestServiceUpdate: publicProcedure.query(async ({ ctx: { db } }) => {
    const services = await db.service.findMany({
      include: {
        statusHistory: {
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    return services.map((service) => {
      const latestStatus = service.statusHistory.at(0);
      return {
        name: service.name,
        status: latestStatus?.status ?? null,
        date: latestStatus?.date ?? null,
        statusHistory: service.statusHistory,
      };
    });
  }),

  updateServiceStatus: protectedProcedure
    .input(updateServiceStatusSchema)
    .mutation(
      async ({ ctx: { db }, input: { serviceId, status, description } }) => {
        const service = await db.service.findUnique({
          where: {
            id: serviceId,
          },
        });

        if (!service) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Service not found",
          });
        }

        const updatedService = await db.service.update({
          where: {
            id: serviceId,
          },
          data: {
            statusHistory: {
              create: {
                status: status,
                date: new Date(),
                description: description,
              },
            },
          },
        });

        return updatedService;
      },
    ),

  deleteService: protectedProcedure
    .input(deleteServiceSchema)
    .mutation(async ({ ctx: { db }, input: { serviceId } }) => {
      const service = await db.service.findUnique({
        where: {
          id: serviceId,
        },
      });

      if (!service) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Service not found",
        });
      }

      await db.service.delete({
        where: {
          id: serviceId,
        },
      });

      return true;
    }),
});
