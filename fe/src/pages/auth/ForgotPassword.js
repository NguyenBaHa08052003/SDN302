import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Nhập email, 2: Nhập OTP & Mật khẩu mới
  const navigate = useNavigate();

  // 🟢 Gửi OTP đến email
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Vui lòng nhập email.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/auth/forgot-password", { email });
      setLoading(false);
      if (response.data.message) {
        toast.success(response.data.message);
        setStep(2); // Chuyển sang bước nhập OTP
      }
    } catch (error) {
      toast.error("Lỗi khi gửi OTP, vui lòng thử lại.");
      setLoading(false);
    }
  };

  // 🔵 Xác thực OTP & đặt lại mật khẩu mới
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      toast.error("Vui lòng nhập đầy đủ OTP và mật khẩu mới.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      setLoading(false);
      if (response.data.message) {
        toast.success("Mật khẩu đã được đặt lại. Vui lòng đăng nhập!");
        setTimeout(() => navigate("/dang-nhap"), 2000); // Chuyển về trang đăng nhập
      }
    } catch (error) {
      toast.error("OTP không hợp lệ hoặc đã hết hạn.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer theme="dark" position="top-right" autoClose={1500} />
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {step === 1 ? "Quên mật khẩu" : "Xác thực OTP"}
        </h2>

        {step === 1 && (
          <form onSubmit={handleForgotPassword}>
            <label className="block text-sm font-medium text-gray-700">Nhập email của bạn</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:ring-black focus:border-black"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              {loading ? "Đang gửi OTP..." : "Gửi OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <label className="block text-sm font-medium text-gray-700">Nhập OTP</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:ring-black focus:border-black"
              placeholder="Nhập mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <label className="block text-sm font-medium text-gray-700 mt-3">Mật khẩu mới</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:ring-black focus:border-black"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </button>
          </form>
        )}

        <div className="mt-4 text-center text-sm">
          <Link to="/dang-nhap" className="text-blue-600 hover:text-blue-400">Quay lại đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
