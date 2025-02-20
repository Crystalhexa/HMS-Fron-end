"use server"
import { fetchPatients } from '@/actions/patient.action';
import { DataTable } from '@/components/table/Datatable'
import { columns } from "@/components/table/PatientColumn";


const Patient = async() => {
  
  const patient = await fetchPatients();
  console.log(patient)

  
    return (
      <section className="p-4">
        <DataTable type="patient" columns={columns} data={patient} />
      </section>
    );
}

export default Patient