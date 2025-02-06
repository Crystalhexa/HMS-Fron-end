"use client";
import StatCard from "@/components/global/StatCard";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { login, loading, error, redirect, user } = useAuth();

  if (!user?.role) {
    return <p>Loading...</p>; // You can replace this with a spinner or skeleton loader
  } else {
    return (
      <main className="admin-main">
        <section className="admin-stat">
          {user?.role !== "ADMIN" ? (
            <StatCard
              type="appointments"
              // count={appointments.scheduledCount}
              label="Scheduled appointments"
              icon={"/assets/icons/appointments.svg"}
            />
          ) : (
            ""
          )}

          <StatCard
            type="pending"
            //count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            //count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
      </main>
    );
  }
};

export default page;
