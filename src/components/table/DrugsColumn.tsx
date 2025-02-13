import { Drugs } from "@/types/express.type";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { redirect } from "next/navigation";

export const columns: ColumnDef<Drugs>[] = [
  {
    accessorKey: "drug_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="text-14medium">{row.getValue("drug_name")}</p>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <p className="text-14medium">{row.original.category}</p>,
  },
  {
    accessorKey: "drug_code",
    header: "Drug code",
    cell: ({ row }) => (
      <p className="text-14medium">{row.original.drug_code}</p>
    ),
  },
  {
    accessorKey: "drug_type",
    header: "Drug type",
    cell: ({ row }) => (
      <p className="text-14medium">{row.original.drug_type}</p>
    ),
  },
  {
    id: "id",
    enableHiding: false,
    cell: ({ row }) => {
      const deleteDrug = () => {
        const drugsId = row.original.drugsId; // Assuming each patient has an "id" field
        redirect(`/dashboard/patient/appointment/${drugsId}`); // Navigate to patient details page
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
            <DropdownMenuItem onClick={deleteDrug}>
              Delete drug
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
