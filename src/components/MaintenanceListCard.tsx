import { type Maintenance } from "@prisma/client";
import { PenToolIcon as Tool } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function MaintenanceListCard({
  maintenanceEvents,
}: {
  maintenanceEvents: Maintenance[];
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Scheduled Maintenance</CardTitle>
      </CardHeader>
      <CardContent>
        {maintenanceEvents.length > 0 ? (
          maintenanceEvents.map(({ id, title, startTime, endTime }) => (
            <div
              key={id}
              className="flex items-start space-x-3 border-b py-3 last:border-b-0"
            >
              <Tool className="h-6 w-6 flex-shrink-0 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="text-gray-500">
                  {startTime.toLocaleString()} - {endTime.toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No scheduled maintenance</p>
        )}
      </CardContent>
    </Card>
  );
}
