"use server";
import { cookies } from "next/headers";

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

// Fetch All Patients
export const fetchPatients = async () => {
  try {
    return await fetchWithCookies(`${API_BASE_URL}/adult/getall`);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};
