"use client";
import DoctorCalendar from "@/components/global/Calender";
import StatCard from "@/components/global/StatCard";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Loader2 } from "lucide-react"; // Using Lucide icons for better UI

const Page = () => {
  const { user } = useAuth();

  if (!user?.role) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

  return (
    <main className="p-6 space-y-6">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.role !== "ADMIN" && (
          <StatCard
            type="appointments"
            label="Scheduled Appointments"
            icon="/assets/icons/appointments.svg"
          />
        )}
        <StatCard type="pending" label="Pending Appointments" icon="/assets/icons/pending.svg" />
        <StatCard type="cancelled" label="Cancelled Appointments" icon="/assets/icons/cancelled.svg" />
      </section>

      
        <DoctorCalendar doctorId={user.userId} />
    
    </main>
  );
};

export default Page;
