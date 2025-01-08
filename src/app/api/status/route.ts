import { type Maintenance, type ServiceStatus } from "@prisma/client";
import { type IncidentWithTimeline, type ServiceUpdate } from "types";
import { db } from "~/server/db";

export default async function GET() {
  const [services, activeIncidents, maintenanceEvents] = await Promise.all([
    getLatestServiceUpdates(),
    getActiveIncidents(),
    getUpcomingMaintenance(),
  ]);
  const overallStatus = getOverallStatus(services);

  return {
    services,
    maintenanceEvents,
    activeIncidents,
    overallStatus,
  };
}

const getLatestServiceUpdates = async (): Promise<ServiceUpdate[]> => {
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
};

const getUpcomingMaintenance = async (): Promise<Maintenance[]> => {
  const maintenanceEvents = await db.maintenance.findMany({
    where: {
      endTime: {
        gte: new Date(),
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return maintenanceEvents;
};

const getActiveIncidents = async (): Promise<IncidentWithTimeline[]> => {
  const incidents = await db.incident.findMany({
    where: {
      status: {
        not: "RESOLVED",
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      timeline: {
        orderBy: {
          date: "desc",
        },
      },
    },
  });

  return incidents;
};

const getOverallStatus = (services: ServiceUpdate[]): ServiceStatus => {
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
