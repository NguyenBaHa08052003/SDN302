import axios from "axios";
import React, { useState, useEffect } from "react";

export default function DashBoard() {
  const [images, setImages] = useState([]); 
  const [previews, setPreviews] = useState([]); 
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
    setImages((prev) => [...prev, ...files]); // Thêm ảnh mới vào danh sách
    setPreviews((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (images.length === 0 || !form.name || !form.price) {
      alert("Vui lòng nhập đủ thông tin sản phẩm!");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => formData.append("images", image)); 
    formData.append("name", form.name);
    formData.append("price", form.price);
    console.log(  formData);
    
    try {
      const res = await axios.post("http://localhost:3000/api/lodgings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
          multiple
          accept="image/*"
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
        <h2 className="text-lg font-bold">Danh Sách Sản Phẩm</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="border p-2">
                {product.imageUrls?.length > 0 ? (
                  product.imageUrls.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`${product.name} ${index}`}
                      className="w-32 h-32 object-cover"
                    />
                  ))
                ) : (
                  <img
                    src="/default-image.jpg"
                    alt={product.name}
                    className="w-32 h-32 object-cover"
                  />
                )}
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.price} VNĐ</p>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}
