import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Select, Dropdown, Button, Checkbox, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { fetchLodgings } from "../stores/redux/slices/lodgingSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const LocationSelector = ({}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const dispatch = useDispatch();
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [listings, setListings] = useState([]); // Danh sách kết quả tìm kiếm

  // 🏙 Fetch danh sách tỉnh/thành phố (chỉ gọi 1 lần)
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
        if (response.data.error === 0) {
          setProvinces(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tỉnh/thành phố:", error);
      }
    };
    fetchProvinces();
  }, []);

  // 🏡 Fetch danh sách quận/huyện khi chọn tỉnh
  const fetchDistricts = useCallback(async () => {
    if (!selectedProvince) return;
    try {
      const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`);
      if (response.data.error === 0) {
        setDistricts(response.data.data);

      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách quận/huyện:", error);
    }
  }, [selectedProvince]);

  useEffect(() => {
    fetchDistricts();
  }, [fetchDistricts]);

  //Fetch danh sách phường/xã khi chọn quận
  const fetchWards = useCallback(async () => {
    if (!selectedDistrict) return;

    try {
      const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`);
      if (response.data.error === 0) {
        setWards(response.data.data);
        setSelectedWard(null); // Reset phường/xã
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phường/xã:", error);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    fetchWards();
  }, [fetchWards]);
  // Danh sách lựa chọn giá
  const priceOptions = [
    "Dưới 1 triệu",
    "1 - 2 triệu",
    "2 - 3 triệu",
    "3 - 5 triệu",
    "5 - 7 triệu",
    "7 - 10 triệu",
    "10 - 15 triệu",
    "Trên 15 triệu",
  ];

  // Danh sách lựa chọn diện tích
  const areaOptions = [
    "Dưới 20 m²",
    "20 - 30 m²",
    "30 - 50 m²",
    "50 - 70 m²",
    "70 - 90 m²",
    "Trên 90 m²",
  ];

  // Hiển thị dropdown
  const renderMenu = (options, selectedValues, handleChange) => (
    <Menu>
      {options.map((option) => (
        <Menu.Item key={option}>
          <Checkbox
            checked={selectedValues.includes(option)}
            onChange={(e) => {
              const newValue = e.target.checked
                ? [...selectedValues, option]
                : selectedValues.filter((v) => v !== option);
              handleChange(newValue);
            }}
          >
            {option}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );
// Hàm tìm tên theo ID từ danh sách
const findNameById = (list, id) => {
  const item = list.find((item) => item.id === id);
  return item ? item.full_name : "";
};
// Chuyển ID thành tên
const provinceName = findNameById(provinces, selectedProvince);
const districtName = findNameById(districts, selectedDistrict);
const wardName = findNameById(wards, selectedWard);
const navigate = useNavigate();
  // Xử lý tìm kiếm
  const handleSearch = () => {
    const queryParams = new URLSearchParams();
  
    if (provinceName) queryParams.append("province", provinceName);
    if (districtName) queryParams.append("district", districtName);
    if (wardName) queryParams.append("ward", wardName);
    if (selectedPrices.length) queryParams.append("price", selectedPrices[0]);
    if (selectedAreas.length) queryParams.append("area", selectedAreas[0]);
    queryParams.append("page", 1);
    queryParams.append("limit", 10);
    navigate(`?${queryParams.toString()}`); // Cập nhật URL với query params
    dispatch(fetchLodgings({
      address: provinceName ? `${wardName}, ${districtName}, ${provinceName}` : null,
      price: selectedPrices.length ? selectedPrices[0] : null,
      area: selectedAreas.length ? selectedAreas[0] : null,
      page: 1,
      limit: 10,
    }));
  };
  

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
            <Option key={district.id} value={district.ide}>
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

      {/* Chọn giá & diện tích */}
      <div className="flex items-center gap-4">
        <Dropdown overlay={renderMenu(priceOptions, selectedPrices, setSelectedPrices)} trigger={["click"]}>
          <Button>
            Chọn giá <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={renderMenu(areaOptions, selectedAreas, setSelectedAreas)} trigger={["click"]}>
          <Button>
            Chọn diện tích <DownOutlined />
          </Button>
        </Dropdown>

        <Button type="primary" onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
};

export default LocationSelector;
