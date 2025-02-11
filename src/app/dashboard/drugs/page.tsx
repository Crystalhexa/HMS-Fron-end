"use client"
import { DataTable } from '@/components/table/Datatable'
import React, { useEffect, useState } from 'react'
import { columns } from "@/components/table/DrugsColumn";

const page = () => {
  const [drugs,setDrugs] = useState([]);

  useEffect(()=>{
    fetchDrugs()
  },[])

  const fetchDrugs = async ()=>{
    try {
      const res = await fetch("http://localhost:3000/api/v1/drugs/getAll");
      const data = await res.json();
      if(res.ok){
        setDrugs(data)
      }      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  return (
    <div>
        <DataTable type='drugs' columns={columns} data={drugs}/>
    </div>
  )
}

export default page