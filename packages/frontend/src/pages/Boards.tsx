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
import { ArrowUpDown, Ellipsis, Plus } from "lucide-react"
import {
    useQuery,
    useMutation,
} from '@tanstack/react-query'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableHeader,
} from "@/components/ui/table"
import { useEffect, useMemo, useState } from "react"
import { Link, Navigate, useLocation, useNavigate } from "react-router"
import { createCallable } from 'react-call'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import axios from "axios"
import { useSelector } from "@xstate/react"
import { actor } from "@/main"

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
interface RootProps { refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>> }
type Response = boolean

export const BoardConfigModal = createCallable<Props, Response, RootProps>(({ call, mode, title: oTitle, status: oStatus, boardId }) => {
    const [title, setTitle] = useState(oTitle)
    const [status, setStatus] = useState(oStatus)
    let navigate = useNavigate();
    const [closing, setClosing] = useState(false)
    const [refetch, setRefetch] = useState(false)

    const updateMutation = useMutation({
        mutationFn: (props) => {
            const { title, status, boardId } = props
            return axios({
                method: 'put',
                url: `${import.meta.env.VITE_API_URL}/boards/bd--${boardId}`,
                responseType: "json",
                data: {
                    title,
                    statusR: status
                }
            })
        },
        onSuccess: ((data) => {
            setClosing(true)
            setRefetch(true)
        })
    })

    const addMutation = useMutation({
        mutationFn: (props) => {
            const { title, status } = props
            return axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/boards`,
                responseType: "json",
                data: {
                    title,
                    statusR: status
                }
            })
        },
        onSuccess: ((data) => {
            setClosing(true)
            setRefetch(true)
        })
    })

    const deleteMutation = useMutation({
        mutationFn: (props) => {
            const { boardId } = props
            return axios({
                method: 'delete',
                url: `${import.meta.env.VITE_API_URL}/boards/bd--${boardId}`,
                responseType: "json"
            })
        },
        onSuccess: ((data) => {
            setClosing(true)
            setRefetch(true)
        })
    })

    useEffect(() => {
        console.log('closing', closing)
    }, [closing])

    return (
        <Dialog open={true} onClose={() => { setClosing(true) }} className={`relative z-10`}>
            <div className={`${closing && `opacity-0 transition-opacity ease-out delay-25 duration-150`} animate-fade-in`}
                onTransitionEnd={() => {
                    call.end(true)
                    if (refetch) {
                        call.root.refetch()
                    }
                }}
            >
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
                                    <div className="sm:col-span-4 mt-2">
                                        <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                                            Board title*
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-md bg-white border border-gray-400">
                                                {/* <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">workcation.com/</div> */}
                                                <input
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    onInput={(e) => { setTitle(e.target.value) }}
                                                    value={title}
                                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4 mt-2">
                                        <label htmlFor="status" className="block text-sm/6 font-medium text-gray-900">
                                            Status
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-md bg-white border border-gray-400">
                                                {/* <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">workcation.com/</div> */}
                                                <input
                                                    id="status"
                                                    name="status"
                                                    type="text"
                                                    onInput={(e) => { setStatus(e.target.value) }}
                                                    value={status}
                                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400  sm:text-sm/6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                            <div className="px-4 mt-4 py-2 flex flex-row">
                                {mode === "edit" && <button
                                    type="button"
                                    onClick={() => { deleteMutation.mutate({ boardId: boardId }) }}
                                    className={`px-3 py-2 rounded-md text-sm font-semibold text-white  ${(deleteMutation.isPending) ? "bg-gray-700 cursor-not-allowed" : "bg-red-600 hover:bg-red-500"}`}
                                >
                                    Delete
                                </button>}
                                <div className="w-full"></div>
                                <button
                                    type="button"
                                    onClick={() => setClosing(true)}
                                    className="px-3 py-2 mr-2 rounded-md bg-gray-200 text-sm font-semibold text-slate-700 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (mode === "add") {
                                            addMutation.mutate({ status: status, title: title })
                                        }
                                        if (mode === "edit") {
                                            updateMutation.mutate({ status: status, title: title, boardId: boardId })
                                        }
                                    }}
                                    className={`px-3 py-2 rounded-md ${((mode === "add" && !title) || updateMutation.isPending || addMutation.isPending || deleteMutation.isPending) ? "bg-gray-700 cursor-not-allowed" : "bg-lime-600 hover:bg-lime-500"} text-white text-sm font-semibold`}
                                >
                                    Save
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>)
})

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
            const { status, title, id: boardId } = row.original
            return <div className="mx-4 rounded-4xl cursor-pointer hover:bg-gray-400" onClick={async () => {
                await BoardConfigModal.call({ mode: "edit", status, title, boardId })
            }}><Ellipsis /></div>
        },
    },
]


export function Boards() {
    const appState = useSelector(actor, (state) => state.value);
    if (appState === "login") {
        return <Navigate to="/" replace />;
    }

    const location = useLocation()


    const { isPending, error, data: queryData, isFetching, refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/boards`,
            )
            return await response.json()
        },
    })

    useEffect(() => {
        refetch()
    }, [location.key])

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

    // useEffect(() => {
    //     console.log("here", import.meta.env.VITE_PASSWORD);
    // }, [])


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

    // useEffect(() => {
    //     console.log('queryData', (queryData ?? []).length)
    // }, [queryData])


    if (queryData) {
        return <div className={`h-screen flex flex-row justify-center items-center animate-fade-in ${isFetching || error && `opacity-0 transition-opacity ease-out delay-25 duration-150`}`}>
            <BoardConfigModal.Root refetch={refetch} />
            <div className={`size-3/4 bg-gray-100 border`}>
                <div className="flex justify-center items-center py-4">
                    <div className="flex flex-row w-full justify-center items-center">
                        <Input
                            placeholder="Filter by title"
                            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("title")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm border-y-gray-600 w-2/4 lg:w-full"
                        />
                        <div className="cursor-pointer rounded-md border border-gray-700 bg-white ml-2" onClick={async () => {
                            await BoardConfigModal.call({ mode: "add" })
                        }}>
                            <Plus />
                        </div>
                    </div>
                </div>
                <div className="border-y">
                    {
                        isFetching ? <div className="flex flex-row justify-center w-full"><img src="/favicon.svg" className="animate-wiggle size-6" alt="Loading icon" /></div> : <Table>
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
                                {table.getSortedRowModel().rows.map((row, i) => (
                                    <tr key={row.id} className="hover:bg-gray-100 bg-gray-50 border-y border-y-gray-300">
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
                    }

                </div>
            </div>
        </div>
    }
    return (
        <div className="h-screen flex flex-row flex-nowrap justify-center items-center content-center">
            {/* {
                (queryData ?? []).map(d => <p>{d.adr}</p>)
            } */}
            {/* <h1>Loading</h1> */}
            <img src="/favicon.svg" className="animate-wiggle size-6" alt="Loading icon" />
        </div>
    )
}
