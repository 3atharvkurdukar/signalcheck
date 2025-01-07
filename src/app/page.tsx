import Header from "../components/Header";
import ServiceStatus from "../components/ServiceStatus";
import IncidentMaintenance from "../components/IncidentMaintenance";
import Timeline from "../components/Timeline";
import {
  services,
  activeIncidents,
  scheduledMaintenances,
  timelineItems,
  getOverallStatus,
} from "../lib/mockData";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const overallStatus = getOverallStatus();
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {userId && (
          <div className="mb-8">
            <Link
              href="/admin"
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
            >
              Go to Admin Dashboard
            </Link>
          </div>
        )}
        <div className="mb-8 overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Current Status
            </h2>
            <p
              className={`mb-6 text-lg font-medium ${
                overallStatus === "All Systems Operational"
                  ? "text-green-600"
                  : overallStatus === "Degraded System Performance"
                    ? "text-yellow-600"
                    : overallStatus === "Partial System Outage"
                      ? "text-orange-600"
                      : "text-red-600"
              }`}
            >
              {overallStatus}
            </p>
            <div className="space-y-4">
              {services.map((service, index) => (
                <ServiceStatus
                  key={index}
                  name={service.name}
                  status={service.status}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Active Incidents
              </h2>
              {activeIncidents.length > 0 ? (
                activeIncidents.map((incident, index) => (
                  <IncidentMaintenance key={index} {...incident} />
                ))
              ) : (
                <p className="text-gray-500">No active incidents</p>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Scheduled Maintenance
              </h2>
              {scheduledMaintenances.length > 0 ? (
                scheduledMaintenances.map((maintenance, index) => (
                  <IncidentMaintenance key={index} {...maintenance} />
                ))
              ) : (
                <p className="text-gray-500">No scheduled maintenance</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Recent Incidents and Updates
            </h2>
            <Timeline items={timelineItems} />
          </div>
        </div>
      </main>
    </div>
  );
}
