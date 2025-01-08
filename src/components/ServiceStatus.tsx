import {
  type ServiceStatus as Status,
  type StatusHistory,
} from "@prisma/client";
import { Card, CardContent } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { getServiceStatusName } from "~/lib/utils";
import StatusLabel from "./StatusLabel";

interface ServiceStatusProps {
  name: string;
  status: Status | null;
  statusHistory: StatusHistory[];
}

export default function ServiceStatus({
  name,
  status,
  statusHistory,
}: ServiceStatusProps) {
  const getStatusColor = (status: Status) => {
    switch (status) {
      case "OPERATIONAL":
        return "bg-green-500";
      case "DEGRADED":
        return "bg-yellow-500";
      case "PARTIAL_OUTAGE":
        return "bg-orange-500";
      case "MAJOR_OUTAGE":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">{name}</span>
          <StatusLabel status={status} showIcon />
        </div>
        <div className="mt-4 flex space-x-1">
          {statusHistory.map((item, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={`h-8 w-2 rounded ${getStatusColor(item.status)}`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getServiceStatusName(item.status)}</p>
                  <p>{new Date(item.date).toLocaleString()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
