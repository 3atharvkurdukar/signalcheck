import { type ServiceStatus as Status } from "@prisma/client";
import { type ServiceUpdate } from "types";
import ServiceStatus from "./ServiceStatus";
import StatusLabel from "./StatusLabel";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ServiceListCardProps {
  services: ServiceUpdate[];
  overallStatus: Status;
}

export const ServiceList = ({
  services,
  overallStatus,
}: ServiceListCardProps) => {
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
            status={status as Status | null}
            statusHistory={statusHistory}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
