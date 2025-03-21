import React from 'react'

function NewsPage() {
    //example cua phan News
    const newsContent = [
        {
            img: "https://storage.googleapis.com/a1aa/image/daax6Ldk2D8SvGh0tGiURykKC2ucWPE3QafTtn9V7DE.jpg",
            title: "TP.HCM: 12.800 Nhà Trọ Cần Cải Tạo Để Đạt Chuẩn Mới",
            date: "14/10/2024",
            link: 'https://thanhnien.vn/12800-nha-tro-o-tphcm-phai-cai-tao-de-cho-thue-theo-chuan-moi-185240808185211878.htm'
        },
        {
            img: "https://storage.googleapis.com/a1aa/image/AkjnBhtm0ogYSX5FiijF58DHvxoIWVMAe1-vbFneSEI.jpg",
            title: "Tân Sinh Viên Hà Nội Sốc với Giá thuê nhà tăng cao",
            date: "07/10/2024",
            link: 'https://vnexpress.net/gia-nha-tro-sinh-vien-tai-ha-noi-4780397.html'
        },
        {
            img: "https://storage.googleapis.com/a1aa/image/0uerACC_xlKRxEoB5XsPNNropELpo5ZrNeh6aFJd6tk.jpg",
            title: "Giá thuê nhà tại Tp.HCM tăng cao, người trẻ chuyển hướng sang căn hộ ngoại ô",
            date: "06/10/2024",
            link: 'https://phongtro.vn/tin-tuc/gia-thue-nha-tai-tp-hcm-tang-cao-nguoi-tre-chuyen-huong-sang-can-ho-ngoai-o-xa-trung-tam'
        },
        {
            img: "https://storage.googleapis.com/a1aa/image/RyYvAwhyrJOUCGk-Fl_5V9Zl5-16vmuyJ8tWuNXDNU0.jpg",
            title: "Nhu cầu thuê căn hộ tại TP.HCM tiếp tục tăng mạnh",
            date: "06/10/2024",
            link: 'https://baoquangnam.vn/xu-huong-thue-can-ho-chung-cu-tp-ho-chi-minh-tang-manh-thay-vi-mua-nha-3144165.html'
        }
    ]
    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100">
            <header className="flex justify-between items-center  pb-4">
                <nav className="flex space-x-6">
                    <a href="#" className="text-red-500 font-semibold border-b-2 border-red-500 pb-1 transition hover:text-red-600">Tin nổi bật</a>
                    <a href="#" className="text-gray-700 font-medium transition hover:text-gray-900">Cẩm nang</a>
                    <a href="#" className="text-gray-700 font-medium transition hover:text-gray-900">Hướng dẫn</a>
                </nav>
                <a href="#" className="text-red-500 font-medium transition hover:text-red-600">Xem thêm →</a>
            </header>

            <main className="grid grid-cols-3 gap-6 mt-6">
                <section className="col-span-2">
                    <img style={{ cursor: "pointer" }} onClick={() => window.open("https://vnexpress.net/gia-thue-nha-tro-tp-hcm-tang-20-trong-10-thang-4820846.html#:~:text=Th%C3%A1ng%2010%2C%20m%E1%BB%A9c%20gi%C3%A1%20thu%C3%AA,c%C3%B3%20xu%20h%C6%B0%E1%BB%9Bng%20t%C4%83ng%20m%E1%BA%A1nh.", "_blank")} src="https://storage.googleapis.com/a1aa/image/0C9hvWrFwVTQkX_qSentNG6ZftK4AxJnYzjV2AxUw9s.jpg" alt="A narrow alley" className="w-3/4 h-3/4 rounded-lg shadow-md" />
                    <h2 className="text-2xl font-bold mt-4">Giá thuê nhà trọ TP HCM tăng 20% trong 10 tháng</h2>
                    <p className="text-gray-500 text-sm mt-1">Tin nổi bật • 17/12/2024</p>
                </section>

                <aside className="col-span-1">
                    {newsContent.map((news, index) => (
                        <div key={index} className="flex items-center gap-4 mb-4 p-3 bg-white rounded-lg shadow-md transition hover:bg-gray-50">
                            <img src={news.img} alt={news.title} className="w-20 h-20 rounded-lg object-cover" />
                            <div>
                                <h3 onClick={() => window.open(news.link, "_blank")} className="text-md font-semibold text-gray-800 transition hover:text-red-500 cursor-pointer">{news.title}</h3>
                                <p className="text-gray-500 text-sm mt-1">{news.date}</p>
                            </div>
                        </div>
                    ))}
                </aside>
            </main>
        </div>
    )
}

export default NewsPage
