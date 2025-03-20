import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

// Hàm tìm ID theo tên từ danh sách
const findIdByName = (list, name) => {
  const item = list.find((item) => item.full_name === name);
  return item ? item.id : null;
};

const LocationUtil = ({ setLocation, defaultAddress }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  // Fetch danh sách tỉnh/thành phố
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://esgoo.net/api-tinhthanh/1/0.htm"
        );
        if (response.data.error === 0) {
          setProvinces(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tỉnh/thành phố:", error.message);
      }
    };
    fetchProvinces();
  }, []);

  // Cập nhật giá trị ban đầu từ `defaultAddress`
  useEffect(() => {
    if (defaultAddress && provinces.length > 0) {
      const [wardName, districtName, provinceName] = defaultAddress.split(", ");
      
      // Tìm ID tương ứng
      const provinceId = findIdByName(provinces, provinceName);
      setSelectedProvince(provinceId);
    }
  }, [defaultAddress, provinces]);

  // Fetch danh sách quận/huyện khi chọn tỉnh
  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      setSelectedDistrict(null);
      setWards([]);
      setSelectedWard(null);
      return;
    }

    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          `https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`
        );
        if (response.data.error === 0) {
          setDistricts(response.data.data);

          // Nếu có defaultAddress, chọn quận tương ứng
          if (defaultAddress) {
            const [, districtName] = defaultAddress.split(", ");
            const districtId = findIdByName(response.data.data, districtName);
            setSelectedDistrict(districtId);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách quận/huyện:", error.message);
      }
    };
    fetchDistricts();
  }, [selectedProvince, defaultAddress]);

  // Fetch danh sách phường/xã khi chọn quận
  useEffect(() => {
    if (!selectedDistrict) {
      setWards([]);
      setSelectedWard(null);
      return;
    }

    const fetchWards = async () => {
      try {
        const response = await axios.get(
          `https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`
        );
        if (response.data.error === 0) {
          setWards(response.data.data);

          // Nếu có defaultAddress, chọn phường tương ứng
          if (defaultAddress) {
            const [wardName] = defaultAddress.split(", ");
            const wardId = findIdByName(response.data.data, wardName);
            setSelectedWard(wardId);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phường/xã:", error.message);
      }
    };
    fetchWards();
  }, [selectedDistrict, defaultAddress]);

  // Cập nhật `setLocation`
  useEffect(() => {
    if (setLocation) {
      const provinceName = provinces.find((p) => p.id === selectedProvince)?.full_name || "";
      const districtName = districts.find((d) => d.id === selectedDistrict)?.full_name || "";
      const wardName = wards.find((w) => w.id === selectedWard)?.full_name || "";
      setLocation(`${wardName}, ${districtName}, ${provinceName}`);
    }
  }, [selectedProvince, selectedDistrict, selectedWard, provinces, districts, wards, setLocation]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center gap-4 w-full">
        <Select
          placeholder="Tỉnh/Thành phố"
          value={selectedProvince}
          onChange={setSelectedProvince}
          className="w-64"
          allowClear
        >
          {provinces.map((province) => (
            <Option key={province.id} value={province.id}>
              {province.full_name}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Quận/Huyện"
          value={selectedDistrict}
          onChange={setSelectedDistrict}
          className="w-64"
          disabled={!selectedProvince}
          allowClear
        >
          {districts.map((district) => (
            <Option key={district.id} value={district.id}>
              {district.full_name}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Phường/Xã"
          value={selectedWard}
          onChange={setSelectedWard}
          className="w-64"
          disabled={!selectedDistrict}
          allowClear
        >
          {wards.map((ward) => (
            <Option key={ward.id} value={ward.id}>
              {ward.full_name}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default LocationUtil;
