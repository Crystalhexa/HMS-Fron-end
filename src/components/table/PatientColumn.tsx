import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Patient } from "@/types/express.type";


export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'name',
    header: 'Patient name',
    cell: ({ row }) => <p className="text-14-medium">{row.original.name}</p>
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <p className="text-14-medium">{row.original.email}</p>
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => <p className="text-14-medium">{row.original.phone}</p>
  },
  {
    accessorKey: 'date_of_birth',
    header: 'Birthdate',
    cell: ({ row }) => (
      <p className="text-14-medium">
        {row.original.date_of_birth ? new Date(row.original.date_of_birth).toLocaleDateString() : 'Not Set'}
      </p>
    )
  },  
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => <p className="text-14-medium">{row.original.gender}</p>
  },
  {
    accessorKey: "nic",
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
    cell: ({ row }) => <div className="uppercase">{row.getValue("nic")}</div>,
  },
  {
    id: "patient_id",
    enableHiding: false,
    cell: ({ row }) => {
      const navigate = useNavigate(); // Use the useNavigate hook here
      const handleViewPatient = () => {
        const patientId = row.original.patient_id; // Assuming each patient has an "id" field
        navigate(`/register/${patientId}`); // Navigate to patient details page
      };
      const scheduleAppointment = () => {
        const patientId = row.original.patient_id; // Assuming each patient has an "id" field
        navigate(`/appointement/${patientId}`); // Navigate to patient details page
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
