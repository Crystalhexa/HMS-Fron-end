"use server";
import { cookies } from "next/headers";
import { format } from "date-fns";

const API_BASE_URL = "http://localhost:3000/api/v1";

// Helper function to include cookies in requests
const fetchWithCookies = async (url: string) => {
  const sessionId = (await cookies()).get("sessionId")?.value;
  if (!sessionId) {
    throw new Error("Unauthorized: No sessionID found");
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `sessionId=${sessionId}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }

  return response.json();
};

export const fetchAppointmentByPatient = async (patientId: String)=>{
    try {
        return await fetchWithCookies(`${API_BASE_URL}/appointment/getAppointmentByPatient/${patientId}`)
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return [];
    }
}

// Fetch Appointments for a Specific Date
export const fetchAppointmentsForDate = async (doctorId: string, dateStr: string) => {
  const formattedDate = format(new Date(dateStr), "d_M_yyyy");
  try {
    const result = await fetchWithCookies(
      `${API_BASE_URL}/appointment/daybydayAppointment?userId=${doctorId}&date=${formattedDate}`
    );

    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
  return [];
};
// Fetch Appointments for the Month
export const fetchAppointmentsForMonth = async (doctorId: string) => {
  try {
    const result = await fetchWithCookies(
      `${API_BASE_URL}/appointment/monthlyAppointments?userId=${doctorId}`
    );

    if (result.success && Array.isArray(result.data)) {
      const newAppointments = result.data.map(
        (appointment: { patientName: any; start: string; end: string }) => ({
          title: `${appointment.patientName} - Time: ${
            appointment.start.split("T")[1]
          }`,
          start: new Date(appointment.start.replace(/_/g, "-")),
          end: new Date(appointment.end.replace(/_/g, "-")),
          details: appointment,
        })
      );

      const bookedDays: Set<string> = new Set(
        result.data.map((appointment: { start: string }) =>
          appointment.start.split("T")[0].replace(/_/g, "-")
        )
      );

      return { appointments: newAppointments, bookedDates: bookedDays };
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
  return { appointments: [], bookedDates: new Set() };
};

export const fetchAppoinmentByDoctor = async(doctorId: String)=>{
  try {
    return await fetchWithCookies(`${API_BASE_URL}/appointment/getAppointmentByDay/${doctorId}`)
  }catch(error){
    console.error("Error fetching doctors:", error);
    return [];
  }
  
};

