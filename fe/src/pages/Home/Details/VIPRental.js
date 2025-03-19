import React, { useEffect, useState } from "react";
import { Carousel, Card, Button } from "antd";
import { StarFilled } from "@ant-design/icons";

export default function VIPRental() {
  const [vipRooms, setVipRooms] = useState([]);

  useEffect(() => {
    async function fetchVIPRooms() {
      try {
        const res = await fetch("http://localhost:3000/api/lodgings/ranking");
        if (!res.ok) throw new Error("Lỗi khi tải dữ liệu");

        const data = await res.json(); // Đọc JSON từ response
        console.log("Dữ liệu phòng VIP:", data);
        setVipRooms(data.listings); // Gán dữ liệu vào state
      } catch (error) {
        console.error("Lỗi khi tải phòng VIP:", error);
      }
    }
    fetchVIPRooms();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 italic">
        Phòng Siêu Hot
      </h2>
      {vipRooms?.length > 0 ? (
        <Carousel
          draggable
          autoplay
          dots
          className="shadow-lg rounded-lg overflow-hidden"
        >
          {vipRooms.map((room) => (
            <div key={room._id} className="p-4 relative">
              <div className="absolute top-4 left-4 bg-yellow-400 text-white p-2 rounded-full shadow-md z-10">
                <StarFilled style={{ fontSize: "24px" }} />
              </div>
              <Card
                hoverable
                cover={
                  <img
                    alt={room.title}
                    src={room.images[0]}
                    className="h-60 w-full object-cover"
                  />
                }
                className="rounded-lg"
              >
                <h3 className="text-lg font-semibold">{room.name}</h3>
                <p className="text-gray-600">
                  {room.detail_address}, {room.address}
                </p>
                <p className="text-red-500 font-bold">
                  {room.price.toLocaleString()} VND
                </p>
                <Button type="primary" className="mt-2 w-full">
                  Xem chi tiết
                </Button>
              </Card>
            </div>
          ))}
        </Carousel>
      ) : (
        <p className="text-center text-gray-500">Chưa có phòng VIP nào.</p>
      )}
    </div>
  );
}
