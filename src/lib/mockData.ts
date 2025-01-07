export type Status =
  | "Operational"
  | "Degraded Performance"
  | "Partial Outage"
  | "Major Outage";
export type EventType = "incident" | "maintenance";
export type EventStatus =
  | "Investigating"
  | "Identified"
  | "Scheduled"
  | "Resolved"
  | "Monitoring";
export type ServiceStatus = {
  name: string;
  status: Status;
};
export type Event = {
  type: EventType;
  title: string;
  status: EventStatus;
  date: string;
};
export type TimelineItem = {
  date: string;
  title: string;
  description: string;
};

export const services: ServiceStatus[] = [
  { name: "API", status: "Operational" },
  { name: "Web App", status: "Degraded Performance" },
  { name: "Database", status: "Operational" },
  { name: "CDN", status: "Partial Outage" },
  { name: "Authentication", status: "Operational" },
];

export const activeIncidents: Event[] = [
  {
    type: "incident",
    title: "Increased API Latency",
    status: "Investigating",
    date: "2023-06-15 14:30 UTC",
  },
  {
    type: "incident",
    title: "CDN Outage in EU Region",
    status: "Identified",
    date: "2023-06-15 12:45 UTC",
  },
];

export const scheduledMaintenances: Event[] = [
  {
    type: "maintenance",
    title: "Database Upgrade",
    status: "Scheduled",
    date: "2023-06-18 02:00 UTC",
  },
];

export const timelineItems: TimelineItem[] = [
  {
    date: "2023-06-15 14:30 UTC",
    title: "Investigating",
    description: "We are investigating reports of increased API latency.",
  },
  {
    date: "2023-06-15 12:45 UTC",
    title: "Identified",
    description:
      "We have identified the cause of the CDN outage in the EU region.",
  },
  {
    date: "2023-06-15 10:00 UTC",
    title: "Resolved",
    description: "The authentication service issues have been resolved.",
  },
  {
    date: "2023-06-14 22:15 UTC",
    title: "Monitoring",
    description:
      "We are monitoring the database performance after recent optimizations.",
  },
];

export const getOverallStatus = () => {
  if (services.some((service) => service.status === "Major Outage")) {
    return "Major System Outage";
  } else if (services.some((service) => service.status === "Partial Outage")) {
    return "Partial System Outage";
  } else if (
    services.some((service) => service.status === "Degraded Performance")
  ) {
    return "Degraded System Performance";
  } else {
    return "All Systems Operational";
  }
};
