'use server'
import { fetchDoctors } from "@/actions/doctor.action";
import { DataTable } from "@/components/table/Datatable";
import { columns } from "@/components/table/DoctorColumn";

const DoctorTable = async () => {
  const doctors = await fetchDoctors();
  return (
    <section className="p-4">
      <DataTable type="doctor" columns={columns} data={doctors} />
    </section>
  );
};

export default DoctorTable;
