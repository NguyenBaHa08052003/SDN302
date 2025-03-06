import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Dropdown, Button, Checkbox, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Option } = Select;

const LocationSelector = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  useEffect(() => {
    axios.get("https://esgoo.net/api-tinhthanh/1/0.htm").then((response) => {
      if (response.data.error === 0) {
        setProvinces(response.data.data);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`).then((response) => {
        if (response.data.error === 0) {
          setDistricts(response.data.data);
          setWards([]);
          setSelectedDistrict(null);
          setSelectedWard(null);
        }
      });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`).then((response) => {
        if (response.data.error === 0) {
          setWards(response.data.data);
          setSelectedWard(null);
        }
      });
    }
  }, [selectedDistrict]);

  const priceOptions = ["Dưới 1 triệu", "1 - 2 triệu", "2 - 3 triệu", "3 - 5 triệu", "5 - 7 triệu", "7 - 10 triệu", "10 - 15 triệu", "Trên 15 triệu"];
  const areaOptions = ["Dưới 20 m²", "20 - 30 m²", "30 - 50 m²", "50 - 70 m²", "70 - 90 m²", "Trên 90 m²"];

  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);

  const renderMenu = (options, selectedValues, handleChange) => (
    <Menu>
      <Menu.Item>
        <Checkbox.Group value={selectedValues} onChange={handleChange} className="flex flex-col">
          {options.map((option) => (
            <div key={option} className="py-1">
              <Checkbox value={option}>{option}</Checkbox>
            </div>
          ))}
        </Checkbox.Group>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex flex-col space-y-4">
      {/* Khu vực chọn địa chỉ */}
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
            <Option key={district.id} value={district.full_name}>
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
            <Option key={ward.id} value={ward.full_name}>
              {ward.full_name}
            </Option>
          ))}
        </Select>
      </div>
      {/* Khu vực chọn giá & diện tích */}
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

        <Button type="primary" onClick={() => console.log({ selectedProvince, selectedDistrict, selectedWard, selectedPrices, selectedAreas })}>
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
};

export default LocationSelector;
