"use client"

import { Badge } from "@/components/ui/badge"
import Contract from "@/types/contract"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Contract>[] = [
    // {
    // accessorKey: "id",
    // header: "ID",
    // },
        {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({row}) => {
        const fDate= Intl.DateTimeFormat("en-US",{
             year: "numeric",
             month: "long",
             day: "2-digit"
         }).format(row.original.startDate)
         return  <div className="text-left font-medium">{fDate}</div>
     },
    },
    {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({row}) => {
       const fDate= Intl.DateTimeFormat("en-US",{
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(row.original.endDate)
        return  <div className="text-left font-medium">{fDate}</div>
    },
    },
    {
    accessorKey: "floorID",
    header: "Floor ID",
    },
    {
    accessorKey: "paymentID",
    header: "Payment ID",
    },
    {
    accessorKey: "paymentTerm",
    header: "Payment Term",
    },  
    {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
        return  <Badge variant={`${row.original.status ==='active' ? 'default':'destructive'}`}>{row.original.status}</Badge>
    },
  },
  
]
