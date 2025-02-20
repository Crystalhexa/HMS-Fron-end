"use server";
import { cookies } from "next/headers";
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getUserFromServer() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("sessionId")?.value; // Get token from cookies

  if (!token) return null; // No token, no user
  
  try {
    const res = await fetch("http://localhost:3000/api/v1/auth/me", {
      headers: {
        "Content-Type": "application/json",
        Cookie: `sessionId=${token}`,
      },
      credentials: "include",
    });
// Simulate a 2-minute delay (120000 milliseconds)

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      return { error: data.error || "Login failed" };
    }

    // Get session token from response cookies
    const cookieStore = cookies();
    const token = (await cookieStore).get("sessionId")?.value;

    if (!token) {
      return { error: "Authentication failed. No session token found." };
    }

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An error occurred during login." };
  }
}
