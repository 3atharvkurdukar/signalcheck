"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  type ScheduleMaintenanceInput,
  scheduleMaintenanceSchema,
} from "~/server/api/schema/maintenance";
import { api } from "~/trpc/react";
import DateTimePicker from "../ui/date-time-picker";

export function ScheduleMaintenance() {
  const { data: services, isLoading } = api.service.listServices.useQuery();

  const utils = api.useUtils();

  const form = useForm<ScheduleMaintenanceInput>({
    resolver: zodResolver(scheduleMaintenanceSchema),
    defaultValues: {
      title: "",
    },
  });

  const { mutate: reportIncident } =
    api.maintenance.scheduleMaintenance.useMutation({
      onSuccess: async () => {
        toast.success("Maintenance scheduled successfully");
        await utils.maintenance.invalidate();
        form.reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const onSubmit = (data: ScheduleMaintenanceInput) => {
    reportIncident(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Maintenance</CardTitle>
        <CardDescription>Schedule a new maintenance window</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : !services || services.length === 0 ? (
          <p className="text-center text-lg text-muted-foreground">
            No services found
          </p>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (error) =>
                toast.error(error.root?.message),
              )}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(+val)}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem
                            value={service.id.toString()}
                            key={service.id}
                          >
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Explain the cause of maintenance"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field: { value, name } }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        value={value}
                        onChange={(date) => form.setValue(name, date)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field: { value, name } }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        value={value}
                        onChange={(date) => form.setValue(name, date)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Report Incident</Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
