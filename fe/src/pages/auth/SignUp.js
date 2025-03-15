import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            toast.error("Mật khẩu không khớp!");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: form.name, // Đổi fullname thành fullName nếu backend yêu cầu
                    email: form.email,
                    password: form.password,
                }),
            });

            const data = await response.json().catch(() => null); // Tránh lỗi nếu API không trả về JSON

            if (response.ok && data) {
                toast.success("Đăng ký thành công!");
                setTimeout(() => navigate("/dang-nhap"), 2000);
            } else {
                toast.error(data?.message || "Có lỗi xảy ra!");
            }
        } catch (error) {
            toast.error("Lỗi kết nối server!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer theme="dark" position="top-right" autoClose={1500} />
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <button type="submit" disabled={loading} className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 disabled:bg-gray-400">
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Already have an account? <Link to="/dang-nhap" className="text-blue-600">Login</Link>
                </p>
            </div>
        </div>
    );
}
