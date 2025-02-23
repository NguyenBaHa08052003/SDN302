import React from 'react'

function NewsPage() {
    //example cua phan News
    const newsContent = [
        {
            img: "https://storage.googleapis.com/a1aa/image/daax6Ldk2D8SvGh0tGiURykKC2ucWPE3QafTtn9V7DE.jpg",
            title: "TP.HCM: 12.800 Nhà Trọ Cần Cải Tạo Để Đạt Chuẩn Mới",
            date: "14/10/2024"
        },
        {
            img: "https://storage.googleapis.com/a1aa/image/AkjnBhtm0ogYSX5FiijF58DHvxoIWVMAe1-vbFneSEI.jpg",
            title: "Tân Sinh Viên Hà Nội Sốc với Giá thuê nhà tăng cao",
            date: "07/10/2024"
        },
        {
            img: "https://storage.googleapis.com/a1aa/image/0uerACC_xlKRxEoB5XsPNNropELpo5ZrNeh6aFJd6tk.jpg",
            title: "Giá thuê nhà tại Tp.HCM tăng cao, người trẻ chuyển hướng sang căn hộ ngoại ô",
            date: "06/10/2024"
        },
        {
            img: "https://storage.googleapis.com/a1aa/image/RyYvAwhyrJOUCGk-Fl_5V9Zl5-16vmuyJ8tWuNXDNU0.jpg",
            title: "Nhu cầu thuê căn hộ tại TP.HCM tiếp tục tăng mạnh",
            date: "06/10/2024"
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
                    <img src="https://storage.googleapis.com/a1aa/image/0C9hvWrFwVTQkX_qSentNG6ZftK4AxJnYzjV2AxUw9s.jpg" alt="A narrow alley" className="w-3/4 h-3/4 rounded-lg shadow-md" />
                    <h2 className="text-2xl font-bold mt-4">Giá thuê nhà trọ TP HCM tăng 20% trong 10 tháng</h2>
                    <p className="text-gray-500 text-sm mt-1">Tin nổi bật • 17/12/2024</p>
                </section>

                <aside className="col-span-1">
                    {newsContent.map((news, index) => (
                        <div key={index} className="flex items-center gap-4 mb-4 p-3 bg-white rounded-lg shadow-md transition hover:bg-gray-50">
                            <img src={news.img} alt={news.title} className="w-20 h-20 rounded-lg object-cover" />
                            <div>
                                <h3 className="text-md font-semibold text-gray-800 transition hover:text-red-500 cursor-pointer">{news.title}</h3>
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
