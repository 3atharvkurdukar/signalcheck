"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IncidentStatus } from "@prisma/client";
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
import { getIncidentStatusName } from "~/lib/utils";
import {
  type UpdateIncidentTimelineInput,
  updateIncidentTimelineSchema,
} from "~/server/api/schema/incident";
import { api } from "~/trpc/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function UpdateTimeline() {
  const { data: incidents, isLoading } = api.incident.listIncidents.useQuery({
    activeOnly: true,
  });

  const utils = api.useUtils();

  const form = useForm<UpdateIncidentTimelineInput>({
    resolver: zodResolver(updateIncidentTimelineSchema),
    defaultValues: {
      message: "",
    },
  });

  const { mutate: updateIncident } = api.incident.updateIncident.useMutation({
    onSuccess: async () => {
      form.reset();
      toast.success("Incident updated successfully");
      await utils.incident.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSelectIncident = (incidentId: number) => {
    form.setValue("incidentId", incidentId);
    const status = incidents?.find(
      (incident) => incident.id === incidentId,
    )?.status;
    if (status) {
      form.setValue("status", status);
    }
  };

  const onSubmit = (data: UpdateIncidentTimelineInput) => {
    updateIncident(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Incident Timeline</CardTitle>
        <CardDescription>
          Add a new update to the incident timeline
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : !incidents || incidents.length === 0 ? (
          <p className="text-center text-lg text-muted-foreground">
            No incidents found
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
                name="incidentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incident</FormLabel>
                    <Select
                      onValueChange={(val) => handleSelectIncident(+val)}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select incident" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {incidents.map((incident) => (
                          <SelectItem
                            value={incident.id.toString()}
                            key={incident.id}
                          >
                            {incident.title}
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Input placeholder="Provide latest update" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(IncidentStatus).map((status) => (
                          <SelectItem value={status} key={status}>
                            {getIncidentStatusName(status)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
