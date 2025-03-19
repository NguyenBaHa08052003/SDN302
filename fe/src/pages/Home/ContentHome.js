import React, { useEffect, useState } from "react";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import lodgingService from "../../services/lodgingService.js/lodging.service";
import { addFavoriteLodging, getFavoriteLodging } from "../../services/customerService/customer.service";
import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom'

function ContentHome(props) {
    const { user } = props;
    const navigate = useNavigate()
    const [page, setPage] = useState(1); // Bắt đầu từ page 1
    const [listingsContent, setListingsContent] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 4;
    const token = Cookies.get("authToken");
    const userId = sessionStorage.getItem("UserId");
    const [favoriteArray, setFavoriteArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getListLodging = await lodgingService.getAllLodging({ limit: itemsPerPage, page });
                if (getListLodging) {
                    console.log("Hello");
                    setListingsContent(getListLodging.listings);
                    setTotalPages(getListLodging.totalPages); // Cập nhật tổng số trang
                }
                const getFavorite = await getFavoriteLodging(userId, token);
                if (getFavorite) {
                    setFavoriteArray(getFavorite?.data?.map((id) => id._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [page]); // Gọi lại API khi page thay đổi

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
    const nextPage = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const prevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };
    console.log(listingsContent);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-center text-2xl font-bold mb-4">Cho Thuê Phòng Trọ</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {listingsContent?.map(({ _id, title, price, size, location, date, images }) => (
                    <div key={_id} className="fade-in bg-white rounded-lg shadow-md overflow-hidden">
                        <Link to={`/loging/room-rental/room-detail/${_id}`}><img style={{ cursor: "pointer" }} src={images[0]} alt={title} className="w-full h-48 object-cover" /></Link>
                        <div className="p-4">
                            <h3 className="text-lg font-medium mb-2">{title}</h3>
                            <p className="text-red-500 font-bold">{price}</p>
                            <p className="text-gray-600 text-sm">{size}</p>
                            <p className="text-gray-500 text-sm my-2">{location}</p>
                            <p className="text-gray-400 text-xs">{date}</p>
                            <div className="text-right">
                                <FaHeart
                                    className={`cursor-pointer ${favoriteArray?.includes(_id) ? "text-red-500" : "text-gray-400"}`}
                                    onClick={() => toggleFavorite(_id)}
                                />
                            </div>
                        </div>
                    </div>



                ))}
            </div>
            <div className="flex justify-center mt-6 space-x-4">
                <button onClick={prevPage} disabled={page === 1} className="p-2 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50">
                    <FaChevronLeft />
                </button>
                <span className="px-4 py-2">{page} / {totalPages}</span>
                <button onClick={nextPage} disabled={page === totalPages} className="p-2 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50">
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}

export default ContentHome;
