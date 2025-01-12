import { ServiceStatus } from "@prisma/client";
import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string(),
  status: z.nativeEnum(ServiceStatus),
});

export const updateServiceStatusSchema = z.object({
  serviceId: z.number(),
  status: z.nativeEnum(ServiceStatus),
  description: z.string().optional(),
});

export const deleteServiceSchema = z.object({
  serviceId: z.number(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceStatusInput = z.infer<
  typeof updateServiceStatusSchema
>;
export type DeleteServiceInput = z.infer<typeof deleteServiceSchema>;
