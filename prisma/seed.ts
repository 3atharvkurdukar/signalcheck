import { PrismaClient, ServiceStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.service.create({
    data: {
      name: "API",
      statusHistory: {
        createMany: {
          data: [
            {
              status: ServiceStatus.DEGRADED,
              date: new Date("2025-01-09 12:00 UTC"),
            },
            {
              status: ServiceStatus.OPERATIONAL,
              date: new Date("2025-01-08 12:00 UTC"),
            },
            {
              status: ServiceStatus.OPERATIONAL,
              date: new Date("2025-01-07 12:00 UTC"),
            },
          ],
        },
      },
      incidents: {
        create: {
          title: "Increased API Latency",
          status: "IDENTIFIED",
          createdAt: new Date("2025-01-09 12:00 UTC"),
          updatedAt: new Date("2025-01-09 12:00 UTC"),
          timeline: {
            createMany: {
              data: [
                {
                  message: "We have identified increased latency in the API",
                  date: new Date("2025-01-09 12:00 UTC"),
                },
              ],
            },
          },
        },
      },
    },
  });

  await prisma.service.create({
    data: {
      name: "Web App",
      statusHistory: {
        createMany: {
          data: [
            {
              status: ServiceStatus.OPERATIONAL,
              date: new Date("2025-01-09 12:00 UTC"),
            },
            {
              status: ServiceStatus.PARTIAL_OUTAGE,
              date: new Date("2025-01-08 12:00 UTC"),
            },
          ],
        },
      },
      incidents: {
        create: {
          title: "Web App Outage",
          status: "RESOLVED",
          createdAt: new Date("2025-01-08 12:00 UTC"),
          updatedAt: new Date("2025-01-08 12:16 UTC"),
          timeline: {
            createMany: {
              data: [
                {
                  message: "We have identified an outage in the Web App",
                  date: new Date("2025-01-08 12:00 UTC"),
                },
                {
                  message: "We have resolved the outage in the Web App",
                  date: new Date("2025-01-08 12:16 UTC"),
                },
              ],
            },
          },
        },
      },
    },
  });

  await prisma.service.create({
    data: {
      name: "Database",
      statusHistory: {
        createMany: {
          data: [
            {
              status: ServiceStatus.OPERATIONAL,
              date: new Date("2025-01-09 12:00 UTC"),
            },
            {
              status: ServiceStatus.OPERATIONAL,
              date: new Date("2025-01-08 12:00 UTC"),
            },
          ],
        },
      },
      maintenances: {
        createMany: {
          data: [
            {
              title: "Database Upgrade",
              startTime: new Date("2025-01-16 02:00 UTC"),
              endTime: new Date("2025-01-16 04:00 UTC"),
            },
          ],
        },
      },
    },
  });

  await prisma.service.create({
    data: {
      name: "CDN",
      statusHistory: {
        createMany: {
          data: [
            {
              status: ServiceStatus.OPERATIONAL,
              date: new Date("2025-01-09 12:00 UTC"),
            },
            {
              status: ServiceStatus.MAJOR_OUTAGE,
              date: new Date("2025-01-08 12:00 UTC"),
            },
          ],
        },
      },
      incidents: {
        create: {
          title: "CDN Outage in EU Region",
          status: "RESOLVED",
          createdAt: new Date("2025-01-08 12:00 UTC"),
          updatedAt: new Date("2025-01-08 14:20 UTC"),
          timeline: {
            createMany: {
              data: [
                {
                  message:
                    "We have identified an outage in the EU region for the CDN",
                  date: new Date("2025-01-08 12:00 UTC"),
                },
                {
                  message:
                    "We have resolved the outage in the EU region for the CDN",
                  date: new Date("2025-01-08 14:20 UTC"),
                },
              ],
            },
          },
        },
      },
      maintenances: {
        createMany: {
          data: [
            {
              title: "CDN Maintenance",
              startTime: new Date("2025-01-06 02:00 UTC"),
              endTime: new Date("2025-01-06 04:00 UTC"),
            },
          ],
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
