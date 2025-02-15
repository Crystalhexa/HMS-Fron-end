"use client"
import { DataTable } from '@/components/table/Datatable'
import React, { useEffect, useState } from 'react'
import { columns } from "@/components/table/PatientColumn";

type Props = {}

const Patient = (props: Props) => {
  const [user,setUser] = useState([]);
  useEffect(()=>{
    fetchUsers();
  },[]);

  const fetchUsers = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/v1/adult/getall",
          {
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            },
            credentials:"include"
          }
        ); // Ensure the correct endpoint path
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
        <DataTable type="patient" columns={columns} data={user} />    
    </div>
  )
}

export default Patient