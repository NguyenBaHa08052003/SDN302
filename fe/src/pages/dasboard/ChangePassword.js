import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import authTokenControl from "../../utils/authToken";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Xử lý gửi form
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/change-password",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokenControl.getToken()}`,
          },
        }
      );
      toast.success(response.data.message);
      message.success("Mật khẩu đã được thay đổi!");
      setTimeout(() => navigate("/"), 2000); // Chuyển về trang đăng nhập sau 2s
    } catch (error) {
      toast.error(error.response?.data?.message || "Đổi mật khẩu thất bại!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <ToastContainer position="top-right" autoClose={1500} />
      <h2 className="text-2xl font-bold text-center mb-6">Đổi Mật Khẩu</h2>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Nhập Email */}
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email của bạn" />
        </Form.Item>

        {/* Nhập Mật khẩu cũ */}
        <Form.Item
          name="oldPassword"
          label="Mật khẩu cũ"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu cũ" />
        </Form.Item>

        {/* Nhập Mật khẩu mới */}
        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới!" },
            { min: 8, message: "Mật khẩu mới phải có ít nhất 8 ký tự!" },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>

        {/* Nút Xác nhận */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
