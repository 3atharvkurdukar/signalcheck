import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import IncidentList from "~/components/IncidentList";
import { Button } from "~/components/ui/button";
import Header from "../components/Header";
import MaintenanceList from "../components/MaintenanceList";
import ServiceList from "../components/ServiceList";
import GET from "./api/status/route";

export default async function Home() {
  const { userId } = await auth();
  const { services, maintenanceEvents, activeIncidents, overallStatus } =
    await GET();

  return (
    <div className="min-h-screen bg-zinc-100">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {userId && (
          <div className="mb-8">
            <Button asChild>
              <Link href="/admin">Go to Admin Dashboard</Link>
            </Button>
          </div>
        )}
        <ServiceList services={services} overallStatus={overallStatus} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <IncidentList incidents={activeIncidents} />

          <MaintenanceList maintenanceEvents={maintenanceEvents} />
        </div>
      </main>
    </div>
  );
}
