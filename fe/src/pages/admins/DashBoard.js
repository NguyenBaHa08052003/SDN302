import axios from "axios";
import React, { useState, useEffect } from "react";

export default function DashBoard() {
  const [images, setImages] = useState([]); // Lưu file ảnh
  const [previews, setPreviews] = useState([]); // Xem trước ảnh
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/lodgings");
        setProducts(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    // Hiển thị ảnh trước khi upload
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!images.length || !form.name || !form.price) {
      alert("Vui lòng nhập đủ thông tin sản phẩm!");
      return;
    }
    const formData = new FormData();
    images.forEach((file) => formData.append("images", file));
    formData.append("name", form.name);
    formData.append("price", form.price);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/lodgings",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProducts([...products, res.data]);
      alert("Thêm sản phẩm thành công!");
      // Reset form
      setImages([]);
      setPreviews([]);
      setForm({ name: "", price: "" });
    } catch (error) {
      console.error("Lỗi khi upload sản phẩm:", error);
      alert("Upload thất bại!");
    }
  };


  const handleDeleteProduct = async (proId) => {
    try {
      await axios.delete(`http://localhost:3000/api/lodgings/${proId}`);
      setProducts(products.filter((product) => product._id !== proId));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);}
  }
  console.log(products);
  
  return (
    <div className="p-4 border rounded-md shadow-md w-96">
      <h2 className="text-lg font-bold mb-2">Thêm Sản Phẩm</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="block w-full border p-2 mb-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Giá sản phẩm"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="block w-full border p-2 mb-2"
        />
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mb-2"
        />

        <div className="flex gap-2 flex-wrap">
          {previews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              className="w-32 h-32 object-cover"
            />
          ))}
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 mt-2">
          Upload
        </button>
      </form>
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Danh Sách Sản Phẩm
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <div className="w-full h-40 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
                  {product.imageUrls?.length > 0 ? (
                    <img
                      src={product.imageUrls[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src="/default-image.jpg"
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-700">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {product.price.toLocaleString()} VNĐ
                </p>
                <button className="bg-red-500 text-white px-3 py-1 rounded-full mt-3 hover:bg-red-600 transition" onClick={() => handleDeleteProduct(product._id)}>
                  Xóa
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              Không có sản phẩm nào.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
