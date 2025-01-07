import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboard from "../../components/AdminDashboard";
import Header from "../../components/Header";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
        <AdminDashboard />
      </main>
    </div>
  );
}
