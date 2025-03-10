import { useEffect, useState } from "react";
import withAuth from "../../../stores/hoc/withAuth";
import LocationPro from "../../../components/LocationPro";
import { useDispatch, useSelector } from "react-redux";
import { fetchLodgings } from "../../../stores/redux/slices/lodgingSlice";
import ClientPagination from "../../../components/Pagination";
import { Link } from "react-router-dom";

const priceRanges = {
  "Dưới 1 triệu": [0, 1000000],
  "1 - 2 triệu": [1000000, 2000000],
  "2 - 3 triệu": [2000000, 3000000],
  "3 - 5 triệu": [3000000, 5000000],
  "5 - 7 triệu": [5000000, 7000000],
  "7 - 10 triệu": [7000000, 10000000],
  "10 - 15 triệu": [10000000, 15000000],
  "Trên 15 triệu": [15000000, Infinity],
};

const areaRanges = {
  "Dưới 20 m²": [0, 20],
  "20 - 30 m²": [20, 30],
  "30 - 50 m²": [30, 50],
  "50 - 70 m²": [50, 70],
  "70 - 90 m²": [70, 90],
  "Trên 90 m²": [90, Infinity],
};
const RoomRental = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { lodgings, status } = useSelector((state) => state.lodgingRedux);
  console.log(lodgings);
  
  const dispatch = useDispatch();
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  useEffect(() => {
    const fetchListings = async () => {
      try {
        dispatch(fetchLodgings(null));
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phòng:", error);
      }
    };
    fetchListings();
  }, [dispatch]);
  const filteredListings = lodgings?.listings?.filter((listing) => {
    const listingPrice = listing.price;
    const listingArea = listing.area;
    const matchesPrice =
      !selectedPrice ||
      (listingPrice >= priceRanges[selectedPrice][0] &&
        listingPrice <= priceRanges[selectedPrice][1]);
    const matchesArea =
      !selectedArea ||
      (listingArea >= areaRanges[selectedArea][0] &&
        listingArea <= areaRanges[selectedArea][1]);
    return matchesPrice && matchesArea;
  });

  const priceOptions = [
    "",
    "Dưới 1 triệu",
    "1 - 2 triệu",
    "2 - 3 triệu",
    "3 - 5 triệu",
    "5 - 7 triệu",
    "7 - 10 triệu",
    "10 - 15 triệu",
    "Trên 15 triệu",
  ];

  const areaOptions = [
    "",
    "Dưới 20 m²",
    "20 - 30 m²",
    "30 - 50 m²",
    "50 - 70 m²",
    "70 - 90 m²",
    "Trên 90 m²",
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6">
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <LocationPro />
      </div>
      {/* Main Content */}
      <div className="flex gap-6">
        {/* Listings */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-bold">Phòng Trọ Cho Thuê</h1>
              <span className="text-sm text-gray-500">
                Tìm thấy {lodgings?.total} kết quả
              </span>
            </div>
            <select className="p-2 border rounded-lg">
              <option>Phù hợp nhất</option>
              <option>Giá thấp đến cao</option>
              <option>Giá cao đến thấp</option>
              <option>Diện tích lớn đến nhỏ</option>
            </select>
          </div>
          {filteredListings?.map((listing) => (
            <Link to={`/loging/room-rental/room-detail/${listing._id}`} state={listing}>
              <div
                key={listing._id}
                className="bg-white rounded-lg shadow-md mb-4 overflow-hidden hover:shadow-lg transition-shadow flex"
              >
                <div className="w-1/4">
                  <img
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                    src={listing.images[0]}
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-semibold hover:text-red-500 cursor-pointer">
                      {listing.title}
                    </h2>
                    <span className="text-red-500 text-xl font-bold whitespace-nowrap">
                      {listing.price.toLocaleString()} VNĐ
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm text-gray-600 mt-1">
                    <span>{listing.area}</span>
                    <span>•</span>
                    {listing.type && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {listing.type.name}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    {listing.address}
                  </p>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {listing.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <img
                        alt={`Profile picture of ${listing.user.name}`}
                        className="w-8 h-8 rounded-full"
                        src={
                          listing.user.avatar || "https://picsum.photos/200/300"
                        }
                      />
                      <span className="text-sm text-gray-600">
                        {listing.user.fullname}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {listing.posted}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sidebar (Filters on the right) */}
        <div className="w-80 hidden lg:block">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-6">
            <h3 className="font-semibold mb-3">Lọc nhanh</h3>
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Khoảng giá</h4>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Tất cả</option>
                {priceOptions.slice(1).map((price, index) => (
                  <option key={index} value={price}>
                    {price}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Diện tích</h4>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Tất cả</option>
                {areaOptions.slice(1).map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ClientPagination />
      </div>
    </div>
  );
};

export default withAuth(RoomRental);
