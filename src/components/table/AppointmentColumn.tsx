import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Appointment, } from "@/types/express.type";
import { redirect } from "next/navigation";

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "appointmentNumber",
    header: "Appointment No",
    cell: ({ row }) => <p className="text-14-medium">{row.original.id}</p>,
  }
  ,
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.status}</p>
    ),
  },
  {
    accessorKey: "slotDate",
    header: "Slot date",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.slotDate}</p>
    ),
  },
  {
    accessorKey: "slotTime",
    header: "Slot Time",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.slotTime}</p>
    ),
  },
  {
    accessorKey: "patientName",
    header: "patientName",
    cell: ({ row }) => <p className="text-14-medium">{row.original.name}</p>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.gender}</p>
    ),
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
      );
    },
    cell: ({ row }) => (
      <div className="uppercase">{row.getValue("identificationNumber")}</div>
    ),
  },
  {
    id: "id",
    enableHiding: false,
    cell: ({ row }) => {
      const handleViewPatient = () => {
        const appointmentId = row.original.appointmentId;
        redirect(`/dashboard/appointment/medicalhistory/medicaleRecord/${appointmentId}`); // Navigate to patient details page
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
              Proceed
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
