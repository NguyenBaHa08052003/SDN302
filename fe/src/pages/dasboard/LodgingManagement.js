import { Table, InputNumber } from "antd";
import { Header, Stats } from "./LayoutLodgingManagement/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

const LodgingManagement = () => {
  const [lodgings, setLodgings] = useState([]);
  const [filteredLodgings, setFilteredLodgings] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("UserId");
    if (!userId) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/lodgings/${JSON.parse(userId)}/users`);
        setLodgings(res.data);
        setFilteredLodgings(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  // Hàm lọc theo giá và diện tích
  const handleFilter = (key, value) => {
    if (value === undefined || value === null || value === "") {
      setFilteredLodgings(lodgings);
      return;
    }
    const newData = lodgings?.data?.filter((item) => item[key] >= value);
    setFilteredLodgings(newData);
  };

  const columns = [
    {
      title: "Tên phòng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <InputNumber
            placeholder="Tối thiểu"
            value={selectedKeys[0]}
            onChange={(value) => {
              setSelectedKeys(value ? [value] : []);
              handleFilter("price", value);
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
          <InputNumber
            placeholder="Tối đa"
            value={selectedKeys[1]}
            onChange={(value) => {
              setSelectedKeys(value ? [selectedKeys[0], value] : []);
              handleFilter("price", value);
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
        </div>
      ),
    },
    {
      title: "Diện tích (m²)",
      dataIndex: "area",
      key: "area",
      sorter: (a, b) => a.area - b.area,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <InputNumber
            placeholder="Tối thiểu"
            value={selectedKeys[0]}
            onChange={(value) => {
              setSelectedKeys(value ? [value] : []);
              handleFilter("area", value);
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
          <InputNumber
            placeholder="Tối đa"
            value={selectedKeys[1]}
            onChange={(value) => {
              setSelectedKeys(value ? [selectedKeys[0], value] : []);
              handleFilter("area", value);
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
        </div>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Header/>
      <Stats lodgings={lodgings.data}/>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Quản lý tin đã đăng</h2>
        <Table columns={columns} dataSource={filteredLodgings.data} rowKey="id" />
      </div>
    </div>
  );
};

export default LodgingManagement;
