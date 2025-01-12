import { type ServiceStatus as Status } from "@prisma/client";
import { type RouterOutputs } from "~/trpc/react";
import ServiceStatus from "./ServiceStatus";
import StatusLabel from "./StatusLabel";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ServiceListProps {
  services: RouterOutputs["service"]["getLatestServiceUpdate"];
  overallStatus: Status;
}

export const ServiceList = ({ services, overallStatus }: ServiceListProps) => {
  return (
    <div className="my-4 flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <StatusLabel status={overallStatus} />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {services.map(({ name, status, statusHistory }, index) => (
          <ServiceStatus
            key={index}
            name={name}
            status={status}
            statusHistory={statusHistory}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
