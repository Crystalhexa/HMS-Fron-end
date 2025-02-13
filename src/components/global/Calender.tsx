import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format, parse } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DoctorCalendarProps {
  doctorId: string;
}

interface Appointment {
  id: number;
  appointmentId: string;
  slotDate: string;
  slotTime: string;
  status: string;
  doctorId: string;
  adultpatient?: { name: string; contactNumber: string; email: string; address: string };
  childpatient?: { firstName: string };
}

const DoctorCalendar: React.FC<DoctorCalendarProps> = ({ doctorId }) => {
  const [appointments, setAppointments] = useState<{ title: string; start: Date; details: Appointment }[]>([]);
  const [selectedAppointments, setSelectedAppointments] = useState<Appointment[]>([]);
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (doctorId) {
      fetchAppointmentsForMonth();
    }
  }, [doctorId]);

  const fetchAppointmentsForMonth = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/appointment/monthlyAppointments?userId=${doctorId}`);
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        const newAppointments = result.data.map((appointment: { patientName: any; start: string; end: string }) => ({
          title: `${appointment.patientName} - Time: ${appointment.start.split('T')[1]}`,
          start: parse(appointment.start.replace(/_/g, "-"), "d-M-yyyy'T'hh:mm a", new Date()),
          end: parse(appointment.end.replace(/_/g, "-"), "d-M-yyyy'T'hh:mm a", new Date()),
          details: appointment,
        }));

        const bookedDays: Set<string> = new Set(result.data.map((appointment: { start: string }) => appointment.start.split('T')[0].replace(/_/g, "-")));

        setAppointments(newAppointments);
        setBookedDates(bookedDays);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleDateClick = async (info: { dateStr: string }) => {
    const formattedDate = format(new Date(info.dateStr), "d_M_yyyy");
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/appointment/daybydayAppointment?userId=${doctorId}&date=${formattedDate}`
      );
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setSelectedAppointments(result.data);
        setOpen(true);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        dayCellClassNames={({ date }) => {
          const formattedDate = format(date, "d-M-yyyy");
          return bookedDates.has(formattedDate) ? "bg-blue-400 dark:bg-blue-600 text-white font-bold rounded-md" : "";
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        height="auto"
      />

      {/* Dark mode modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg max-w-lg w-full p-4">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Appointments for Selected Date</DialogTitle>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto space-y-2 p-2 border border-gray-300 dark:border-gray-700 rounded-lg">
            {selectedAppointments.length > 0 ? (
              selectedAppointments.map((appointment) => (
                <div key={appointment.id} className="p-2 border border-gray-400 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700">
                  <p><strong>Patient:</strong> {appointment.adultpatient?.name || appointment.childpatient?.firstName || "Unknown"}</p>
                  <p><strong>Time:</strong> {appointment.slotTime}</p>
                  <p><strong>Status:</strong> {appointment.status}</p>
                </div>
              ))
            ) : (
              <p className="dark:text-gray-300">No appointments found for this date.</p>
            )}
          </div>
          <Button className="w-full mt-4 bg-gray-200 dark:bg-gray-600 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorCalendar;
