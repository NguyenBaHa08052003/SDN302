import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebarr';
import { Outlet, useNavigate } from 'react-router-dom';


function LayoutDasboard() {
    const userRole = localStorage.getItem("Role");
    return (
        <div className="flex  bg-gray-100 p-5">
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default LayoutDasboard;
