import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { verifyAccount } from '../../services/adminService/admin.service';
import Cookies from 'js-cookie';
function VerifyUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = Cookies.get('authToken');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const verify = await verifyAccount(id);
                console.log(verify);
                if (verify) {
                    if (token) {
                        Cookies.remove('authToken');
                    }
                    setTimeout(() => {
                        localStorage.setItem('message verify', verify?.message);
                    }, 1000)
                    setTimeout(() => {
                        navigate('/dang-nhap')
                    }, 2000)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [id])
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                <p className="mt-4 text-lg text-gray-700">Loading ...</p>
            </div>
        </div>
    )
}

export default VerifyUserPage
