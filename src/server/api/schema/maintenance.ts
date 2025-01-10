import { z } from "zod";

export const scheduleMaintenanceSchema = z.object({
  serviceId: z.number(),
  title: z.string(),
  startTime: z.date(),
  endTime: z.date(),
});
export const listMaintenanceSchema = z.object({
  activeOnly: z.boolean().optional(),
});

export type ScheduleMaintenanceInput = z.infer<
  typeof scheduleMaintenanceSchema
>;
export type ListMaintenanceInput = z.infer<typeof listMaintenanceSchema>;
