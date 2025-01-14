import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Ellipsis } from 'lucide-react'
import { TBoard } from '../../misc/data'

export function DropDownList({ setData, idx }: { setData: React.Dispatch<React.SetStateAction<TBoard>>, idx: number }) {
    return (
        <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
            {/* <div className="py-1">
                <MenuItem>
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                        Edit
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                        Duplicate
                    </a>
                </MenuItem>
            </div>
            <div className="py-1">
                <MenuItem>
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                        Archive
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                        Move
                    </a>
                </MenuItem>
            </div>
            <div className="py-1">
                <MenuItem>
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                        Share
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                        Add to favorites
                    </a>
                </MenuItem>
            </div> */}
            <div className="py-1">
                <MenuItem>
                    <a
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                        onClick={() => {
                            setData((prev) => {
                                prev.columns.splice(idx, 1)
                                return ({ ...prev })
                            })
                        }}
                    >
                        Delete
                    </a>
                </MenuItem>
            </div>
        </MenuItems>
    )
}


export function DropDownButton() {
    return (
        <div>
            <MenuButton className='ease-out duration-300 hover:bg-gray-600 flex justify-center'>
                {/* inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 */}
                {/* <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" /> */}
                <Ellipsis size={16} />
            </MenuButton>
        </div>
    )
}

interface Props {
    children?: ReactNode
    // any props that come into the component
}

export function DropDownMenu({ children, ...props }: Props) {
    return (
        <Menu as="div" className={`relative text-left flex justify-center`} {...props}>
            {children}
        </Menu>
    )
}
