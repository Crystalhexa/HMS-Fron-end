"use client";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { getUserFromServer } from "@/actions/auth"; // Import server helper

type User = {
  userId: string;
  username: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  logout: () => void;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  error: String
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode; initialUser: User | null }> = ({
  children,
  initialUser, // Pass user from server
}) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return false;
      }
      setUser(data);
      return true;
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    document.cookie = "token=; Max-Age=0"; // Clear cookie
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading ,login,error}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};