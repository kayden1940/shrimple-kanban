import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createCallable } from 'react-call'

// export const BoardConfigModal = createCallable<Props, Response>(({ call, mode }) => (
//     // <div role="dialog" className="">
//     //     <p>{mode}</p>
//     //     <button onClick={() => call.end(true)}>Yes</button>
//     //     <button onClick={() => call.end(false)}>No</button>
//     // </div>
//     // onClose={setOpen} 
//     <Dialog open={true} onClose={() => { }} className={``}>
//         <h1>here</h1>
//     </Dialog>
// ))

function Login() {
    const [state, setState] = useState({ type: "idle" })
    const [password, setPassword] = useState("")
    // const input = useRef("")
    useEffect(() => {
        console.log('password', password)
    }, [password])

    return (
        <div>
            <Dialog open={true} onClose={() => { }} className={``}>
                <div className="">
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
                                    <div className="sm:mt-0 text-left w-full">
                                        <div className="sm:col-span-4">
                                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                                Login
                                            </DialogTitle>
                                            <div className="mt-2">
                                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                    {/* <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">workcation.com/</div> */}
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        placeholder='Password'
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        value={password}
                                                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </div>
                                <div className="px-4 mt-2 py-2 flex flex-row">
                                    {/* {mode === "edit" && <button
                                        type="button"
                                        // onClick={() => setOpen(false)}
                                        className="px-3 py-2 rounded-md bg-red-600 text-sm font-semibold text-white hover:bg-red-500"
                                    >
                                        Delete
                                    </button>} */}
                                    <div className="w-full"></div>

                                    <button
                                        type="button"
                                        // onClick={() => setOpen(false)}
                                        className="px-3 py-2 rounded-md bg-lime-600 text-white text-sm font-semibold  hover:bg-lime-500"
                                    >
                                        Login
                                    </button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default Login

// import.meta.env.VITE_PASSWORD