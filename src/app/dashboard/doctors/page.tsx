"use client"
import { DataTable } from '@/components/table/Datatable'
import React, { useEffect, useState } from 'react'
import { columns } from "@/components/table/DoctorColumn";

type Props = {}

const Patient = (props: Props) => {
  const [user,setUser] = useState([]);
  useEffect(()=>{
    fetchUsers();
  },[]);

  const fetchUsers = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/v1/doctor/getAll",
          {
            method:"GET",
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });
        const data = await res.json(); // Await the JSON response
        if (res.ok) {
            setUser(data);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

  return (
    <div>
        <DataTable type="doctor" columns={columns} data={user} />    
    </div>
  )
}

export default Patient