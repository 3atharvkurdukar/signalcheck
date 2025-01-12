import { type RouterOutputs } from "~/trpc/react";
import Incident from "./Incident";
import { Card, CardContent } from "./ui/card";

export default function IncidentList({
  incidents,
}: {
  incidents: RouterOutputs["incident"]["listIncidents"];
}) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Active Incidents</h2>
      {incidents.length > 0 ? (
        incidents.map((incident) => (
          <div key={incident.id} className="mb-3">
            <Incident {...incident} />
          </div>
        ))
      ) : (
        <Card>
          <CardContent>
            <p className="text-gray-500">No active incidents</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
