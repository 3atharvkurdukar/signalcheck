import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  listIncidentsSchema,
  reportIncidentSchema,
  updateIncidentTimelineSchema as updateIncidentSchema,
} from "../schema/incident";

export const incidentRouter = createTRPCRouter({
  reportIncident: protectedProcedure
    .input(reportIncidentSchema)
    .mutation(async ({ ctx: { db }, input: { serviceId, title } }) => {
      const newIncident = await db.incident.create({
        data: {
          title: title,
          service: {
            connect: {
              id: serviceId,
            },
          },
          status: "IDENTIFIED",
          timeline: {
            create: {
              date: new Date(),
              message: "A new incident was added",
            },
          },
        },
      });
      return newIncident;
    }),

  listIncidents: publicProcedure
    .input(listIncidentsSchema)
    .query(async ({ ctx: { db }, input: { activeOnly } }) => {
      return db.incident.findMany({
        where: activeOnly ? { status: { not: "RESOLVED" } } : undefined,
        include: {
          timeline: {
            orderBy: {
              date: "desc",
            },
          },
          service: true,
        },
      });
    }),

  updateIncident: protectedProcedure
    .input(updateIncidentSchema)
    .mutation(
      async ({ ctx: { db }, input: { incidentId, message, status } }) => {
        const incident = await db.incident.findUnique({
          where: { id: incidentId },
        });
        if (!incident) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Incident not found",
          });
        }

        const updatedIncident = await db.incident.update({
          where: { id: incidentId },
          data: {
            status: status,
            timeline: {
              create: {
                date: new Date(),
                message: message,
              },
            },
          },
        });
        return updatedIncident;
      },
    ),
});
