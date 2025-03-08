import { useEffect, useState } from "react";
import { Users, Settings } from "lucide-react";
import { getAllRole, getAllUsers } from "../../services/adminService/admin.service";
import Cookies from 'js-cookie';
import Modal from "react-modal";

const Sidebar = ({ setActivePage }) => {
    return (
        <div className="w-64 bg-gray-900 text-white h-screen p-5">
            <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
            <ul>
                <li className="mb-4 cursor-pointer flex items-center" onClick={() => setActivePage("users")}>
                    <Users className="mr-2" /> Users
                </li>
                <li className="mb-4 cursor-pointer flex items-center" onClick={() => setActivePage("settings")}>
                    <Settings className="mr-2" /> Settings
                </li>
            </ul>
        </div>
    );
};

const UserTable = (props) => {
    const { search, setSearch, roles, setRoles } = props;
    const token = Cookies.get('authToken');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllUsers(token);
                if (response) {
                    setUsers(response.data);
                }
                const responseRole = await getAllRole(token);
                setRoles(responseRole.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    console.log(users);

    const filterUser = users.filter((user) => {
        const matchSearch = user?.fullname?.toLowerCase().includes(search?.toLowerCase()) || user?.email?.toLowerCase().includes(search?.toLowerCase()) || search === "";
        return matchSearch;
    });

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
                        </tr>
                    </thead>
                    <tbody>
                        {filterUser.map((user, index) => (
                            <tr key={user?.id ?? index} className="text-center">
                                <td className="border p-2">{user?.fullname ?? "N/A"}</td>
                                <td className="border p-2">{user?.email ?? "N/A"}</td>
                                <td className="border p-2">{user?.phoneNumber ?? "N/A"}</td>
                                <td className={`border p-2 ${user?.status ? "text-green-500" : "text-red-500"}`}>
                                    {user?.status ? "Active" : "Inactive"}
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
    return (
        <div className="flex h-screen">
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

                {activePage === "users" ? <UserTable roles={roles} setRoles={setRoles} search={search}
                    setSearch={setSearch} /> : <p>Settings Page</p>}

                {/* Modal */}
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="p-6 bg-white rounded-lg shadow-xl w-1/3 mx-auto mt-20">
                    <h2 className="text-xl font-bold mb-4">Add User</h2>
                    <input type="text" placeholder="Full Name" className="w-full p-2 border border-gray-300 rounded mb-2" />
                    <input type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded mb-2" />
                    <input type="text" placeholder="Phone Number" className="w-full p-2 border border-gray-300 rounded mb-2" />
                    <select className="w-full p-2 border border-gray-300 rounded mb-4">
                        {roles?.map((role) => (
                            <option key={role.id} value={role._id}>{role.name}</option>
                        ))}
                    </select>
                    <div className="flex justify-end">
                        <button className="mr-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded" onClick={() => setModalIsOpen(false)}>Cancel</button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Save</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
