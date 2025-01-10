import { IncidentStatus } from "@prisma/client";
import { z } from "zod";

export const reportIncidentSchema = z.object({
  serviceId: z.number(),
  title: z.string(),
});

export const updateIncidentTimelineSchema = z.object({
  incidentId: z.number(),
  message: z.string(),
  status: z.nativeEnum(IncidentStatus),
});

export const listIncidentsSchema = z.object({
  activeOnly: z.boolean().optional(),
});

export type ReportIncidentInput = z.infer<typeof reportIncidentSchema>;
export type UpdateIncidentTimelineInput = z.infer<
  typeof updateIncidentTimelineSchema
>;
export type ListIncidentsInput = z.infer<typeof listIncidentsSchema>;
