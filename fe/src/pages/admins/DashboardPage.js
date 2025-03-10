import { useEffect, useState } from "react";
import { Users, Settings } from "lucide-react";
import { addUser, getAllRole, getAllUsers, updateUser } from "../../services/adminService/admin.service";
import Cookies from 'js-cookie';
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "antd";

const Sidebar = ({ setActivePage }) => {
    return (
        <div className="w-64 bg-gray-900 text-white h-screen p-5">
            <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
            <ul>
                <li className="mb-4 cursor-pointer flex items-center" onClick={() => setActivePage("users")}>
                    <Users className="mr-2" /> Users
                </li>
                {/* <li className="mb-4 cursor-pointer flex items-center" onClick={() => setActivePage("settings")}>
                    <Settings className="mr-2" /> Settings
                </li> */}
            </ul>
        </div>
    );
};



const UserTable = (props) => {
    const { search, setSearch, roles, setRoles, users, token, setUsers } = props;

    const filterUser = users?.filter?.((user) => {
        const matchSearch = user?.fullname?.toLowerCase().includes(search?.toLowerCase()) || user?.email?.toLowerCase().includes(search?.toLowerCase()) || search === "";
        return matchSearch;
    });
    const handleUpdate = async (idUser, data, type) => {
        //67b09b2be997baec6f9b4ce1 là admin
        //67b09b2be997baec6f9b4ce2 là user
        //67b09b2be997baec6f9b4ce3 là landlord
        console.log(roles.find(rol => rol._id == data.role)?.name);

        if (type == "role" && data.role == "67b09b2be997baec6f9b4ce1") {
            toast.error("Bạn không thể thay đổi role tài khoản này vì là tài khoản này là admin", {
                position: "top-center"
            });
            return
        }
        try {
            if (window.confirm(type == "status" ? "Bạn có thật sự muốn thay đổi status của tài khoản này?" : `Bạn có thật sự muốn thay đổi role của tài khoản này sang role khác?. Role hiện tại là ${roles.find(rol => rol._id == data.role)?.name}`)) {
                const updateU = type == "status" ? await updateUser(idUser, { status: !data.status }, token) : await updateUser(idUser, { role: data.role == "67b09b2be997baec6f9b4ce2" ? "67b09b2be997baec6f9b4ce3" : "67b09b2be997baec6f9b4ce2" }, token);
                if (updateU) {
                    console.log(updateU);
                    // hien thi ra toast
                    setTimeout(() => {
                        toast.success(updateU?.message, {
                            position: "top-center"
                        });
                    }, 1000)


                    setUsers(users?.map((user) => user?._id == idUser ? updateU?.data : user));
                }
            }
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div>
            {users?.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Phone Number</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Change Status</th>
                            <th className="border p-2">Change Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterUser?.map((user, index) => (
                            <tr key={user?.id ?? index} className="text-center">
                                <td className="border p-2">{user?.fullname ?? "N/A"}</td>
                                <td className="border p-2">{user?.email ?? "N/A"}</td>
                                <td className="border p-2">{user?.phoneNumber ?? "N/A"}</td>
                                <td className={`border p-2 ${user?.status ? "text-green-500" : "text-red-500"}`}>
                                    {user?.status ? "Active" : "Inactive"}
                                </td>
                                <td className='border p-2'>
                                    <button onClick={() => handleUpdate(user?._id, user, "status")} className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Change Status</button>
                                </td>
                                <td className='border p-2'>
                                    <button onClick={() => handleUpdate(user?._id, user, "role")} className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Change Role</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Cannot get data...</p>
            )}
        </div>
    );
};

export default function AdminDashboard() {
    const [activePage, setActivePage] = useState("users");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [roles, setRoles] = useState([]);
    const token = Cookies.get('authToken');
    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        role: ""
    })

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllUsers(token);
                if (response) {
                    setUsers(response?.data);
                }
                const responseRole = await getAllRole(token);
                setRoles(responseRole?.data);
                console.log(responseRole);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    const [error, setError] = useState([]);
    const handleSave = async () => {
        let errors = [];

        if (!newUser.fullname || !newUser.email || !newUser.phoneNumber || !newUser.role) {
            errors.push("Vui lòng nhập đầy đủ thông tin.");
        }

        if (!newUser.email.includes("@") || !newUser.email.includes(".")) {
            errors.push("Email không hợp lệ.");
        }

        if (newUser.phoneNumber.length !== 10) {
            errors.push("Số điện thoại không hợp lệ.");
        }

        if (newUser.fullname.trim().length < 3 || newUser.fullname.trim().length > 50 || !/^[\p{L}\s]+$/u.test(newUser.fullname)) {
            errors.push("Họ tên không hợp lệ.");
        }
        setError(errors);

        if (errors.length > 0) {
            toast.error(error[0], {
                position: "top-center"
            }); // Hiển thị lỗi đầu tiên bằng toast
            return;
        }
        try {
            setLoading(true)
            const response = await addUser(newUser, token);
            if (response) {
                setLoading(false)
                setTimeout(() => {
                    toast.success(response?.message, {
                        position: "top-center"
                    });
                }, 1500)
                setUsers([...users, response?.data]);
                setNewUser({
                    fullname: "",
                    email: "",
                    phoneNumber: "",
                    role: ""
                })
            }

        } catch (error) {
            toast.error(error?.data.message, {
                position: "top-center"
            }); // Hiển thị lỗi đầu tiên bằng toast
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    }

    //update role

    return (
        <div className="flex h-screen">
            <ToastContainer />
            <Sidebar setActivePage={setActivePage} />
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">{activePage === "users" ? "User Management" : "Settings"}</h1>

                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search users..."

                        value={search}
                        onChange={(e) => setSearch(e.target.value.trim())}
                        className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setModalIsOpen(true)}
                    >
                        Add User
                    </button>
                </div>

                {activePage === "users" ? <UserTable token={token} users={users} setUsers={setUsers} roles={roles} setRoles={setRoles} search={search}
                    setSearch={setSearch} /> : <p>Settings Page</p>}

                {/* Modal */}
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="p-6 bg-white rounded-lg shadow-xl w-1/3 mx-auto mt-20">
                    <h2 className="text-xl font-bold mb-4">Add User</h2>
                    <input required type="text" onChange={(e) => handleOnChange(e)} name="fullname" value={newUser.fullname} placeholder="Full Name" className="w-full p-2 border border-gray-300 rounded mb-2" />
                    <input required type="email" onChange={(e) => handleOnChange(e)} name="email" value={newUser.email} placeholder="Email" className="w-full p-2 border border-gray-300 rounded mb-2" />
                    <input required type="text" onChange={(e) => handleOnChange(e)} name="phoneNumber" value={newUser.phoneNumber} placeholder="Phone Number" className="w-full p-2 border border-gray-300 rounded mb-2" />
                    <select value={newUser.role} name="role" onChange={(e) => handleOnChange(e)} className="w-full p-2 border border-gray-300 rounded mb-4">
                        <option value={""}>Select Role</option>
                        {roles?.map((role) => (
                            <option key={role.id} value={role._id}>{role.name}</option>
                        ))}
                    </select>
                    <div className="flex justify-end">
                        <button className="mr-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded" onClick={() => setModalIsOpen(false)}>Cancel</button>
                        <Button onClick={() => handleSave()} loading={loading} className="bg-blue-500 hover:bg-blue-600 text-white py-6 px-4 rounded">Save</Button>

                    </div>
                </Modal>


            </div>
        </div>
    );
}
