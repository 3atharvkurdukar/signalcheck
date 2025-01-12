import { type IncidentStatus, type ServiceStatus } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type RouterOutputs } from "~/trpc/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getServiceStatusName = (status: ServiceStatus | null) => {
  switch (status) {
    case "OPERATIONAL":
      return "Operational";
    case "DEGRADED":
      return "Degraded Performance";
    case "PARTIAL_OUTAGE":
      return "Partial Outage";
    case "MAJOR_OUTAGE":
      return "Major Outage";
    default:
      return "Unknown";
  }
};

export const getIncidentStatusName = (status: IncidentStatus) => {
  switch (status) {
    case "INVESTIGATING":
      return "Investigating";
    case "IDENTIFIED":
      return "Identified";
    case "MONITORING":
      return "Monitoring";
    case "RESOLVED":
      return "Resolved";
    default:
      return "Unknown";
  }
};

export const getOverallStatus = (
  services: RouterOutputs["service"]["getLatestServiceUpdate"],
): ServiceStatus => {
  if (services.some((service) => service.status === "MAJOR_OUTAGE")) {
    return "MAJOR_OUTAGE";
  }

  if (services.some((service) => service.status === "PARTIAL_OUTAGE")) {
    return "PARTIAL_OUTAGE";
  }

  if (services.some((service) => service.status === "DEGRADED")) {
    return "DEGRADED";
  }

  return "OPERATIONAL";
};
