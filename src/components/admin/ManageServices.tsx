"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Service, ServiceStatus } from "@prisma/client";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getServiceStatusName } from "~/lib/utils";
import {
  type UpdateServiceStatusInput,
  updateServiceStatusSchema,
} from "~/server/api/schema/service";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";

export const ManageServices = () => {
  const { data: services, isLoading } =
    api.service.getLatestServiceUpdate.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Services</CardTitle>
        <CardDescription>
          Update the status of existing services
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : !services ? (
          <p className="text-center text-lg text-muted">No services found</p>
        ) : (
          services.map((service) => (
            <ManageService key={service.id} service={service} />
          ))
        )}
      </CardContent>
    </Card>
  );
};

interface ManageServiceProps {
  service: Service & { status: ServiceStatus | null };
}

const ManageService = ({ service }: ManageServiceProps) => {
  const utils = api.useUtils();

  const form = useForm<UpdateServiceStatusInput>({
    resolver: zodResolver(updateServiceStatusSchema),
    defaultValues: {
      serviceId: service.id,
      status: service.status ?? undefined,
    },
  });

  const { mutate: updateServiceStatus } =
    api.service.updateServiceStatus.useMutation({
      onSuccess: async () => {
        toast.success("Service status updated successfully");
        await utils.service.invalidate();
        form.reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const onSubmit = (data: UpdateServiceStatusInput) => {
    updateServiceStatus(data);
  };

  return (
    <div className="mb-4 flex items-center justify-between space-x-4">
      <span className="w-1/3 font-medium">{service.name}</span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) =>
            toast.error(error.root?.message),
          )}
        >
          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <input type="hidden" {...field} value={service.id} />
            )}
          />
          <div className="items center flex space-x-2">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
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
            <Button
              variant="ghost"
              type="submit"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
              className="w-9 rounded-full p-2"
            >
              <Save />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ManageServices;
