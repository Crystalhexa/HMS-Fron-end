"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  userId: string;
  username: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  redirect: boolean;
  error: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  // ✅ Function to fetch user from API (to validate role)
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/me", {
        credentials: "include",
      });
      if (!res.ok) {
        logout();
        return;
      }
      const data = await res.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); // Update only if valid
    } catch (err) {
      console.error("Error fetching user:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login Function
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
      localStorage.setItem("user", JSON.stringify(data));
      setRedirect(true);
      return true;
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ✅ Load User on App Start
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error, redirect }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Fix: Correct `useAuth` hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
