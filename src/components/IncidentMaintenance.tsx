import { AlertTriangle, PenToolIcon as Tool } from "lucide-react";
import { type Event } from "~/lib/mockData";

export default function IncidentMaintenance({
  type,
  title,
  status,
  date,
}: Event) {
  return (
    <div className="flex items-start space-x-3 border-b py-3 last:border-b-0">
      {type === "incident" ? (
        <AlertTriangle className="h-6 w-6 flex-shrink-0 text-red-500" />
      ) : (
        <Tool className="h-6 w-6 flex-shrink-0 text-blue-500" />
      )}
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">
          {status} - {date}
        </p>
      </div>
    </div>
  );
}
