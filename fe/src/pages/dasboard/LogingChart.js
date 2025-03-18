import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import "echarts-gl"; // Thay vì import từng component riêng lẻ

const listings = [
  { name: "Nhà trọ Bình An", location: "Quận 7", price: 3500000, lat: 10.738, lon: 106.697 },
  { name: "Nhà trọ Hoa Sen", location: "Quận 1", price: 5000000, lat: 10.776, lon: 106.700 },
  { name: "Nhà trọ Thanh Xuân", location: "Bình Thạnh", price: 4200000, lat: 10.805, lon: 106.710 },
  { name: "Nhà trọ Hòa Bình", location: "Quận 3", price: 3800000, lat: 10.780, lon: 106.682 },
  { name: "Nhà trọ Đại Nam", location: "Thủ Đức", price: 4600000, lat: 10.852, lon: 106.772 },
];

const RentPriceChart = () => {
  const option = {
    xAxis3D: { type: "category", data: listings.map((l) => l.name) },
    yAxis3D: { type: "category", data: ["Giá thuê"] },
    zAxis3D: { type: "value" },
    grid3D: { boxWidth: 200, boxDepth: 80, viewControl: { alpha: 30, beta: 30 } },
    series: [{ type: "bar3D", data: listings.map((l, i) => [i, 0, l.price]), shading: "lambert" }],
  };
  return <ReactECharts option={option} style={{ height: 400, width: "100%" }} />;
};

const ScatterChart = () => {
  const option = {
    xAxis3D: { type: "value" },
    yAxis3D: { type: "value" },
    zAxis3D: { type: "value" },
    grid3D: { boxWidth: 200, boxDepth: 80, viewControl: { alpha: 30, beta: 30 } },
    series: [{
      type: "scatter3D",
      data: listings.map((l) => [l.lon, l.lat, l.price]),
      symbolSize: 15,
    }],
  };
  return <ReactECharts option={option} style={{ height: 400, width: "100%" }} />;
};

const generateSurfaceData = () => {
  const data = [];
  for (let x = -10; x <= 10; x += 1) {
    for (let y = -10; y <= 10; y += 1) {
      const z = 400000 * (x * x + y * y);
      data.push([x, y, z]);
    }
  }
  return data;
};

const SurfaceChart = () => {
  const option = {
    visualMap: { min: 3000000, max: 6000000, inRange: { color: ["#00f", "#0ff", "#0f0", "#ff0", "#f00"] } },
    xAxis3D: { type: "value", min: -10, max: 10 },
    yAxis3D: { type: "value", min: -10, max: 10 },
    zAxis3D: { type: "value" },
    grid3D: { boxWidth: 200, boxDepth: 80, viewControl: { alpha: 30, beta: 30 } },
    series: [{ type: "surface", wireframe: { show: false }, data: generateSurfaceData() }],
  };
  return <ReactECharts option={option} style={{ height: 500, width: "100%" }} />;
};

const LodgingChart = () => {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen p-6" style={{flex: 1}}>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Hệ thống quản lý nhà trọ</h1>
      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow-xl rounded-2xl transition-all hover:scale-105">
          <h2 className="text-lg font-bold text-center mb-4 text-gray-700">Giá Thuê Nhà Trọ</h2>
          <RentPriceChart />
        </div>
        <div className="bg-white p-6 shadow-xl rounded-2xl transition-all hover:scale-105">
          <h2 className="text-lg font-bold text-center mb-4 text-gray-700">Vị trí & Giá Thuê</h2>
          <ScatterChart />
        </div>
      </div>

      {/* Biểu đồ SurfaceChart chiếm toàn bộ chiều rộng */}
      <div className="bg-white p-6 shadow-xl rounded-2xl mt-6 transition-all hover:scale-105">
        <h2 className="text-lg font-bold text-center mb-4 text-gray-700">Dự Đoán Xu Hướng Giá</h2>
        <SurfaceChart />
      </div>
    </div>
  );
};

export default LodgingChart;
