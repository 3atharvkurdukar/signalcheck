import { PrismaClient, ServiceStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // await prisma.service.createMany({
  //   data: [
  //     {
  //       name: "API",
  //     },
  //     {
  //       name: "Web App",
  //     },
  //     {
  //       name: "Database",
  //     },
  //     {
  //       name: "CDN",
  //     },
  //     {
  //       name: "Authentication",
  //     },
  //   ],
  // });

  await prisma.statusHistory.create({
    data: {
      service: {
        connect: {
          name: "API",
        },
      },
      status: ServiceStatus.OPERATIONAL,
      date: new Date("2024-06-15 14:30 UTC"),
    },
  });

  await prisma.statusHistory.create({
    data: {
      service: {
        connect: {
          name: "Web App",
        },
      },
      status: ServiceStatus.DEGRADED,
      date: new Date("2024-06-15 14:30 UTC"),
    },
  });

  await prisma.statusHistory.create({
    data: {
      service: {
        connect: {
          name: "Database",
        },
      },
      status: ServiceStatus.PARTIAL_OUTAGE,
      date: new Date("2024-06-15 12:30 UTC"),
    },
  });

  await prisma.statusHistory.create({
    data: {
      service: {
        connect: {
          name: "Database",
        },
      },
      status: ServiceStatus.OPERATIONAL,
      date: new Date("2024-06-15 14:30 UTC"),
    },
  });

  await prisma.statusHistory.create({
    data: {
      service: {
        connect: {
          name: "CDN",
        },
      },
      status: ServiceStatus.PARTIAL_OUTAGE,
      date: new Date("2024-06-15 14:30 UTC"),
    },
  });

  await prisma.statusHistory.create({
    data: {
      service: {
        connect: {
          name: "Authentication",
        },
      },
      status: ServiceStatus.OPERATIONAL,
      date: new Date("2024-06-15 14:30 UTC"),
    },
  });

  // const [inc1, inc2] = await prisma.incident.createManyAndReturn({
  //   data: [
  //     {
  //       title: "Increased API Latency",
  //       status: IncidentStatus.INVESTIGATING,
  //       createdAt: new Date("2024-06-15 14:30 UTC"),
  //       updatedAt: new Date("2024-06-15 14:30 UTC"),
  //     },
  //     {
  //       title: "CDN Outage in EU Region",
  //       status: IncidentStatus.IDENTIFIED,
  //       createdAt: new Date("2024-06-15 12:45 UTC"),
  //     },
  //   ],
  // });

  // if (!!inc1 && !!inc2) {
  //   await prisma.timelineItem.createMany({
  //     data: [
  //       {
  //         message: "We are investigating increased latency in the API",
  //         date: new Date("2024-06-15 14:30 UTC"),
  //         incidentId: inc1.id,
  //       },
  //       {
  //         message: "We have identified increased latency in the API",
  //         date: new Date("2024-06-15 14:00 UTC"),
  //         incidentId: inc1.id,
  //       },
  //       {
  //         message: "We have identified an outage in the EU region for the CDN",
  //         date: new Date("2024-06-15 12:45 UTC"),
  //         incidentId: inc2.id,
  //       },
  //     ],
  //   });
  // }

  // await prisma.maintenance.createMany({
  //   data: [
  //     {
  //       title: "Database Upgrade",
  //       startTime: new Date("2025-01-16 02:00 UTC"),
  //       endTime: new Date("2025-01-16 04:00 UTC"),
  //     },
  //     {
  //       title: "CDN Maintenance",
  //       startTime: new Date("2025-01-01 02:00 UTC"),
  //       endTime: new Date("2025-01-01 04:00 UTC"),
  //     },
  //   ],
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
