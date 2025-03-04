import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationSelector = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("0");
  const [selectedDistrict, setSelectedDistrict] = useState("0");

  useEffect(() => {
    axios.get("https://esgoo.net/api-tinhthanh/1/0.htm").then((response) => {
      if (response.data.error === 0) {
        setProvinces(response.data.data);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedProvince !== "0") {
      axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`).then((response) => {
        if (response.data.error === 0) {
          setDistricts(response.data.data);
          setWards([]);
        }
      });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict !== "0") {
      axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`).then((response) => {
        if (response.data.error === 0) {
          setWards(response.data.data);
        }
      });
    }
  }, [selectedDistrict]);

  return (
    <div className="css_select_div" style={{ textAlign: "center" }}>
      <select
        className="css_select"
        value={selectedProvince}
        onChange={(e) => setSelectedProvince(e.target.value)}
      >
        <option value="0">Tỉnh Thành</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.full_name}
          </option>
        ))}
      </select>
      <select
        className="css_select"
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
      >
        <option value="0">Quận Huyện</option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.full_name}
          </option>
        ))}
      </select>
      <select className="css_select">
        <option value="0">Phường Xã</option>
        {wards.map((ward) => (
          <option key={ward.id} value={ward.id}>
            {ward.full_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;