import React from 'react'
import { Forward } from "lucide-react"
import { Link } from 'react-router'

function TopBar({ boardName }: { boardName: string }) {
    return (
        <div className="fixed bottom-4 right-4 flex items-center space-x-1 bg-white dark:bg-gray-800 p-1 shadow-md border z-10">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {boardName}
            </span>
            <Link to={'/boards'} className='cursor-pointer'>
                <Forward size={14}  />
            </Link>
            {/* <Link
                href={backLink}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Go back</span>
            </Link> */}
        </div>
    )
}

export default TopBar