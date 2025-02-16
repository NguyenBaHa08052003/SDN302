import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService/auth.service";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = Object.fromEntries(new FormData(e.target));
      setLoading(true);
      const response = await authService.login(form);
      console.log(response);
      
      setLoading(false);
      if (response.data) {
        toast.success("Chờ một chút!!!");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
        return;
      }
      if (response.message) {
        toast.error(response.message);
        console.log("hello");
      }
      if (response.message.password) {
        console.log("hello");
        toast.error(response.message.password);
      }
      if (response.message.email) {
        toast.error(response.message.email);
        console.log("hello");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };
  
  return (
    <div
      tabIndex="-1"
      className="bg-black/5 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] h-full items-center justify-center popup flex"
    >
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow popup-body">
          <div className="p-5">
            <h3 className="text-2xl mb-0.5 font-medium"> </h3>
            <p className="mb-4 text-sm font-normal text-gray-800"> </p>
            <div className="mb-7 text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                Login to your account
              </p>
              <p className="mt-2 text-sm leading-4 text-slate-600">
                You must be logged in to perform this action.
              </p>
            </div>
            <div>
              <div className="flex w-full flex-col gap-2">
                <a
                  href="http://localhost:3000/api/auth/google"
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 90 92"
                    fill="none"
                    className="h-[18px] w-[18px]"
                  >
                    <path
                      d="M90 47.1c0-3.1-.3-6.3-.8-9.3H45.9v17.7h24.8c-1 5.7-4.3 10.7-9.2 13.9l14.8 11.5C85 72.8 90 61 90 47.1z"
                      fill="#4280ef"
                    ></path>
                    <path
                      d="M45.9 91.9c12.4 0 22.8-4.1 30.4-11.1L61.5 69.4c-4.1 2.8-9.4 4.4-15.6 4.4-12 0-22.1-8.1-25.8-18.9L4.9 66.6c7.8 15.5 23.6 25.3 41 25.3z"
                      fill="#34a353"
                    ></path>
                    <path
                      d="M20.1 54.8c-1.9-5.7-1.9-11.9 0-17.6L4.9 25.4c-6.5 13-6.5 28.3 0 41.2l15.2-11.8z"
                      fill="#f6b704"
                    ></path>
                    <path
                      d="M45.9 18.3c6.5-.1 12.9 2.4 17.6 6.9L76.6 12C68.3 4.2 57.3 0 45.9.1c-17.4 0-33.2 9.8-41 25.3l15.2 11.8c3.7-10.9 13.8-18.9 25.8-18.9z"
                      fill="#e54335"
                    ></path>
                  </svg>
                  Continue with Google
                </a>
              </div>
              <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                <div className="h-px w-full bg-slate-200"></div>OR
                <div className="h-px w-full bg-slate-200"></div>
              </div>
              <form className="w-full" onSubmit={handleSubmit}>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Email Address"
                />
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Password"
                />
                <p className="mb-3 mt-2 text-sm text-gray-500">
                  <Link
                    to="/forgot-password"
                    className="text-blue-800 hover:text-blue-600"
                  >
                    Reset your password?
                  </Link>
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                >
                  Continue
                </button>
              </form>
            </div>
            <div className="mt-6 text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-[#4285f4]">
                {" "}
                Sign up
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
