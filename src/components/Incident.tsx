import { AlertTriangle } from "lucide-react";
import { type IncidentWithTimeline } from "types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function Incident({
  title,
  // service,
  status,
  createdAt,
  updatedAt,
  timeline,
}: IncidentWithTimeline) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
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
            <p className="font-medium">{status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Reported</p>
            <p className="font-medium">
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Update</p>
            <p className="font-medium">
              {new Date(updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="timeline">
            <AccordionTrigger>View Timeline</AccordionTrigger>
            <AccordionContent>
              <ol className="relative border-l border-gray-200 dark:border-gray-700">
                {timeline.map((item, index) => (
                  <li key={index} className="mb-6 ml-4">
                    <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {new Date(item.date).toLocaleString()}
                    </time>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                      {item.message}
                    </p>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
