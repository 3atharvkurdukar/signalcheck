import {
  type ServiceStatus as Status,
  type StatusHistory,
} from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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

const getStatusColor = (status: Status | null) => {
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
      return "bg-zinc-300 dark:bg-zinc-700";
  }
};

const getLast30DaysStatus = (statusHistory: StatusHistory[]) => {
  const today = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString();
  }).reverse();

  return last30Days.map((date) => {
    let status: Status | null = null;
    for (const item of statusHistory) {
      if (item && item.date.toLocaleDateString() === date) {
        status = item.status;
        break;
      }
    }
    return { date, status };
  });
};

export default function ServiceStatus({
  name,
  status,
  statusHistory,
}: ServiceStatusProps) {
  const last30DaysStatus = getLast30DaysStatus(statusHistory);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span>{name}</span>
            <StatusLabel status={status} showIcon />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-0.5">
          {last30DaysStatus.map(({ date, status }, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`h-8 w-full first:rounded-s last:rounded-e ${getStatusColor(status)}`}
                    aria-label={`Status on ${date}: ${getServiceStatusName(status)}`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{date}</p>
                  <p>{getServiceStatusName(status)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">30 days</span>
          <span className="text-xs text-muted-foreground">Today</span>
        </div>
      </CardContent>
    </Card>
  );
}
