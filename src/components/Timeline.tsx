import { type TimelineItem } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Clock } from "lucide-react";

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="flow-root">
      <ul>
        {items.map((item, itemIdx) => (
          <li key={itemIdx}>
            <div className="relative pb-2">
              {itemIdx !== items.length - 1 ? (
                <span
                  className="absolute left-2 top-2 -ml-px h-full w-0.5 bg-zinc-300"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-center space-x-1">
                <div>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-600 ring-4 ring-white">
                    <Clock className="h-3 w-3 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4">
                  <div>
                    <p className="text-xs text-zinc-700">{item.message}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-xs text-zinc-500">
                    <time dateTime={item.date.toDateString()}>
                      {formatDistance(item.date, new Date(), {
                        addSuffix: true,
                      })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
