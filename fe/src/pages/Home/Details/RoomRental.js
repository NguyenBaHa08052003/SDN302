import { useState } from 'react';

const RoomRental = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const listings = [
    {
      id: 1,
      type: 'BÁC',
      price: '3.2 triệu',
      area: '20 m²',
      title: 'Chính chủ cần cho thuê Phòng tiện nghi- Giá 3.200.000',
      address: 'huỳnh văn bánh, Phường 13, Phú Nhuận, Hồ Chí Minh',
      description: 'Phòng đủ tiện nghi- Nội thất lịch sự-Nơi để xe rộng rãi, gió giấc tự do. Phong thủy tốt- hướng nhà Đông- Nam...',
      images: [
        'https://storage.googleapis.com/a1aa/image/WugJWdGJZB6zmH1xwMcMfDVgFW-g4B_RoiQyYHdwCzE.jpg',
        'https://storage.googleapis.com/a1aa/image/NmRTFPLp5sR7N40AJc1F-0sYpVn7CIft9OoyP8FHxI4.jpg',
        'https://storage.googleapis.com/a1aa/image/NEb2SM0hkzibgzsUkHm2gNJ-ZfBowtf60xjmWTVHYGs.jpg',
        'https://storage.googleapis.com/a1aa/image/tTiu6Dk-38w5rdtzmvFVItg9NCXoFcqQ0gWeYJljr6w.jpg'
      ],
      agent: {
        name: 'Thi Lan Thanh Le',
        avatar: 'https://storage.googleapis.com/a1aa/image/yYucAYoCMFPh4Xfsn2fP3fLkX8sFwIzBTPYcDpeV3cs.jpg'
      },
      posted: '1 ngày trước'
    },
    {
      id: 2,
      price: '6.5 triệu',
      area: '35 m²',
      title: 'Phòng trọ cao cấp dạng Studio, Duplex - FULL NT - ngã tư Hàng Xanh, Bình Thạnh',
      address: 'Phường 15, Bình Thạnh, Hồ Chí Minh',
      description: 'Phòng trọ cao cấp với đầy đủ tiện nghi, không gian thoáng đãng.',
      images: [
        'https://storage.googleapis.com/a1aa/image/xELcxO9UXE1dhLBTMkALxurhUEjXw2H5KW8qyHZifgw.jpg'
      ],
      agent: {
        name: 'THANH VU',
        avatar: 'https://storage.googleapis.com/a1aa/image/Ie4ohcksxiZgNQFlGFJRGZ3L2Npb1LVzqKHmvEaINgk.jpg'
      },
      posted: 'hôm nay'
    },
  ];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = !selectedPrice || listing.price.includes(selectedPrice);
    const matchesArea = !selectedArea || listing.area.includes(selectedArea);
    return matchesSearch && matchesPrice && matchesArea;
  });

  const priceOptions = [
    '', 'Dưới 1 triệu', '1 - 2 triệu', '2 - 3 triệu', '3 - 5 triệu',
    '5 - 7 triệu', '7 - 10 triệu', '10 - 15 triệu', 'Trên 15 triệu'
  ];
  
  const areaOptions = [
    '', 'Dưới 20 m²', '20 - 30 m²', '30 - 50 m²',
    '50 - 70 m²', '70 - 90 m²', 'Trên 90 m²'
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6">
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
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
          <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600">
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Listings */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-bold">Phòng Trọ Cho Thuê</h1>
              <span className="text-sm text-gray-500">
                Tìm thấy {filteredListings.length} kết quả
              </span>
            </div>
            <select className="p-2 border rounded-lg">
              <option>Phù hợp nhất</option>
              <option>Giá thấp đến cao</option>
              <option>Giá cao đến thấp</option>
              <option>Diện tích lớn đến nhỏ</option>
            </select>
          </div>

          {filteredListings.map(listing => (
            <div key={listing.id} className="bg-white rounded-lg shadow-md mb-4 overflow-hidden hover:shadow-lg transition-shadow flex">
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
                    {listing.price}
                  </span>
                </div>
                <div className="flex gap-2 text-sm text-gray-600 mt-1">
                  <span>{listing.area}</span>
                  <span>•</span>
                  {listing.type && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      {listing.type}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-1">{listing.address}</p>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {listing.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <img
                      alt={`Profile picture of ${listing.agent.name}`}
                      className="w-8 h-8 rounded-full"
                      src={listing.agent.avatar}
                    />
                    <span className="text-sm text-gray-600">{listing.agent.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{listing.posted}</span>
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
                  <option key={index} value={price}>{price}</option>
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
                  <option key={index} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomRental;