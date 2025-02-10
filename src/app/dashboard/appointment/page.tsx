"use client";
import { DataTable } from "@/components/table/Datatable";
import { useAuth } from "@/contexts/AuthContext";
import { columns } from "@/components/table/AppointmentColumn";
import React, { useEffect, useState } from "react";
type Props = {};

const page = (props: Props) => {
    const [appointment,setAppointment] = useState([]);
    const { login, loading, error, redirect, user } = useAuth();

    useEffect(()=>{
      if(user?.userId){
        fetchAppointment();
      }
    },[user?.userId]);
  
    const fetchAppointment = async () => {
      try {
          const res = await fetch(`http://localhost:3000/api/v1/appointment/getAppointmentByDay/${user?.userId}`); // Ensure the correct endpoint path
          const data = await res.json(); // Await the JSON response
          if (res.ok) {
            setAppointment(data);
          }
      } catch (error) {
          console.error('Error fetching users:', error);
      }
  };
  
  return (
    <main className="admin-main">
      <DataTable type="doctor" columns={columns} data={appointment} />
    </main>
  );
};
export default page;