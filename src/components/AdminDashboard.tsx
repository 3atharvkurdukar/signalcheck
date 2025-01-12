"use client";

import { AddService } from "~/components/admin/AddService";
import { ManageServices } from "~/components/admin/ManageServices";
import { ReportIncident } from "~/components/admin/ReportIncident";
import { ScheduleMaintenance } from "~/components/admin/ScheduleMaintenance";
import { UpdateTimeline } from "~/components/admin/UpdateTimeline";

export default function AdminDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ManageServices />
      <AddService />
      <ReportIncident />
      <UpdateTimeline />
      <ScheduleMaintenance />
    </div>
  );
}
