import { useState, useEffect } from 'react';
import axios from 'axios';
import withAuth from '../../../stores/hoc/withAuth';
import LocationPro from '../../../components/LocationPro';

const RoomRental = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchListings();
  }, [searchQuery, selectedPrice, selectedArea]); // Gửi request mỗi khi search hoặc lọc thay đổi

  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/room-rentals', {
        params: {
          search: searchQuery,
          price: selectedPrice,
          area: selectedArea,
        },
      });
      setListings(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phòng:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <LocationPro />
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm phòng trọ, địa điểm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button onClick={fetchListings} className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600">
            Tìm kiếm
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Phòng Trọ Cho Thuê</h1>
          <span className="text-sm text-gray-500">Tìm thấy {listings.length} kết quả</span>

          {loading ? (
            <p>Đang tải...</p>
          ) : (
            listings.map(listing => (
              <div key={listing.id} className="bg-white rounded-lg shadow-md mb-4 overflow-hidden hover:shadow-lg transition-shadow flex">
                <div className="w-1/4">
                  <img alt={listing.title} className="w-full h-48 object-cover" src={listing.images[0]} />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-semibold hover:text-red-500 cursor-pointer">{listing.title}</h2>
                    <span className="text-red-500 text-xl font-bold whitespace-nowrap">{listing.price}</span>
                  </div>
                  <p className="text-sm text-gray-600">{listing.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(RoomRental);
