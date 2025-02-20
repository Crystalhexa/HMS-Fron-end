'use client'
import { useState } from "react";
import AppointmentCard from "./AppoinmentCard";
const tabs = ["All", "SCHEDULED", "PROCEED", "COMPLETED", "CANCELLED"];

export default function AppointmentBar({ appointments }: AppointmentBarProps) {
  const [selectedTab, setSelectedTab] = useState("PROCEED"); // Default to "PROCEED"
  const filteredAppointments =
    selectedTab === "All"
      ? appointments
      : appointments.filter((appt) => appt.status === selectedTab);

  return (
    <div className="w-full p-4">
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filteredAppointments.map((appointment: Appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
}
interface Appointment {
    appointmentId: string;
    id: string;
    image: string;
    name: string;
    gender: string;
    identificationNumber: string;
    slotDate: string;
    slotTime: string;
    status: string;
  }
  
  interface AppointmentBarProps {
    appointments: Appointment[];
  }