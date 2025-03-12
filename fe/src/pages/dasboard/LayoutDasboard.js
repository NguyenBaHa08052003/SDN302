import React from 'react'
import Sidebar from './Sidebarr'
import ProfilePage from './ProfilePage'
import { Outlet } from 'react-router-dom'

function LayoutDasboard() {
    return (
        <div className="flex min-h-screen bg-gray-100 p-5">
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default LayoutDasboard
