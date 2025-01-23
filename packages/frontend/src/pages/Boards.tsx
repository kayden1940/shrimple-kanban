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
import { ArrowUpDown, ChevronDown, Ellipsis, MoreHorizontal, Plus } from "lucide-react"
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
import { useEffect, useMemo } from "react"
import { Link } from "react-router"
import { createCallable } from 'react-call'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"

export type Board = {
    id: string
    // amount: number
    // status: "pending" | "processing" | "success" | "failed"
    // email: string
    title: string
    status: string
    lastUpdated: string
}


interface Props { mode: "edit" | "add" }
type Response = boolean

export const BoardConfigModal = createCallable<Props, Response>(({ call, mode }) => (
    // <div role="dialog" className="">
    //     <p>{mode}</p>
    //     <button onClick={() => call.end(true)}>Yes</button>
    //     <button onClick={() => call.end(false)}>No</button>
    // </div>
    // onClose={setOpen} 
    <Dialog open={true} onClose={() => call.end(true)} className={`relative z-10 ${call.ended ? 'animate-fade-out' : ''}`}>
        <div className="animate-fade-in animate-duration-75">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-400/75 transition-opacity"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative sm:w-3/4 md:w-1/4 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all -y-4 :translate-y-0 :scale-95"
                    >
                        <div className="bg-white px-4 pt-5">
                            {/* <div className="sm:flex sm:items-start"> */}
                            {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                </div> */}
                            <div className="mt-3 sm:mt-0 text-left w-full">
                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900 capitalize">
                                    {mode} board
                                </DialogTitle>
                                {/* <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to deactivate your account? All of your data will be permanently removed.
                                            This action cannot be undone.
                                        </p>
                                    </div> */}
                                <div className="sm:col-span-4 mt-6">
                                    <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                        Board title*
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                            {/* <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">workcation.com/</div> */}
                                            <input
                                                id="username"
                                                name="username"
                                                type="text"
                                                // placeholder="janesmith"
                                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-4 mt-2 mb-4">
                                    <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                        Status
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                            {/* <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">workcation.com/</div> */}
                                            <input
                                                id="username"
                                                name="username"
                                                type="text"
                                                // placeholder="janesmith"
                                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                        <div className="px-4 py-3 flex flex-row">
                            {mode === "edit" && <button
                                type="button"
                                // onClick={() => setOpen(false)}
                                className="px-3 py-2 rounded-md bg-red-600 text-sm font-semibold text-white hover:bg-red-500"
                            >
                                Delete
                            </button>}
                            <div className="w-full"></div>
                            <button
                                type="button"
                                // onClick={() => setOpen(false)}
                                className="px-3 py-2 mr-2 rounded-md bg-gray-200 text-sm font-semibold text-slate-700 hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                // onClick={() => setOpen(false)}
                                className="px-3 py-2 rounded-md bg-lime-600 text-white text-sm font-semibold  hover:bg-lime-500"
                            >
                                Save
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </div>
    </Dialog>
), 120)

export const columns: ColumnDef<Board>[] = [
    {
        accessorKey: "title",
        // header: "Title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown />
                </Button>
            )
        },
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
        accessorKey: "lastUpdated",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last updated
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="text-center font-medium">{row.getValue("lastUpdated")}</div>
        },
    },
    {
        accessorKey: "options",
        header: () => <></>,
        cell: ({ row }) => {
            return <div className="mx-4 rounded-sm cursor-pointer" onClick={async () => await BoardConfigModal.call({ mode: "edit" })}><Ellipsis /></div>
        },
    },
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

    const data = useMemo(() => ((queryData ?? [])).reduce((accu, { adr, lastUpdated, title, prop, statusR }, index) => {
        if (prop === "board") {
            accu.push({ lastUpdated: lastUpdated, title: title, ...(statusR && { status: statusR }), id: adr.split('#')[1] })
        }
        return accu
    }, []), [queryData]) as Board[]

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    // useEffect(() => {
    //     console.log('data', data)
    // }, [data])

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

    // if (isPending) {
    //     return <h1>pending</h1>
    // }

    if (isFetching) {
        return <h1>fetching</h1>
    }
    if (error) {
        return <h1>error</h1>
    }

    if (queryData) {
        return <div className="h-screen flex flex-row justify-center items-center">
            <BoardConfigModal.Root />
            <div className="size-3/4 border bg-gray-100 border-gray-400">
                <div className="flex justify-center items-center py-4">
                    <div className="flex flex-row w-full justify-center items-center">
                        <Input
                            placeholder="Filter by title, or status with s:status_name_here"
                            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("title")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm border border-gray-600 w-2/4 lg:w-full"
                        />
                        <div className="cursor-pointer border rounded-md border-gray-700 bg-white ml-2" onClick={async () => { await BoardConfigModal.call({ mode: "add" }) }}>
                            <Plus />
                        </div>
                    </div>
                </div>
                <div className="border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="w-1/3">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map((row, i) => (
                                <tr key={row.id} className="hover:bg-gray-100 bg-gray-50 border-y border-gray-300">
                                    {row.getVisibleCells().map((cell) => {
                                        // console.log('cell', cell)
                                        if (cell.column.id === "options") {
                                            return (
                                                <td key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            )
                                        }
                                        return (
                                            <td key={cell.id}>
                                                <Link to={`/boards/${cell.getContext().row.original.id}`} state={queryData[i]}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </Link>
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </TableBody>
                        <tfoot>
                            {table.getFooterGroups().map(footerGroup => (
                                <tr key={footerGroup.id}>
                                    {footerGroup.headers.map(header => (
                                        <th key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.footer,
                                                    header.getContext()
                                                )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </tfoot>
                    </Table>
                </div>
            </div>
        </div>
    }
    return (
        <div className="h-screen flex flex-row flex-nowrap justify-center items-center content-center">
            {/* {
                (queryData ?? []).map(d => <p>{d.adr}</p>)
            } */}
            <h1>??</h1>
        </div>
    )
}
