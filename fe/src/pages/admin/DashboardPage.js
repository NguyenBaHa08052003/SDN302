import { useEffect, useMemo, useState } from "react";
import { Users, Settings } from "lucide-react";
import { DatePicker } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import dayjs from "dayjs";
import {
  addUser,
  getAllRole,
  getAllUsers,
  updateUser,
} from "../../services/adminService/admin.service";
import Cookies from "js-cookie";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import { Button, Table } from "antd";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../stores/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../services/orderService/order.ssevice";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="w-64 bg-gray-900 text-white  p-5">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <ul>
        <li
          className="mb-4 cursor-pointer flex items-center"
          onClick={() => setActivePage("users")}
        >
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
  const { search, setSearch, roles, setRoles, users, token, setUsers } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const filterUser = users?.filter?.((user) => {
    const matchSearch =
      user?.fullname?.toLowerCase().includes(search?.toLowerCase()) ||
      user?.email?.toLowerCase().includes(search?.toLowerCase()) ||
      search === "";
    return matchSearch;
  });

  const openRoleModal = (user) => {
    if (user?.role?.name == 'Admin') {
      toast.error('Không thể thay đổi role của Admin', { position: "top-center" });
      return;
    }
    setSelectedUser(user);
    setIsOpen(true);
  };

  const changeUserRole = async (newRole) => {
    try {
      if (!selectedUser) return;
      const updateU = await updateUser(selectedUser._id, { role: newRole }, token);
      if (updateU) {
        toast.success(`Role updated to ${roles.find((role) => role._id === newRole)?.name}`, {
          position: "top-center",
        });
        setUsers(users.map((user) => (user._id === selectedUser._id ? updateU?.data : user)));
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (idUser, data, type) => {
    if (data?.role?.name == 'Admin') {
      toast.error('Không thể thay đổi quyền của Admin', { position: "top-center" });
      return;
    }
    try {
      if (
        window.confirm("Bạn có thật sự muốn thay đổi status của tài khoản này?")
      ) {
        const updateU = await updateUser(idUser, { status: !data.status }, token)
        if (updateU) {
          // hien thi ra toast
          setTimeout(() => {
            toast.success(updateU?.message, {
              position: "top-center",
            });
          }, 1000);

          setUsers(
            users?.map((user) => (user?._id == idUser ? updateU?.data : user))
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {users?.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Role</th>
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
                <td className="border p-2">{user?.role?.name ?? "N/A"}</td>
                <td
                  className={`border p-2 ${user?.status ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {user?.status ? "Active" : "Inactive"}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleUpdate(user?._id, user, "status")}
                    className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Change Status
                  </button>
                </td>
                <td className="border p-2">
                  <button
                    // onClick={() => handleUpdate(user?._id, user, "role")}
                    onClick={() => openRoleModal(user)}
                    className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Change Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Cannot get data...</p>
      )}

      {isOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Select New Role for {selectedUser.fullname}</h2>
            <div className="mt-4">
              {roles?.filter((role) => role?.name !== "Admin").map((role) => (
                <button
                  key={role._id}
                  onClick={() => changeUserRole(role._id)}
                  className="block w-full p-2 my-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                  {role.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("users");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const token = Cookies.get("authToken");
  const [loading, setLoading] = useState(false);
  const { RangePicker } = DatePicker;
  const [orders, setOrders] = useState([]);
  const [newUser, setNewUser] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    role: "",
  });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUsers(token);
        if (response) {
          setUsers(response?.data);
        }
        const responseRole = await getAllRole(token);
        if (responseRole.data.success === false) {
          return;
        }
        setRoles(responseRole?.data);
        const responseOrder = await getAllOrders(token);
        setOrders(responseOrder?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const [error, setError] = useState([]);
  const handleSave = async () => {
    let errors = [];

    if (
      !newUser.fullname ||
      !newUser.email ||
      !newUser.phoneNumber ||
      !newUser.role
    ) {
      errors.push("Vui lòng nhập đầy đủ thông tin.");
    }

    if (!newUser.email.includes("@") || !newUser.email.includes(".")) {
      errors.push("Email không hợp lệ.");
    }

    if (newUser.phoneNumber.length !== 10) {
      errors.push("Số điện thoại không hợp lệ.");
    }

    if (
      newUser.fullname.trim().length < 3 ||
      newUser.fullname.trim().length > 50 ||
      !/^[\p{L}\s]+$/u.test(newUser.fullname)
    ) {
      errors.push("Họ tên không hợp lệ.");
    }
    setError(errors);

    if (errors.length > 0) {
      toast.error(error[0], {
        position: "top-center",
      }); // Hiển thị lỗi đầu tiên bằng toast
      return;
    }
    try {
      setLoading(true);
      const response = await addUser(newUser, token);
      if (response) {
        setLoading(false);
        setTimeout(() => {
          toast.success(response?.message, {
            position: "top-center",
          });
        }, 1500);
        setUsers([...users, response?.data]);
        setNewUser({
          fullname: "",
          email: "",
          phoneNumber: "",
          role: "",
        });
      }
    } catch (error) {
      toast.error(error?.data.message, {
        position: "top-center",
      }); // Hiển thị lỗi đầu tiên bằng toast
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  //ANTD
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
    },
    {
      title: 'Full Name',
      dataIndex: 'FullName',
      sorter: (a, b) => a.FullName.localeCompare(b.FullName),
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      sorter: (a, b) => a.Email.localeCompare(b.Email),
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      sorter: (a, b) => a.Amount - b.Amount,
    },
    {
      title: 'Rank',
      dataIndex: 'Rank',
      sorter: (a, b) => a.Rank - b.Rank,
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      sorter: (a, b) => a.Status.localeCompare(b.Status),
      render: (status) => {
        let color = 'gray-500'; // Mặc định
        if (status == 'success') color = 'green-500';
        else if (status == 'pending') color = 'yellow';
        else if (status == 'cancel') color = 'red';

        return <span className={`text-${color} font-semibold`}>{status}</span>;
      }
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      sorter: (a, b) => a.Description.localeCompare(b.Description),
    },
  ];

  const dataa = orders.map((order) => {
    return {
      key: order._id,
      ID: order?.app_trans_id,
      FullName: order?.user?.fullname,
      Email: order?.user?.email,
      Amount: order?.amount,
      Rank: order?.rank,
      Status: order?.status,
      Description: order?.description
    }
  })


  const data = [
    {
      key: '1',
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: '2',
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  // chart tron
  const statusData = [
    { name: "Pending", value: dataa.filter(item => item.Status === "pending").length, color: "#FFA500" },
    { name: "Success", value: dataa.filter(item => item.Status === "success").length, color: "#00C49F" },
    { name: "Cancel", value: dataa.filter(item => item.Status === "cancel").length, color: "#FF4444" }
  ];

  //char bieu do 

  const [dateRange, setDateRange] = useState([
    dayjs().subtract(6, "day"),
    dayjs()
  ]);

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
    }
  };

  const filteredOrders = orders.filter(order => {
    const orderDate = dayjs(order.createdAt);
    return orderDate.isAfter(dateRange[0].startOf('day')) && orderDate.isBefore(dateRange[1].endOf('day'));
  });

  const revenueByDate = filteredOrders.reduce((acc, order) => {
    const date = dayjs(order.createdAt).format("YYYY-MM-DD");
    acc[date] = (acc[date] || 0) + order.amount;
    return acc;
  }, {});

  const chartData = Object.entries(revenueByDate)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1);

  //update role

  return (
    <div className="flex h-screen">
      <ToastContainer />
      <Sidebar setActivePage={setActivePage} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">
          {activePage === "users" ? "User Management" : "Settings"}
        </h1>



        {activePage === "users" ? (
          <>
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
            <UserTable
              token={token}
              users={users}
              setUsers={setUsers}
              roles={roles}
              setRoles={setRoles}
              search={search}
              setSearch={setSearch}
            />
          </>
        ) : (
          //Table and chart
          <div className="flex flex-col h-full ">
            <div className="grid grid-cols-5 grid-rows-[auto] gap-4 p-4">
              {/* Bảng dữ liệu */}
              <div className="col-span-4 row-span-3 bg-white shadow-md rounded-lg p-4">
                <Table columns={columns} dataSource={dataa} onChange={onChange} />
              </div>

              {/* Biểu đồ tròn */}
              <div className="col-span-1 row-span-3 flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Transaction Status</h3>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={50}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Doanh thu theo ngày */}
              <div className="max-w-full h-full col-span-5 row-span-2 bg-white shadow-md rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold mb-2">Revenue by Date</h3>
                <DatePicker.RangePicker
                  value={dateRange}
                  onChange={handleDateChange}
                  format="YYYY-MM-DD"
                />
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        )}

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="p-6 bg-white rounded-lg shadow-xl w-1/3 mx-auto mt-20"
        >
          <h2 className="text-xl font-bold mb-4">Add User</h2>
          <input
            required
            type="text"
            onChange={(e) => handleOnChange(e)}
            name="fullname"
            value={newUser.fullname}
            placeholder="Full Name"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            required
            type="email"
            onChange={(e) => handleOnChange(e)}
            name="email"
            value={newUser.email}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            required
            type="text"
            onChange={(e) => handleOnChange(e)}
            name="phoneNumber"
            value={newUser.phoneNumber}
            placeholder="Phone Number"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <select
            value={newUser.role}
            name="role"
            onChange={(e) => handleOnChange(e)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value={""}>Select Role</option>
            {roles?.map((role) => (
              <option key={role.id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end">
            <button
              className="mr-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
            <Button
              onClick={() => handleSave()}
              loading={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white py-6 px-4 rounded"
            >
              Save
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
