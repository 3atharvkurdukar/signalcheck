import {
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  XOctagon,
} from "lucide-react";
import { type Status, type ServiceStatus } from "~/lib/mockData";

export default function ServiceStatus({ name, status }: ServiceStatus) {
  const getStatusColor = (status: Status) => {
    switch (status) {
      case "Operational":
        return "text-green-500";
      case "Degraded Performance":
        return "text-yellow-500";
      case "Partial Outage":
        return "text-orange-500";
      case "Major Outage":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "Operational":
        return <CheckCircle className="h-6 w-6" />;
      case "Degraded Performance":
        return <AlertTriangle className="h-6 w-6" />;
      case "Partial Outage":
        return <AlertOctagon className="h-6 w-6" />;
      case "Major Outage":
        return <XOctagon className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between border-b py-3 last:border-b-0">
      <span className="text-gray-700">{name}</span>
      <div className={`flex items-center ${getStatusColor(status)}`}>
        {getStatusIcon(status)}
        <span className="ml-2">{status}</span>
      </div>
    </div>
  );
}
