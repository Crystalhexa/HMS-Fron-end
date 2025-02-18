"use client";
import { DataTable } from "@/components/table/Datatable";
import { useAuth } from "@/contexts/AuthContext";
import { columns } from "@/components/table/AppointmentColumn";
import React, { useEffect, useState } from "react";
import AppointmentBar from "@/components/global/Appoinment";
type Props = {};

const page = (props: Props) => {
    const [appointment,setAppointment] = useState([]);
    const {  user } = useAuth();

    useEffect(()=>{
      if(user?.userId){
        fetchAppointment();
      }
    },[user?.userId]);
  
    const fetchAppointment = async () => {
      try {
          const res = await fetch(`http://localhost:3000/api/v1/appointment/getAppointmentByDay/${user?.userId}`,
            {
              method:"GET",
              headers:{
                  'Content-Type': 'application/json'
              },
              credentials:"include"
            }); // Ensure the correct endpoint path
          const data = await res.json(); // Await the JSON response
          console.log(data)
          if (res.ok) {
            setAppointment(data);
          }
      } catch (error) {
          console.error('Error fetching users:', error);
      }
  };
  
  return (
    <main className="admin-main">
      <AppointmentBar appointments={appointment}/>
    </main>
  );
};
export default page;