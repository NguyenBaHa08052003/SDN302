"use client";

import { useEffect, useState } from "react";
import {
  Table,
  InputNumber,
  Tooltip,
  Button,
  Card,
  Typography,
  Space,
  Tag,
  Input,
} from "antd";
import axios from "axios";
import {
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Header, Stats } from "./LayoutLodgingManagement/Layout";
import RoomDetailModal from "./LayoutLodgingManagement/room-detail-modal";
import "./lodging-management.css";
import { toast, ToastContainer } from "react-toastify";
import UpdateLodgingModal from "./LayoutLodgingManagement/update-lodging-modal";

const { Title } = Typography;

const LodgingManagement = () => {
  const [lodgings, setLodgings] = useState({ data: [] });
  const [filteredLodgings, setFilteredLodgings] = useState([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRecordUpdate, setSelectedRecordUpdate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredStatus, setFilteredStatus] = useState(null);
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    const userId = sessionStorage.getItem("UserId");
    if (!userId) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/api/lodgings/${JSON.parse(userId)}/users`
        );
        setLodgings(res.data);
        setFilteredLodgings(res?.data?.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // Hàm lọc theo giá và diện tích
  const handleFilter = (key, minValue, maxValue) => {
    if (
      (minValue === undefined || minValue === null || minValue === "") &&
      (maxValue === undefined || maxValue === null || maxValue === "")
    ) {
      setFilteredLodgings(lodgings?.data);
      return;
    }

    const newData = lodgings?.data?.filter((item) => {
      const value = item[key];
      const isValidMin =
        minValue === undefined || minValue === "" || value >= minValue;
      const isValidMax =
        maxValue === undefined || maxValue === "" || value <= maxValue;
      return isValidMin && isValidMax;
    });

    setFilteredLodgings(newData);
  };

  // Hàm xử lý xem chi tiết phòng
  const handleViewDetail = (record) => {
    setSelectedRecord(record);
    setIsDetailModalVisible(true);
  };


  // Update your handleEditRoom function
  const handleEditRoom = (record) => {
    setSelectedRecordUpdate(record)
    setIsUpdateModalVisible(true)
  }
  
  const handleToggleRoomStatus = async (record) => {
     if(window.confirm("Bạn có chắc muốn thay đổi trạng thái?")){
      try {
        setLoading(true);
        const newStatus = record.status === 1 ? 0 : 1;
        const statusText = newStatus === 1 ? "mở" : "đóng";
        const response = await axios.put(
          `http://localhost:3000/api/lodgings/${record._id}/toggle-status`,
          {
            status: newStatus,
            userId: record.user,
          }
        );
        if (response.status === 200) {
          const updatedLodgings = lodgings.data.map((item) =>
            item._id === record._id ? { ...item, status: newStatus } : item
          );
          setLodgings({ ...lodgings, data: updatedLodgings });
          setFilteredLodgings(updatedLodgings);
          toast.success(
            `Đã ${statusText} trạng thái phòng "${record.name}" thành công!`
          );
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái phòng:", error);
        toast.error("Không thể cập nhật trạng thái phòng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
     }
  };

  // Hàm xử lý đóng modal
  const handleCloseModal = () => {
    setIsDetailModalVisible(false);
    setIsUpdateModalVisible(false);
  };
  // Cột table
  const columns = [
    {
      title: (
        <div>
          <span style={{ marginRight: 8 }}>Tên phòng</span>
          <Input
            placeholder="Tìm kiếm..."
            value={searchText}
            onChange={handleSearch}
            style={{ width: 150 }}
            size="small"
          />
        </div>
      ),
      dataIndex: "name",
      key: "name",
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
      filteredValue: searchText ? [searchText] : [],
      render: (text) => <span className="font-bold text-blue-500">{text}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <p>
          <span style={{ color: "red" }}>{price.toLocaleString("vi-VN")}</span>{" "}
          VND
        </p>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <InputNumber
            placeholder="Tối thiểu"
            value={selectedKeys[0]}
            onChange={(value) => {
              const newKeys = [value, selectedKeys[1]];
              setSelectedKeys(newKeys);
              handleFilter("price", newKeys[0], newKeys[1]);
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
          <InputNumber
            placeholder="Tối đa"
            value={selectedKeys[1]}
            onChange={(value) => {
              const newKeys = [selectedKeys[0], value];
              setSelectedKeys(newKeys);
              handleFilter("price", newKeys[0], newKeys[1]);
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
              const newKeys = [value, selectedKeys[1]];
              setSelectedKeys(newKeys);
              handleFilter("area", newKeys[0], newKeys[1]);
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
          <InputNumber
            placeholder="Tối đa"
            value={selectedKeys[1]}
            onChange={(value) => {
              const newKeys = [selectedKeys[0], value];
              setSelectedKeys(newKeys);
              handleFilter("area", newKeys[0], newKeys[1]);
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
      render: (text, record) => `${record.detail_address || ""}, ${text}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Chưa ai thuê", value: 1 },
        { text: "Đã cho thuê", value: 0 },
      ],
      onFilter: (value, record) => Number(record.status) === value,
      filteredValue: filteredStatus !== null ? [filteredStatus] : null,
      render: (status) => (
        <Tag color={status === 1 ? "green" : "red"} className="text-sm py-1 px-2">
          {status === 1 ? "Chưa ai thuê" : "Đã cho thuê"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetail(record)}
            />
          </Tooltip>

          <Tooltip title="Chỉnh sửa">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => handleEditRoom(record)}
            />
          </Tooltip>

          <Tooltip title={record.status === 1 ? "Đóng trọ" : "Mở trọ"}>
            <Button
              type={record.status === 1 ? "dashed" : "primary"}
              danger={record.status === 1}
              icon={record.status === 1 ? <LockOutlined /> : <UnlockOutlined />}
              onClick={() => handleToggleRoomStatus(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <div className="container mx-auto p-4">
    <ToastContainer position="top-center"/>
      <Header />
      <Stats lodgings={lodgings.data} />
      <Card className="lodging-table-card">
        <Title level={4} className="mb-4">
          <HomeOutlined className="mr-2" /> Quản lý tin đã đăng
        </Title>
        <Table
          columns={columns}
          dataSource={filteredLodgings}
          rowKey="id"
          pagination={{ pageSize: 8 }}
          loading={loading}
          className="lodging-table"
          rowClassName="lodging-table-row"
          onChange={(pagination, filters) => {
            setFilteredStatus(filters.status?.[0] ?? null);
          }}
        />
      </Card>
      {/* Room Detail Modal Component */}
      <RoomDetailModal
        isDetailModalVisible={isDetailModalVisible}
        handleCloseModal={handleCloseModal}
        selectedRecord={selectedRecord}
      />
      {selectedRecordUpdate && (
        <UpdateLodgingModal
          isVisible={isUpdateModalVisible}
          onClose={() => setIsUpdateModalVisible(false)}
          selectedRecordUpdate={selectedRecordUpdate}
          onUpdateSuccess={() => {
            // Refresh your data
            const userId = sessionStorage.getItem("UserId")
            if (userId) {
              setLoading(true)
              axios
                .get(`http://localhost:3000/api/lodgings/${JSON.parse(userId)}/users`)
                .then((res) => {
                  setLodgings(res.data)
                  setFilteredLodgings(res?.data?.data || [])
                })
                .catch((error) => {
                  console.error("Lỗi khi lấy dữ liệu:", error)
                })
                .finally(() => {
                  setLoading(false)
                })
            }
          }}
        />
      )}
    </div>
  );
};

export default LodgingManagement;
