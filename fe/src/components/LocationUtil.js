import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

// Hàm tìm tên theo ID từ danh sách
const findNameById = (list, id) => {
  const item = list.find((item) => item.id === id);
  return item ? item.full_name : "";
};

const LocationUtil = ({ setLocation }) => {
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
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách quận/huyện:", error.message);
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

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
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phường/xã:", error.message);
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  // Chuyển ID thành tên và cập nhật `setLocation`
  useEffect(() => {
    if (setLocation) {
      const provinceName = findNameById(provinces, selectedProvince);
      const districtName = findNameById(districts, selectedDistrict);
      const wardName = findNameById(wards, selectedWard);
      setLocation(`${wardName}, ${districtName}, ${provinceName}`);
    }
  }, [
    selectedProvince,
    selectedDistrict,
    selectedWard,
    provinces,
    districts,
    wards,
    setLocation,
  ]);

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
