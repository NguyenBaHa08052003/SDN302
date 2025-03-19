import React from "react";
import { FacebookOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import withAuth from "../../../stores/hoc/withAuth";

const  SupportSystem =() => {
  return (
    <div className="flex flex-col gap-4 justify-center align-center p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl text-center">
      <h2 className="text-xl font-semibold mb-4">📞 Hỗ Trợ Khách Hàng</h2>
      <p className="text-lg flex items-center justify-center gap-2">
        <MailOutlined className="text-blue-500" /> Email:{" "}
        <span className="font-medium">nvthai061105@gmail.com</span>
      </p>
      <p className="text-lg flex items-center justify-center gap-2">
        <PhoneOutlined className="text-green-500" /> Hotline:{" "}
        <span className="font-medium">+84 386 828 929</span>
      </p>
      <p className="text-lg flex items-center justify-center gap-2">
        <FacebookOutlined className="text-blue-600" /> Facebook:{" "}
        <a
          href="https://facebook.com/adminsupport"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 font-medium hover:underline"
        >
          Admin Support
        </a>
      </p>
      <p className="text-lg flex items-center justify-center gap-2">
        🌐 Zalo:{" "}
        <a
          href="https://zalo.me/0386828929"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 font-medium hover:underline"
        >
          +84 386 828 929
        </a>
      </p>
    </div>
  );
}

export default withAuth(SupportSystem);