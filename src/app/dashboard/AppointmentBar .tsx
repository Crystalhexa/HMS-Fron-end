'use client'
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";

const appointments = [
  {
    id: 101,
    status: "Scheduled",
    slotDate: "2024-08-18",
    slotTime: "10:30 AM",
    patientName: "John Doe",
    gender: "Male",
    nic: "123456789V",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 102,
    status: "Completed",
    slotDate: "2024-08-18",
    slotTime: "11:00 AM",
    patientName: "Jane Smith",
    gender: "Female",
    nic: "987654321V",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 103,
    status: "Cancelled",
    slotDate: "2024-08-19",
    slotTime: "12:15 PM",
    patientName: "Michael Brown",
    gender: "Male",
    nic: "456123789V",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const tabs = ["All", "Scheduled", "Completed", "Cancelled"];

export default function AppointmentBar() {
  const [selectedTab, setSelectedTab] = useState("All");

  const filteredAppointments =
    selectedTab === "All"
      ? appointments
      : appointments.filter((appt) => appt.status === selectedTab);

  return (
    <div className="w-full p-4">
      {/* Tabs */}
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

      {/* Appointment Cards */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <Card
            key={appointment.id}
            className="p-4 bg-gray-800 text-white rounded-lg shadow-lg"
          >
            <CardContent className="flex flex-wrap sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              {/* Patient Image & Details */}
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={appointment.image} alt={appointment.patientName} />
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{appointment.patientName}</p>
                  <p className="text-sm text-gray-400">
                    {appointment.gender} | NIC: {appointment.nic}
                  </p>
                </div>
              </div>

              {/* Slot Date & Time */}
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

              {/* Status & Action Button */}
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <p
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    appointment.status === "Scheduled"
                      ? "bg-blue-500"
                      : appointment.status === "Completed"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {appointment.status}
                </p>
                <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
