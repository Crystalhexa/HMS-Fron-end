import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Appointment } from "@/types/express.type";
import AppointmentActions from "./AppointmentActions";

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "appointmentNumber",
    header: "Appointment No",
    cell: ({ row }) => <p className="text-14-medium">{row.original.id}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <p className="text-14-medium">{row.original.status}</p>,
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
    header: "Patient Name",
    cell: ({ row }) => <p className="text-14-medium">{row.original.name}</p>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => <p className="text-14-medium">{row.original.gender}</p>,
  },
  {
    accessorKey: "identificationNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        NIC
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="uppercase">{row.getValue("identificationNumber")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <AppointmentActions appointment={row.original} />,
  },
];



