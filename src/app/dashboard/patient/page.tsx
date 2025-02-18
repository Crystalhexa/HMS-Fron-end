"use server"
import { DataTable } from '@/components/table/Datatable'
import { columns } from "@/components/table/PatientColumn";
import { fetchPatients } from '@/components/server/actions';


const Patient = async() => {
  
  const patient = await fetchPatients();
  console.log(patient)

  
    return (
      <section className="p-4">
        <DataTable type="doctor" columns={columns} data={patient} />
      </section>
    );
}

export default Patient