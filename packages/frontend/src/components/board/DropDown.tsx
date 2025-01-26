import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Ellipsis } from 'lucide-react'
import { TBoard } from '../../misc/data'

export function DropDownList({ setData, idx }: { setData: React.Dispatch<React.SetStateAction<TBoard>>, idx: number }) {
    return (
        <MenuItems
            transition
            className="cursor-pointer outline-1 absolute right-0 z-20 w-52"
        >
            <MenuItem as="div" className="cursor-pointer block px-4 py-2 text-sm text-gray-700 bg-white"
                onClick={() => {
                    setData((prev) => {
                        prev.columns.splice(idx, 1)
                        return ({ ...prev })
                    })
                }}>
                Delete
            </MenuItem>
        </MenuItems>
    )
}

export function DropDownButton() {
    return (
        <div>
            <MenuButton className='ease-out duration-75 cursor-pointer hover:outline flex justify-center rounded-sm'>
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
