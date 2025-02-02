import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Doctor } from "@/types/express.type";
import { redirect } from "next/navigation";


export const columns: ColumnDef<Doctor>[] = [
  {
    accessorKey: 'name',
    header: 'Doctor name',
    cell: ({ row }) => <p className="text-14-medium">{row.original.name}</p>
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => <p className="text-14-medium">{row.original.contactNumber}</p>
  },
  {
    accessorKey: 'specialization',
    header: 'Specialization',
    cell: ({ row }) => <p className="text-14-medium">{row.original.specialization}</p>
  },
  {
    accessorKey: 'medicalLicenseNumber',
    header: 'Medical License Number',
    cell: ({ row }) => <p className="text-14-medium">{row.original.medicalLicenseNumber}</p>
  },
  {
    accessorKey: 'yearsOfExperience',
    header: 'Years Of Experience',
    cell: ({ row }) => <p className="text-14-medium">{row.original.yearsOfExperience}</p>
  },
  {
    accessorKey: "identificationNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NIC
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="uppercase">{row.getValue("identificationNumber")}</div>,
  },
  {
    id: "id",
    enableHiding: false,
    cell: ({ row }) => {
      const handleViewPatient = () => {
        const patientId = row.original.id; // Assuming each patient has an "id" field
        redirect(`/admin/dashboard/doctors/update/${patientId}`); // Navigate to patient details page
      };
      const scheduleAppointment = () => {
        // const patientId = row.original.patient_id; // Assuming each patient has an "id" field
        // redirect(`/dashboard/patient/appointment/${patientId}`); // Navigate to patient details page
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleViewPatient}>
              View Patient
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={scheduleAppointment}>Schedule Appointment</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
