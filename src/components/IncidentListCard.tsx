import { formatDistanceToNow } from "date-fns";
import { AlertTriangle } from "lucide-react";
import { type IncidentWithTimeline } from "types";
import { getIncidentStatusName } from "~/lib/utils";
import Timeline from "./Timeline";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function IncidentListCard({
  incidents,
}: {
  incidents: IncidentWithTimeline[];
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Active Incidents</CardTitle>
      </CardHeader>
      <CardContent>
        {incidents.length > 0 ? (
          incidents.map(({ id, title, status, updatedAt, timeline }) => (
            <div key={id} className="space-y-2 border-b py-3 last:border-b-0">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-6 w-6 flex-shrink-0 text-orange-500" />
                <div className="flex w-full flex-col space-y-2">
                  <div className="flex w-full items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{title}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDistanceToNow(updatedAt, {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <p className="text-orange-500">
                      {getIncidentStatusName(status)}
                    </p>
                  </div>
                  <Timeline items={timeline} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No active incidents</p>
        )}
      </CardContent>
    </Card>
  );
}
