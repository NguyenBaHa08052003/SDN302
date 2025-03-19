import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Select, Dropdown, Button, Checkbox, Menu, Radio } from "antd";
import { CloseOutlined, DownOutlined } from "@ant-design/icons";
import { fetchLodgings } from "../stores/redux/slices/lodgingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const { Option } = Select;

// Hàm tìm tên theo ID từ danh sách
const findNameById = (list, id) => {
  const item = list.find((item) => item.id === id);
  return item ? item.full_name : "";
};
const LocationSelector = ({type}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lodgings } = useSelector((state) => state.lodgingRedux);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch danh sách tỉnh/thành phố (chỉ gọi 1 lần)
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
        console.error("Lỗi khi lấy danh sách tỉnh/thành phố:", error);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch danh sách quận/huyện khi chọn tỉnh
  const fetchDistricts = useCallback(async () => {
    if (!selectedProvince) {
      setDistricts([]);
      setSelectedDistrict(null); // Xóa quận khi tỉnh bị xóa
      setWards([]);
      setSelectedWard(null); // Xóa phường/xã
      return;
    }
    setSelectedDistrict(null);
    setSelectedWard(null);
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`
      );
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

  // Fetch danh sách phường/xã khi chọn quận
  const fetchWards = useCallback(async () => {
    if (!selectedDistrict) {
      setWards([]);
      setSelectedWard(null); // Xóa phường khi quận bị xóa
      return;
    }
    setSelectedWard(null);
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`
      );
      if (response.data.error === 0) {
        setWards(response.data.data);
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
  console.log(type);
  
  const renderMenu = (options, selectedValue, handleChange) => (
    <Menu>
      {options.map((option) => (
        <Menu.Item key={option}>
          <Radio
            checked={selectedValue === option}
            onChange={() => handleChange(option)}
          >
            {option}
          </Radio>
        </Menu.Item>
      ))}
      <Menu.Item
        key="clear"
        onClick={() => handleChange("")}
        style={{ color: "red", textAlign: "center" }}
      >
        <CloseOutlined /> Xóa lựa chọn
      </Menu.Item>
    </Menu>
  );

  // Chuyển ID thành tên
  const provinceName = findNameById(provinces, selectedProvince);
  const districtName = findNameById(districts, selectedDistrict);
  const wardName = findNameById(wards, selectedWard);

  // Xử lý tìm kiếm
  const handleSearch = () => {
    const queryParams = [
      provinceName ? `province=${provinceName}` : "",
      districtName ? `district=${districtName}` : "",
      wardName ? `ward=${wardName}` : "",
      `page=${lodgings.page}`,
      `limit=${lodgings.limit}`,
    ]
      .filter(Boolean) // Loại bỏ chuỗi rỗng
      .join("&"); // Nối chuỗi đúng định dạng URL
      navigate(`/loging/room-rental?${queryParams}`);
    dispatch(
      fetchLodgings({
        address: provinceName
          ? `${wardName}, ${districtName}, ${provinceName}`
          : null,
        price: selectedPrices.length ? selectedPrices : null,
        area: selectedAreas.length ? selectedAreas : null,
        page: lodgings.page,
        limit: lodgings.limit,
      })
    );
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

      {/* Chọn giá & diện tích */}
      <div className="flex items-center gap-4">
        <Dropdown
          overlay={renderMenu(priceOptions, selectedPrices, setSelectedPrices)}
          trigger={["click"]}
        >
          <Button>
            Chọn giá <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown
          overlay={renderMenu(areaOptions, selectedAreas, setSelectedAreas)}
          trigger={["click"]}
        >
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
