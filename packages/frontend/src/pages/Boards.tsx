import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect } from "react"

const data: Board[] = [
    {
        id: "m5gr84i9",
        title: "board",
        status: "on-going",
        lastUpdateAt: 1
        // amount: 316,
        // status: "success",
        // email: "ken99@yahoo.com",
    },
    {
        id: "3u1reuv4",
        title: "board",
        status: "on-going",
        lastUpdateAt: 1
        // amount: 242,
        // status: "success",
        // email: "Abe45@gmail.com",
    },
    {
        id: "derv1ws0",
        title: "board",
        status: "on-going",
        lastUpdateAt: 1
        // amount: 837,
        // status: "processing",
        // email: "Monserrat44@gmail.com",
    },
    {
        id: "5kma53ae",
        title: "board",
        status: "on-9",
        lastUpdateAt: 1
        // amount: 874,
        // status: "success",
        // email: "Silas22@gmail.com",
    },
    {
        id: "bhqecj4p",
        title: "board",
        status: "on-going",
        lastUpdateAt: 1
        // amount: 721,
        // status: "failed",
        // email: "carmella@hotmail.com",
    },
]

export type Board = {
    id: string
    // amount: number
    // status: "pending" | "processing" | "success" | "failed"
    // email: string
    title: string
    status: string
    lastUpdateAt: number
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase text-center">{row.getValue("status")}</div>,
    },
    {
        accessorKey: "lastUpdateAt",
        header: () => <div className="text-center">Last updated at</div>,
        cell: ({ row }) => {
            const lastUpdateAt = parseFloat(row.getValue("lastUpdateAt"))

            // Format the lastUpdateAt as a dollar lastUpdateAt
            // const formatted = new Intl.NumberFormat("en-US", {
            //     style: "currency",
            //     currency: "USD",
            // }).format(lastUpdateAt)

            return <div className="text-center font-medium">{lastUpdateAt}</div>
        },
    },
    // {
    //     id: "actions",
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         const payment = row.original

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         onClick={() => navigator.clipboard.writeText(payment.id)}
    //                     >
    //                         Copy payment ID
    //                     </DropdownMenuItem>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem>View customer</DropdownMenuItem>
    //                     <DropdownMenuItem>View payment details</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         )
    //     },
    // },
]

