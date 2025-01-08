import { type ServiceStatus } from "@prisma/client";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  XOctagon,
} from "lucide-react";
import { getServiceStatusName } from "~/lib/utils";

export const StatusLabel = ({
  status,
  showIcon = false,
}: {
  status: ServiceStatus | null;
  showIcon?: boolean;
}) => {
  const getStatusColor = (status: ServiceStatus | null) => {
    switch (status) {
      case "OPERATIONAL":
        return "text-green-500";
      case "DEGRADED":
        return "text-yellow-500";
      case "PARTIAL_OUTAGE":
        return "text-orange-500";
      case "MAJOR_OUTAGE":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: ServiceStatus | null) => {
    switch (status) {
      case "OPERATIONAL":
        return <CheckCircle className="h-6 w-6" />;
      case "DEGRADED":
        return <AlertTriangle className="h-6 w-6" />;
      case "PARTIAL_OUTAGE":
        return <AlertOctagon className="h-6 w-6" />;
      case "MAJOR_OUTAGE":
        return <XOctagon className="h-6 w-6" />;
      default:
        return <HelpCircle className="h-6 w-6" />;
    }
  };

  return (
    <p className={`flex items-center gap-x-2 ${getStatusColor(status)}`}>
      {showIcon && getStatusIcon(status)}
      <span>{getServiceStatusName(status)}</span>
    </p>
  );
};

export default StatusLabel;
