import { Drugs } from "@/types/express.type";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";


export const columns: ColumnDef<Drugs>[] =[
    {
        accessorKey:'Id',
        header: 'Id',
        cell: ({row}) => <p className="text-14medium">{row.original.id}</p>
    },
    {
        accessorKey:'drug_name',
        header:({column})=>{
            return(
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell: ({row}) => <p className="text-14medium">{row.getValue("drug_name")}</p>
    },
    {
        accessorKey:'category',
        header: 'Category',
        cell: ({row}) => <p className="text-14medium">{row.original.category}</p>
    },
    {
        accessorKey:'drug_code',
        header: 'Drug code',
        cell: ({row}) => <p className="text-14medium">{row.original.drug_code}</p>
    },
    {
        accessorKey:'drug_type',
        header: 'Drug type',
        cell: ({row}) => <p className="text-14medium">{row.original.drug_type}</p>
    }
]