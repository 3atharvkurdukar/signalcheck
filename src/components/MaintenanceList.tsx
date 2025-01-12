import { type RouterOutputs } from "~/trpc/react";
import Maintenance from "./Maintenance";
import { Card, CardContent } from "./ui/card";

export default function MaintenanceList({
  maintenanceEvents,
}: {
  maintenanceEvents: RouterOutputs["maintenance"]["listMaintenance"];
}) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Scheduled Maintenance</h2>
      {maintenanceEvents.length > 0 ? (
        maintenanceEvents.map((maintenance) => (
          <div key={maintenance.id} className="mb-3">
            <Maintenance {...maintenance} />
          </div>
        ))
      ) : (
        <Card>
          <CardContent>
            <p className="text-gray-500">No scheduled maintenance</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
