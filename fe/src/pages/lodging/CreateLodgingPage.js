import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Upload, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import LocationUtil from "../../components/LocationUtil.js";
import lodgingService from "../../services/lodgingService.js/lodging.service";

const { TextArea } = Input;
const { Option } = Select;

const CreateLodgingPage = () => {
  const [form] = Form.useForm();
  const [location, setLocation] = useState(""); // Địa chỉ từ LocationUtil
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lodgingTypes, setLodgingTypes] = useState([]); // Lưu danh sách loại chỗ ở

  // Gọi API lấy danh sách loại chỗ ở
  useEffect(() => {
    const fetchLodgingTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/lodgings/lodging-types"); // Thay URL bằng API thực tế
        setLodgingTypes(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại chỗ ở:", error);
      }
    };
    fetchLodgingTypes();
  }, []);

  // Xử lý upload file
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Gửi dữ liệu lên server
  const handleSubmit = async (values) => {
    if (fileList.length === 0) {
      message.error("Vui lòng tải ít nhất một hình ảnh!");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("area", values.area);
    formData.append("detail_address", values.detail_address);
    formData.append("address", location); // Địa chỉ lấy từ LocationUtil
    formData.append("type", values.type);

    // Thêm hình ảnh vào formData
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    setLoading(true);
    try {
      const response = await lodgingService.createLodging(formData);
      if (response.error) {
        message.error(response.message);
        return;
      }
      message.success("Tạo chỗ ở thành công!");
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Lỗi khi tạo chỗ ở:", error);
      message.error("Tạo chỗ ở thất bại!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Tạo Chỗ Ở Mới</h2>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="name" label="Tên Chỗ Ở" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
          <Input placeholder="Nhập tên chỗ ở" />
        </Form.Item>

        <Form.Item name="price" label="Giá (VND)" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
          <InputNumber min={0} className="w-full" placeholder="Nhập giá" />
        </Form.Item>

        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}>
          <Input placeholder="Nhập tiêu đề" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <TextArea rows={4} placeholder="Nhập mô tả chi tiết" />
        </Form.Item>

        <Form.Item name="area" label="Diện tích (m²)" rules={[{ required: true, message: "Vui lòng nhập diện tích!" }]}>
          <InputNumber min={0} className="w-full" placeholder="Nhập diện tích" />
        </Form.Item>

        <Form.Item name="detail_address" label="Địa chỉ chi tiết">
          <Input placeholder="Nhập địa chỉ chi tiết" />
        </Form.Item>

        {/* Component chọn địa chỉ */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Địa chỉ</label>
          <LocationUtil setLocation={setLocation} />
        </div>

        {/* Chọn loại chỗ ở từ API */}
        <Form.Item name="type" label="Loại Chỗ Ở" rules={[{ required: true, message: "Vui lòng chọn loại!" }]}>
          <Select placeholder="Chọn loại chỗ ở" loading={lodgingTypes.length === 0}>
            {lodgingTypes?.map((type) => (
              <Option key={type._id} value={type._id}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Upload hình ảnh */}
        <Form.Item label="Hình ảnh" rules={[{ required: true, message: "Vui lòng tải ít nhất một hình ảnh!" }]}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false} // Chặn auto-upload
          >
            {fileList.length < 5 && <div><PlusOutlined /> <div className="mt-2">Tải lên</div></div>}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="w-full">
            Tạo Chỗ Ở
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateLodgingPage;
