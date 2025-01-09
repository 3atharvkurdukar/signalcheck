import {
  type Incident,
  type Maintenance,
  type Service,
  type ServiceStatus,
  type StatusHistory,
  type TimelineItem,
} from "@prisma/client";

export type ServiceUpdate = {
  name: string;
  status: string | null;
  date: Date | null;
  statusHistory: StatusHistory[];
};

export type IncidentDetails = Incident & {
  timeline: TimelineItem[];
  service: Service;
};

export type MaintenanceDetails = Maintenance & {
  service: Service;
};

export type StatusResponse = {
  services: ServiceUpdate[];
  maintenanceEvents: Maintenance[];
  activeIncidents: IncidentDetails[];
  overallStatus: ServiceStatus;
};
