import React, { useEffect, useState } from 'react';
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { splitString } from "../../utils/functionCommon";
import lodgingService from "../../services/lodgingService.js/lodging.service"
import "../../css/animation.css"; // Import file CSS để thêm hiệu ứng

function ContentHome() {
    const [favorites, setFavorites] = useState({});
    const [page, setPage] = useState(0);
    const [listingsContent, setListingsContent] = useState([]);
    const itemsPerPage = 4;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const getListLodging = await lodgingService.getAllLodging({limit: null})
                console.log(getListLodging);
                if (getListLodging) {
                    setListingsContent(getListLodging.listings)
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    const toggleFavorite = (id) => {
        setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const nextPage = () => setPage((prev) => (prev + 1) % Math.ceil(listingsContent?.length / itemsPerPage));
    const prevPage = () => setPage((prev) => (prev - 1 + Math.ceil(listingsContent?.length / itemsPerPage)) % Math.ceil(listingsContent?.length / itemsPerPage));

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-center text-2xl font-bold mb-4">Cho Thuê Phòng Trọ</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {listingsContent?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)?.map(({ _id, title, price, size, location, date, images }) => (
                    <div key={_id} className="fade-in bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={images[0]} alt={title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-medium mb-2">{splitString(title || "", 20)}</h3>
                            <p className="text-red-500 font-bold">{price}</p>
                            <p className="text-gray-600 text-sm">{size}</p>
                            <p className="text-gray-500 text-sm my-2">{splitString(location || "", 30)}</p>
                            <p className="text-gray-400 text-xs">{date}</p>
                            <div className="text-right">
                                <FaHeart className={`cursor-pointer ${favorites[_id] ? "text-red-500" : "text-gray-400"}`} onClick={() => toggleFavorite(_id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6 space-x-4">
                <button onClick={prevPage} className="p-2 border border-gray-300 rounded hover:bg-gray-200">
                    <FaChevronLeft />
                </button>
                <button onClick={nextPage} className="p-2 border border-gray-300 rounded hover:bg-gray-200">
                    <FaChevronRight />
                </button>
            </div>
            <div className="text-center mt-6">
                <button onClick={() => window.location.href = "/lodging/room-rental"} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700">
                    Xem thêm
                </button>
            </div>
        </div>
    );
}

export default ContentHome;
