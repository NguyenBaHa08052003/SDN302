const Footer = () => {
  return (
    <div>
      <footer className="w-full text-center text-black bg-neutral-100 py-6 shadow-md">
        <div className="container px-4 pb-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h6 className="uppercase font-bold mb-4">Company Name</h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Cần thêm gì thì thêm vào sau
              </p>
            </div>
            <div>
              <h6 className="uppercase font-bold mb-4">Products</h6>
              <ul>
                <li><a href="#" className="text-black">MDBootstrap</a></li>
                <li><a href="#" className="text-black">MDWordPress</a></li>
                <li><a href="#" className="text-black">BrandFlow</a></li>
                <li><a href="#" className="text-black">Bootstrap Angular</a></li>
              </ul>
            </div>
            <div>
              <h6 className="uppercase font-bold mb-4">Contact</h6>
              <p><i className="fas fa-home mr-2"></i> New York, NY 10012, US</p>
              <p><i className="fas fa-envelope mr-2"></i> info@gmail.com</p>
              <p><i className="fas fa-phone mr-2"></i> +01 234 567 88</p>
              <p><i className="fas fa-print mr-2"></i> +01 234 567 89</p>
            </div>
            <div>
              <h6 className="uppercase font-bold mb-4">Follow us</h6>
              <div className="flex space-x-3">
                <a href="#" className="bg-blue-600 p-2 rounded"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="bg-blue-400 p-2 rounded"><i className="fab fa-twitter"></i></a>
                <a href="#" className="bg-red-600 p-2 rounded"><i className="fab fa-google"></i></a>
                <a href="#" className="bg-purple-600 p-2 rounded"><i className="fab fa-instagram"></i></a>
                <a href="#" className="bg-blue-700 p-2 rounded"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="bg-gray-800 p-2 rounded"><i className="fab fa-github"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-white p-3 bg-gray-700">
          © 2025 Copyright: <a href="#" className="text-white">HIHIHAHA.com</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
