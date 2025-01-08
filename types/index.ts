import {
  type Incident,
  type Maintenance,
  type ServiceStatus,
  type TimelineItem,
} from "@prisma/client";

export type ServiceUpdate = {
  name: string;
  status: string | null;
  date: Date | null;
};

export type IncidentWithTimeline = Incident & {
  timeline: TimelineItem[];
};

export type StatusResponse = {
  services: ServiceUpdate[];
  maintenanceEvents: Maintenance[];
  activeIncidents: IncidentWithTimeline[];
  overallStatus: ServiceStatus;
};
