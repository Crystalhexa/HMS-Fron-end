'use client'
import { DataTable } from '@/components/table/Datatable'
import { columns } from "@/components/table/AppointmentColumn";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';


const page = () => {
    const [appointment,setAppointment] = useState([]);
    const {patientId} = useParams();

    useEffect(()=>{
        fetchAppointment()
    },[patientId])

    const fetchAppointment = async() =>{
        try {
            const res = await fetch(`http://localhost:3000/api/v1/appointment/getAppointmentByPatient/${patientId}`); // Ensure the correct endpoint path
            const data = await res.json(); // Await the JSON response
            if (res.ok) {
              setAppointment(data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }


  return (
    <div>
        <DataTable type='doctor' columns={columns} data={appointment}/>
    </div>
  )
}

export default page