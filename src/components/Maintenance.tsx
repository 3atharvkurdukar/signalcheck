import { Calendar, Clock, ServerCog } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type RouterOutputs } from "~/trpc/react";

type MaintenanceDetails =
  RouterOutputs["maintenance"]["listMaintenance"][number];

export default function Maintenance({
  title,
  service,
  startTime,
  endTime,
}: MaintenanceDetails) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const isOngoing = new Date() >= start && new Date() < end;
  const isPast = new Date() > end;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <ServerCog className="mr-2 h-5 w-5 text-blue-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Service</p>
            <p className="font-medium">{service.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            {isOngoing && <Badge variant="outline">Ongoing</Badge>}
            {isPast && <Badge variant="secondary">Completed</Badge>}
            {!isOngoing && !isPast && (
              <Badge variant="default">Scheduled</Badge>
            )}
          </div>
          <div className="col-span-2">
            <p className="mb-1 flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              Date
            </p>
            <p className="font-medium">
              {start.toLocaleDateString()} - {end.toLocaleDateString()}
            </p>
          </div>
          <div className="col-span-2">
            <p className="mb-1 flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              Time
            </p>
            <p className="font-medium">
              {start.toLocaleTimeString()} - {end.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