export function Boards() {
    const { isPending, error, data: queryData, isFetching } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/boards`,
            )
            return await response.json()
        },
    })

    useEffect(() => {
        console.log('queryData', queryData)
    }, [queryData])

    // console.log('%VITE_API_URL%', import.meta.env.VITE_API_URL)

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})


    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    // <div className="bg-red-300 size-2/4">
    //     <div className="flex justify-center py-4">
    //         <Input
    //             placeholder="Filter emails..."
    //             value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
    //             onChange={(event) =>
    //                 table.getColumn("title")?.setFilterValue(event.target.value)
    //             }
    //             className="max-w-sm"
    //         />
    //         {/* <DropdownMenu>
    //             <DropdownMenuTrigger asChild>
    //             <Button variant="outline" className="ml-auto">
    //                 Columns <ChevronDown />
    //             </Button>
    //         </DropdownMenuTrigger>
    //             <DropdownMenuContent align="end">
    //                 {table
    //                     .getAllColumns()
    //                     .filter((column) => column.getCanHide())
    //                     .map((column) => {
    //                         return (
    //                             <DropdownMenuCheckboxItem
    //                                 key={column.id}
    //                                 className="capitalize"
    //                                 checked={column.getIsVisible()}
    //                                 onCheckedChange={(value) =>
    //                                     column.toggleVisibility(!!value)
    //                                 }
    //                             >
    //                                 {column.id}
    //                             </DropdownMenuCheckboxItem>
    //                         )
    //                     })}
    //             </DropdownMenuContent>
    //         </DropdownMenu> */}
    //     </div>
    //     <div className="rounded-md border">
    //         {/* <Table>
    //             <TableHeader>
    //                 {table.getHeaderGroups().map((headerGroup) => (
    //                     <TableRow key={headerGroup.id} className="grid grid-cols-3 gap-3 bg-blue-300">
    //                         {headerGroup.headers.map((header) => {
    //                             return (
    //                                 <TableHead key={header.id} className="bg-orange-300">
    //                                     {header.isPlaceholder
    //                                         ? null
    //                                         : flexRender(
    //                                             header.column.columnDef.header,
    //                                             header.getContext()
    //                                         )}
    //                                 </TableHead>
    //                             )
    //                         })}
    //                     </TableRow>
    //                 ))}
    //             </TableHeader>
    //             <TableBody>
    //                 {table.getRowModel().rows?.length ? (
    //                     table.getRowModel().rows.map((row) => (<TableRow
    //                         key={row.id}
    //                         data-state={row.getIsSelected() && "selected"}
    //                     >
    //                         {row.getVisibleCells().map((cell) => {
    //                             // console.log('row.getVisibleCells()', flexRender(
    //                             //     cell.column.columnDef.cell,
    //                             //     cell.getContext()
    //                             // ))
    //                             return (
    //                                 <TableCell key={cell.id}>
    //                                     {flexRender(
    //                                         cell.column.columnDef.cell,
    //                                         cell.getContext()
    //                                     )}
    //                                 </TableCell>
    //                             )
    //                         })}
    //                     </TableRow>
    //                     ))
    //                 ) : (
    //                     <TableRow>
    //                         <TableCell
    //                             colSpan={columns.length}
    //                             className="h-24 text-center"
    //                         >
    //                             No results.
    //                         </TableCell>
    //                     </TableRow>
    //                 )}
    //             </TableBody>
    //         </Table> */}
    //         <Table>
    //             <TableHeader>
    //                 {table.getHeaderGroups().map(headerGroup => (
    //                     <tr key={headerGroup.id}>
    //                         {headerGroup.headers.map(header => (
    //                             <th key={header.id} className="w-1/3">
    //                                 {header.isPlaceholder
    //                                     ? null
    //                                     : flexRender(
    //                                         header.column.columnDef.header,
    //                                         header.getContext()
    //                                     )}
    //                             </th>
    //                         ))}
    //                     </tr>
    //                 ))}
    //             </TableHeader>
    //             <TableBody>
    //                 {table.getRowModel().rows.map(row => (
    //                     <tr key={row.id}>
    //                         {row.getVisibleCells().map(cell => (
    //                             <td key={cell.id}>
    //                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //                             </td>
    //                         ))}
    //                     </tr>
    //                 ))}
    //             </TableBody>
    //             <tfoot>
    //                 {table.getFooterGroups().map(footerGroup => (
    //                     <tr key={footerGroup.id}>
    //                         {footerGroup.headers.map(header => (
    //                             <th key={header.id}>
    //                                 {header.isPlaceholder
    //                                     ? null
    //                                     : flexRender(
    //                                         header.column.columnDef.footer,
    //                                         header.getContext()
    //                                     )}
    //                             </th>
    //                         ))}
    //                     </tr>
    //                 ))}
    //             </tfoot>
    //         </Table>
    //     </div>
    //     {/* <div className="flex items-center justify-end space-x-2 py-4">
    //         <div className="flex-1 text-sm text-muted-foreground">
    //             {table.getFilteredSelectedRowModel().rows.length} of{" "}
    //             {table.getFilteredRowModel().rows.length} row(s) selected.
    //         </div>
    //         <div className="space-x-2">
    //             <Button
    //                 variant="outline"
    //                 size="sm"
    //                 onClick={() => table.previousPage()}
    //                 disabled={!table.getCanPreviousPage()}
    //             >
    //                 Previous
    //             </Button>
    //             <Button
    //                 variant="outline"
    //                 size="sm"
    //                 onClick={() => table.nextPage()}
    //                 disabled={!table.getCanNextPage()}
    //             >
    //                 Next
    //             </Button>
    //         </div>
    //     </div> */}
    // </div>
    return (
        <div className="h-screen flex flex-row flex-nowrap justify-center items-center content-center">
            {
                (queryData ?? []).map(d => <p>{d.adr}</p>)
            }
        </div>
    )
}
