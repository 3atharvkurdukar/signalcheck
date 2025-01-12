"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceStatus } from "@prisma/client";
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
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getServiceStatusName } from "~/lib/utils";
import {
  type CreateServiceInput,
  createServiceSchema,
} from "~/server/api/schema/service";
import { api } from "~/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export const AddService = () => {
  const form = useForm<CreateServiceInput>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: "",
      status: ServiceStatus.OPERATIONAL,
    },
  });

  const utils = api.useUtils();
  const { mutate: addService } = api.service.addService.useMutation({
    onSuccess: async () => {
      toast.success("Service added successfully");
      await utils.service.invalidate();
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: CreateServiceInput) => {
    addService(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Service</CardTitle>
        <CardDescription>Add a new service to the status page</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter service name" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(ServiceStatus).map((status) => (
                        <SelectItem value={status} key={status}>
                          {getServiceStatusName(status)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add Service</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddService;
