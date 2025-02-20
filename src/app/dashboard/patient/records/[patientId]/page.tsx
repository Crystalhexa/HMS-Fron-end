'use server'
import { fetchAppointmentByPatient } from '@/actions/appointment.action';
import { DataTable } from '@/components/table/Datatable'
import { columns } from "@/components/table/HealthRecordColumn";
import { SearchParamProps } from '@/types';


const page = async ({ params: { patientId } }: SearchParamProps) => {

   const appointment = await fetchAppointmentByPatient(patientId);

  return (
    <div>
        <DataTable type='doctor' columns={columns} data={appointment}/>
    </div>
  )
}

export default page