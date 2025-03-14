import React, { useEffect, useState } from "react";
import { useUser } from "../../utils/customHook";
import { updateUserr } from "../../services/customerService/customer.service";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { Button, Divider, Flex, Radio, Space, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../stores/redux/slices/userSlice";
const ProfilePage = () => {
  const currentUser = useUser();
  const token = Cookies.get("authToken");
  const [position, setPosition] = useState("end");
  const [loading, setLoading] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    fullname: "",
    image: "",
    phoneNumber: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    if (Cookies.get("authToken") && currentUser?.success) {
      toast.success(`Chào mừng bạn trở lại ${currentUser.data.name}`);
    }
  }, []);
  useEffect(() => {
    if (currentUser?.data) {
      setUpdateUser({
        fullname: currentUser.data.name,
        image: currentUser.data.image, // Hiển thị ảnh cũ
        phoneNumber: currentUser.data.phoneNumber,
      });
    }
  }, [currentUser]);
  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      const file = files[0];
      setUpdateUser((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file)); // Hiển thị ảnh trước khi upload
    } else {
      setUpdateUser((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleUpdate = async () => {
    if (!updateUser.fullname.trim()) {
      toast.error("Tên hiển thị không được để trống!", {
        position: "top-center",
      });
      return;
    }
    const nameRegex = /^[^\d]+$/; // Không chứa số
    if (!nameRegex.test(updateUser.fullname)) {
      toast.error("Tên hiển thị không được chứa số!", {
        position: "top-center",
      });
      return;
    }
  
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(updateUser.phoneNumber)) {
      toast.error("Số điện thoại không hợp lệ! (10 số)", {
        position: "top-center",
      });
      return;
    }
  
    if (updateUser.image instanceof File) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(updateUser.image.type)) {
        toast.error("Chỉ chấp nhận ảnh định dạng JPG, JPEG, PNG!", {
          position: "top-center",
        });
        return;
      }
    }
    try {
      const formData = new FormData();
      formData.append("fullname", updateUser.fullname);
      formData.append("phoneNumber", updateUser.phoneNumber);
      if (updateUser.image instanceof File) {
        formData.append("image", updateUser.image);
      }
      setLoading(true);
      const res = await updateUserr(currentUser.data.UID, formData, token);
      console.log(res);
  
      if (res?.success === true) {
        setLoading(false);
        console.log("Cập nhật thành công");
  
        toast.success(res?.message, { position: "top-center" });
  
        // Cập nhật lại giá trị trong state sau khi thành công
        setUpdateUser((prev) => ({
          ...prev,
          image: res?.data?.imageUrl || prev.image, // Cập nhật ảnh mới nếu có
          fullname: res?.data?.fullname || prev.fullname, // Cập nhật fullname nếu có thay đổi
          phoneNumber: res?.data?.phoneNumber || prev.phoneNumber, // Cập nhật phoneNumber nếu có thay đổi
        }));
  
      } else {
        toast.error(res?.message, { position: "top-center" });
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật!", { position: "top-center" });
    }
  };
  

  return (
    <div className="flex-1 p-5">
      <ToastContainer position="bottom-right"/>
      <h3 className="text-xl font-semibold mb-5">Thông tin cá nhân</h3>
      <div className="mb-5">
        <label className="block font-medium">Tên hiển thị *</label>
        <input
          type="text"
          name="fullname"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={updateUser.fullname}
          onChange={handleOnChange}
        />
      </div>

      <div className="mb-5">
        <label className="block font-medium">Hình ảnh đại diện *</label>
        <img
          className="w-24 h-24 rounded-md mb-2"
          src={
            previewImage || updateUser.image || "https://picsum.photos/200/300"
          }
          alt="Profile"
        />
        <input
          type="file"
          name="image"
          onChange={handleOnChange}
          className="bg-gray-200 py-2 px-4 rounded-md"
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium">Email *</label>
        <input
          type="text"
          disabled
          name="Email"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={currentUser?.data?.email}
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium">Số điện thoại *</label>
        <input
          type="text"
          name="phoneNumber"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={updateUser.phoneNumber}
          onChange={handleOnChange}
        />
      </div>

      <Button
        type="primary"
        onClick={handleUpdate}
        className="bg-red-500 text-white py-2 px-4 rounded-md"
        loading={loading}
        iconPosition={position}
      >
        Lưu thay đổi
      </Button>
    </div>
  );
};

export default ProfilePage;
