"use server"
import { DataTable } from '@/components/table/Datatable'
import React, { useEffect, useState } from 'react'
import { columns } from "@/components/table/DrugsColumn";
import { fetchDrugs } from '@/actions/drugAction';

const DrugsTable = async() => {
  const drugs = await fetchDrugs();
  return (
    <section className="p-4">
        <DataTable type='drugs' columns={columns} data={drugs}/>
    </section>
  )
}

export default DrugsTable