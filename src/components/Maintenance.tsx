import { type Maintenance as MaintenanceType } from "@prisma/client";
import { Calendar, Clock, PenToolIcon as Tool } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface MaintenanceProps {
  id: string;
  title: string;
  service: string;
  startTime: string;
  endTime: string;
  description: string;
}

export default function Maintenance({
  title,
  // service,
  startTime,
  endTime,
}: MaintenanceType) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const isOngoing = new Date() >= start && new Date() < end;
  const isPast = new Date() > end;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Tool className="mr-2 h-5 w-5 text-blue-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-4">
          {/* <div>
            <p className="text-sm text-gray-500">Service</p>
            <p className="font-medium">{service}</p>
          </div> */}
          <div>
            <p className="text-sm text-gray-500">Status</p>
            {isOngoing && <Badge variant="outline">Ongoing</Badge>}
            {isPast && <Badge variant="secondary">Completed</Badge>}
            {!isOngoing && !isPast && (
              <Badge variant="default">Scheduled</Badge>
            )}
          </div>
          <div className="col-span-2">
            <p className="mb-1 flex items-center text-sm text-gray-500">
              <Calendar className="mr-1 h-4 w-4" />
              Date
            </p>
            <p className="font-medium">
              {start.toLocaleDateString()} - {end.toLocaleDateString()}
            </p>
          </div>
          <div className="col-span-2">
            <p className="mb-1 flex items-center text-sm text-gray-500">
              <Clock className="mr-1 h-4 w-4" />
              Time
            </p>
            <p className="font-medium">
              {start.toLocaleTimeString()} - {end.toLocaleTimeString()}
            </p>
          </div>
        </div>
        {/* <div>
          <p className="mb-1 text-sm text-gray-500">Description</p>
          <p className="text-sm">{description}</p>
        </div> */}
      </CardContent>
    </Card>
  );
}
