import { Table } from "antd";
import { Header, Stats } from "./LayoutLodgingManagement/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
const LodgingManagement = () => {
  
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],

      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Age",
      dataIndex: "age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
  const [lodgings, setLodgings] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/lodgings/${userId}/users`);
        setLodgings(res.data); 
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
  
    fetchData();
  }, []); // Chỉ chạy khi UID thay đổi
  
  
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  console.log(lodgings);
  
  return (
    <div className="container mx-auto p-4">
      <Header />
      <Stats />
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Quản lý tin đã đăng</h2>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            showSorterTooltip={{
              target: "sorter-icon",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LodgingManagement;
