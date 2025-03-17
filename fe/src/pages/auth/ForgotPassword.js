import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

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
        setOtpSent(true);
      }
    } catch (error) {
      toast.error("Lỗi khi gửi OTP, vui lòng thử lại.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer theme="dark" position="top-right" autoClose={1500} />
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Quên mật khẩu</h2>
        {!otpSent ? (
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
        ) : (
          <p className="text-center text-green-600 font-medium">
            Mã OTP đã được gửi qua email. Vui lòng kiểm tra hộp thư của bạn.
          </p>
        )}
        <div className="mt-4 text-center text-sm">
          <Link to="/dang-nhap" className="text-blue-600 hover:text-blue-400">Quay lại đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
