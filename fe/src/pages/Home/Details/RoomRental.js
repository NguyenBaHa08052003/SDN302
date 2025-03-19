import { useEffect, useState } from "react";
import withAuth from "../../../stores/hoc/withAuth";
import LocationPro from "../../../components/LocationPro";
import { useDispatch, useSelector } from "react-redux";
import { fetchLodgings, voteLodging } from "../../../stores/redux/slices/lodgingSlice";
import ClientPagination from "../../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/convert";
import VIPRental from "./VIPRental";
import { Rate } from "antd";
import { FaHeart } from "react-icons/fa";
import { addFavoriteLodging, getFavoriteLodging } from "../../../services/customerService/customer.service";
import Cookies from "js-cookie";

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
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [favoriteArray, setFavoriteArray] = useState([]);
  const token = Cookies.get("authToken");
  const userId = sessionStorage.getItem("UserId");

  const navigate = useNavigate()
  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const type = pathSegments[pathSegments.length - 1];
    const fetchListings = async () => {
      try {
        dispatch(fetchLodgings({ limit: 8, type }));
        const getFavorite = await getFavoriteLodging(userId, token);
        if (getFavorite) {
          setFavoriteArray(getFavorite?.data?.map((id) => id._id));
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phòng:", error);
      }
    };
    fetchListings();
  }, [dispatch]);
  const handleVote = (id, value) => {
    dispatch(voteLodging({ id, rating: value }));
  };
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
  console.log("RoomRental", lodgings);

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

  const toggleFavorite = async (idLodging) => {
    try {
      const resDataAddLodging = await addFavoriteLodging(userId, idLodging, token);
      if (resDataAddLodging) {
        setFavoriteArray(resDataAddLodging.data.favoriteLodging.map((id) => id._id));
      }
    } catch (error) {
      console.log(error);
      navigate('/dang-nhap')
    }
  };

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
          <VIPRental />
          {filteredListings?.map((listing) => (
            <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden hover:shadow-lg transition-shadow flex">
              <div className="w-1/4">
                <img
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                  src={listing.images[0]}
                />
              </div>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <Link
                    to={`/loging/room-rental/room-detail/${listing._id}`}
                    key={listing._id}
                  >
                    <h2 className="text-lg font-semibold hover:text-red-500 cursor-pointer">
                      {listing.title}
                    </h2>
                  </Link>
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
                <p className="text-gray-600 text-sm mt-1">{listing.address}</p>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {listing.description}
                </p>

                {/* Voting Sao */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm">Đánh giá:</span>
                  <Rate
                    allowHalf
                    value={listing.rating}
                  // onChange={(value) => handleVote(listing._id, value)}
                  />
                  <span className="text-sm">({listing.rating || 0})</span>
                </div>

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
                  <div className="text-sm text-gray-500 flex items-center justify-between">

                    <span>
                      {listing.posted
                        ? formatDate(listing.posted)
                        : formatDate(listing.createdAt)}
                    </span>

                    <span className="cursor-pointer ml-3">
                      <FaHeart
                        className={`cursor-pointer ${favoriteArray?.includes(listing?._id) ? "text-red-500" : "text-gray-400"}`}
                        onClick={() => toggleFavorite(listing?._id)}
                      />
                    </span>
                  </div>

                </div>
              </div>
            </div>
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
