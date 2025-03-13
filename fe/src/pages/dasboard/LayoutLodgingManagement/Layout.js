const Header = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Hệ thống quản lý trọ</h1>
      <div className="flex space-x-2">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
          Edit
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          + Create
        </button>
      </div>
    </div>
  );
};

const Stats = ({lodgings}) => {
  const stats = [
    {
      title: "Số lượng trọ",
      value: `${lodgings?.length * 1223}`,
      change: "↑13%",
      changeType: "green",
      icon: "fas fa-wallet",
      iconColor: "text-pink-500",
    },
    {
      title: "Số lượng đã cho thuê",
      value: "215",
      change: "↑ 30%",
      changeType: "green",
      icon: "fas fa-users",
      iconColor: "text-blue-500",
    },
    {
      title: "Số lượng đang chờ",
      value: "1.400",
      change: "↓ -5%",
      changeType: "red",
      icon: "fas fa-clock",
      iconColor: "text-blue-400",
    },
    {
      title: "Doanh thu",
      value: "15%",
      change: "↓30%",
      changeType: "green",
      icon: "fas fa-shopping-cart",
      iconColor: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-600">{stat.title}</h2>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className={`text-${stat.changeType}-500`}>
                {stat.change} so với tháng trước
              </p>
            </div>
            <div className={`${stat.iconColor} text-3xl`}>
              <i className={stat.icon}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { Header, Stats };
