"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchAppointmentsForDate, fetchAppointmentsForMonth } from "../server/actions";

interface DoctorCalendarProps {
  doctorId: string;
}

const DoctorCalendar = ({ doctorId }: DoctorCalendarProps) => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);

  // Fetch appointments for the entire month
  useEffect(() => {
    const loadAppointments = async () => {
      const { appointments, bookedDates } = await fetchAppointmentsForMonth(doctorId);
      setBookedDates(new Set(Array.from(bookedDates) as string[]));
    };

    loadAppointments();
  }, [doctorId]);

  // Handle date click to fetch appointments for the selected day
  const handleDateClick = async (info: { dateStr: string }) => {
    const selectedAppointments = await fetchAppointmentsForDate(doctorId, info.dateStr);
    setAppointments(selectedAppointments);
    setOpen(true);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <main className="admin-main">
        <div className="w-full max-w-4xl mx-auto p-4 rounded-lg shadow-lg">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            dayCellClassNames={({ date }) => {
              const formattedDate = format(date, "d_M_yyyy");
              return bookedDates.has(formattedDate)
                ? "bg-blue-400 text-white font-bold rounded-md"
                : "";
            }}
            headerToolbar={{ left: "prev,next", center: "title", right: "dayGridMonth" }}
          />
        </div>
      </main>

      {/* Appointment Details Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-4">
          <DialogHeader>
            <DialogTitle>Appointments for Selected Date</DialogTitle>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto space-y-2 p-2 border border-gray-300 rounded-lg">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div key={appointment.id} className="p-2 border rounded-lg bg-gray-100">
                  <p>
                    <strong>Patient:</strong>{" "}
                    {appointment.adultpatient?.name || appointment.childpatient?.firstName || "Unknown"}
                  </p>
                  <p><strong>Time:</strong> {appointment.slotTime}</p>
                  <p><strong>Status:</strong> {appointment.status}</p>
                </div>
              ))
            ) : (
              <p>No appointments found for this date.</p>
            )}
          </div>
          <Button className="w-full mt-4 bg-gray-200" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorCalendar;
