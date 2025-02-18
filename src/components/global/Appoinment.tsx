import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

const tabs = ["All", "SCHEDULED", "PROCEED", "COMPLETED", "CANCELLED"];

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <Card className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <CardContent className="flex flex-wrap sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Avatar className="w-14 h-14">
            <AvatarImage
              src={
                appointment.image ||
                "https://randomuser.me/api/portraits/men/1.jpg"
              }
              alt={appointment.name}
            />
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{appointment.name}</p>
            <p className="text-sm text-gray-400">
              {appointment.gender} | NIC: {appointment.identificationNumber}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full sm:w-auto">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span className="text-sm">{appointment.slotDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-sm">{appointment.slotTime}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <p
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              appointment.status === "SCHEDULED"
                ? "bg-blue-500"
                : appointment.status === "COMPLETED"
                ? "bg-green-500"
                : appointment.status === "PROCEED"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {appointment.status}
          </p>

          <Button
            asChild
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            <Link
              href={`/dashboard/appointment/medicalhistory/medicaleRecord/${appointment.appointmentId}`}
              className="hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Proceed
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
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
        {filteredAppointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
}
