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
  type ReportIncidentInput,
  reportIncidentSchema,
} from "~/server/api/schema/incident";
import { api } from "~/trpc/react";

export function ReportIncident() {
  const { data: services, isLoading } = api.service.listServices.useQuery();

  const utils = api.useUtils();

  const form = useForm<ReportIncidentInput>({
    resolver: zodResolver(reportIncidentSchema),
    defaultValues: {
      title: "",
    },
  });

  const { mutate: reportIncident } = api.incident.reportIncident.useMutation({
    onSuccess: async () => {
      toast.success("Incident reported successfully");
      await utils.incident.invalidate();
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: ReportIncidentInput) => {
    reportIncident(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Incident</CardTitle>
        <CardDescription>Report a new incident for a service</CardDescription>
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
                      <Input placeholder="Explain the incident" {...field} />
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
