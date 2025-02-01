import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Autoplay, A11y } from "swiper/modules";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBars,
  faMagnifyingGlass,
  faSignOutAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

type ShopItem = {
  id: number;
  name: string;
  imag: string;
  price: number;
  info: string;
};

async function fetchShopItems(): Promise<ShopItem[]> {
  const response = await fetch(
    "https://6740ca67d0b59228b7f15e18.mockapi.io/ARI_SHOP"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch shop items");
  }
  return response.json();
}

type ShopProps = {
  onAddToCart: (item: ShopItem) => void;
};

export default function Shop({ onAddToCart }: ShopProps) {
  const [shopData, setShopData] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ShopItem | null>(null);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [searchQuery, setSearchQuery] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const getShopItems = async () => {
      try {
        const data = await fetchShopItems();
        setShopData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    getShopItems();
  }, []);

  const GoToCart = () => {
    Navigate("/cart");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const removeLocal = () => {
    localStorage.removeItem("userName");
    setUserName(null); // Update the state to reflect the removal of the username
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = shopData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.info.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const items = [
    { id: 1, bgColor: "#f5a623", img: "/s1.jpg" },
    { id: 2, bgColor: "#50b3a2", img: "/s2.jpg" },
    { id: 3, bgColor: "#d94f70", img: "/s3.jpg" },
    { id: 4, bgColor: "#8e44ad", img: "/s4.jpg" },
    { id: 5, bgColor: "#8e65ad", img: "/s5.jpg" },
    { id: 6, bgColor: "#8e96ad", img: "/s6.jpg" },
  ];

  return (
    <main className="bg-white w-full relative">
      <header className="w-full  bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 ">
          {/* Logo */}
          <div className="w-[20%] md:w-[15%] hover:border-b-2 hover:border-gray-600 duration-200">
            <figure className="w-full h-full flex justify-center">
              <img
                src="/LOGOARI.png"
                alt="Logo"
                className="object-cover w-[140px] h-[80px] hover:scale-105 duration-200"
              />
            </figure>
          </div>

          {/* Search Bar for Desktop */}
          <div className="hidden xl:flex w-[50%] justify-center">
            <div className="flex w-full justify-center">
              <input
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full max-w-lg p-2 pl-10 rounded-l-md border border-gray-700 focus:outline-none focus:ring-gray-600 placeholder-gray-500 text-gray-300 bg-gray-800"
                placeholder="Search For Ari Shop..."
              />
              <button
                className="p-3 h-full w-[50px] flex justify-center items-center rounded-r-md bg-gray-700 hover:bg-gray-600 duration-200 cursor-pointer"
                type="button"
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-white"
                />
              </button>
            </div>
          </div>

          {/* User, Cart, and Leave the Shop Icons */}
          <div className="flex items-center space-x-6">
            {/* Sign-In */}
            <div className="flex items-center space-x-2  ">
              <span className="text-sm font-medium px-4 py-2 bg-gray-700 rounded-2xl shadow-md border border-gray-600">
                {userName ? `Hi, ${userName}` : "Sign In"}
              </span>
              <FontAwesomeIcon icon={faUser} className="text-lg" />
            </div>
            {/* Cart */}
            <div className="flex items-center space-x-2 hover:text-gray-400 duration-200">
              <span
                onClick={GoToCart}
                className="text-sm font-medium px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-2xl shadow-md cursor-pointer transition-all duration-300 border border-gray-600"
              >
                Cart
              </span>
              <FontAwesomeIcon icon={faCartShopping} className="text-lg" />
            </div>

            {/* Leave the Shop */}
            <div className=" hidden xl:flex items-center space-x-2 hover:text-gray-400 duration-200">
              <Link
                to="/" // Change this URL to wherever you want the "Leave the Shop" link to go
                onClick={removeLocal}
                className="flex items-center space-x-2 text-sm font-medium px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-2xl shadow-md cursor-pointer transition-all duration-300 border border-gray-600"
              >
                {/* Sign-out icon */}
                <span>Leave the Shop</span>
                <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
              </Link>
            </div>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="xl:hidden p-3 hover:text-gray-400 duration-200">
            <FontAwesomeIcon
              icon={faBars}
              className="text-lg"
              onClick={toggleMenu}
            />
          </div>
          <div
            className={`hambergur  xl:hidden bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white fixed top-0 z-50 w-full h-[100vh] bg-vividGreen transition-all duration-300 ${
              isMenuOpen ? "left-0" : "left-[100%]"
            }`}
          >
            <ul className=" w-full h-full flex flex-wrap   justify-center">
              <li className=" text-white flex justify-between p-6  text-[20px]  md:text-[30px]  w-full ">
                <Link
                  onClick={toggleMenu}
                  className=" flex  items-center  w-full "
                  to="/shop"
                >
                  SHOP
                </Link>
                <span
                  className=" pr-6 text-[20px] md:text-[30px] cursor-pointer flex h-full items-center px-6 justify-center"
                  onClick={toggleMenu}
                >
                  <FontAwesomeIcon
                    className="fa-solid fa-xmark flex  absolute text-[20px] md:text-[25px]"
                    icon={faXmark}
                  />
                </span>
              </li>
              <li className=" text-white flex justify-start   p-6  text-[20px]  md:text-[30px]  w-full ">
                <Link
                  onClick={toggleMenu}
                  className=" flex  items-center  w-full  "
                  to="#"
                >
                  ABOUT
                </Link>
              </li>
              <li className=" text-white flex justify-start   p-6  text-[20px]  md:text-[30px]  w-full ">
                <Link
                  onClick={toggleMenu}
                  className=" flex  items-center  w-full  "
                  to="#"
                >
                  SERVICES
                </Link>
              </li>
              <li className=" text-white flex justify-start   p-6  text-[20px]  md:text-[30px]  w-full ">
                <Link
                  onClick={toggleMenu}
                  className=" flex  items-center  w-full  "
                  to="#"
                >
                  CAREERS
                </Link>
              </li>
              <li className=" text-white flex justify-start   p-6  text-[20px]  md:text-[30px]  w-full ">
                <Link
                  onClick={toggleMenu}
                  className=" flex  items-center  w-full  "
                  to="#"
                >
                  BLOG
                </Link>
              </li>
              <li className=" text-white flex justify-start   p-6  text-[20px]  md:text-[30px]  w-full ">
                <div className=" flex items-center space-x-2 hover:text-gray-400 duration-200">
                  <Link
                    onClick={removeLocal}
                    to="/" // Change this URL to wherever you want the "Leave the Shop" link to go
                    className="flex items-center space-x-2 text-sm font-medium px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-2xl shadow-md cursor-pointer transition-all duration-300 border border-gray-600"
                  >
                    {/* Sign-out icon */}
                    <span>Leave the Shop</span>
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="xl:hidden flex w-full justify-center px-4 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black relative">
          <div className="flex w-full justify-center">
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full max-w-lg p-2 pl-10 rounded-l-md border border-gray-700 focus:outline-none focus:ring-gray-600 placeholder-gray-500 text-gray-300 bg-gray-800"
              placeholder="Search For Ari Shop..."
            />
            <button
              className="p-3 h-full w-[50px] flex justify-center items-center rounded-r-md bg-gray-700 hover:bg-gray-600 duration-200 cursor-pointer"
              type="button"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-white"
              />
            </button>
          </div>
        </div>
      </header>

      <Swiper
        modules={[Navigation, Autoplay, A11y]} // Removed Scrollbar and Pagination modules
        spaceBetween={20} // Gap between slides
        slidesPerView={1} // Number of slides visible at a time
        navigation={true} // Enable navigation arrows
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto-scroll
        loop={true} // Loop the slides
        className="h-[500px] 2xl:h-[800px]"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: item.bgColor,
                color: "#fff",
                fontSize: "20px",
                fontWeight: "bold",
                borderRadius: "0px",
              }}
            >
              <img
                className="w-full h-full object-cover"
                src={item.img}
                alt="photo"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <section className=" w-full bg-gradient-to-b  from-[#FFFFFF99] via-gray-900 to-black z-10  absolute left-0 top-[460px] 2xl:top-[600px] ">
        <main className=" ">
          <ul className="w-full p-4 md:p-8 xl:p-12 2xl:p-16 *:mt-4 flex flex-wrap justify-center md:justify-evenly">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && shopData.length === 0 && (
              <p>No items found.</p>
            )}

            {/* Render Filtered Items */}
            {!loading &&
              !error &&
              filteredItems.map((item) => (
                <li
                  key={item.id}
                  className="bg-white w-full md:w-[47%] xl:w-[23%] h-[400px] 2xl:h-[500px] rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="flex flex-col h-full p-4">
                    <h1 className="font-semibold text-xl text-gray-800 mb-4 hover:text-blue-600 transition-all">
                      {item.name}
                    </h1>
                    <figure className="h-[70%] mb-4 overflow-hidden rounded-lg">
                      <img
                        className="w-full h-full object-cover scale-75 transform transition-all duration-300 hover:scale-110"
                        src={item.imag}
                        alt={item.name}
                      />
                    </figure>
                    <span className="text-lg font-semibold text-green-600 mb-4">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedProduct(item); // Pass the product object here
                        setIsPopupVisible(true); // Show the popup
                      }}
                      className="w-full py-2 text-white bg-blue-600 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-blue-700"
                    >
                      Read More
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </main>
        <footer className=" flex flex-wrap *:w-full justify-cente  items-center overflow-hidden w-full ">
          <section className=" flex  md:justify-evenly  w-full *:w-full  *:xl:w-auto  flex-wrap  xl:flex-nowrap bg-black  bg-[url('/cartographer.png')] bg-repeat">
            <figure className=" xl:hidden  flex px-1 md:px-6  mt-8">
              <img
                className=" w-[200px] md:w-[400px]"
                src="/LOGOARI.png"
                alt=""
              />
            </figure>
            <ul className="text-white  px-4 md:px-10 xl:px-8 mt-6 flex  flex-wrap *:w-full xl:my-16">
              <li className=" font-rubik text-[20px]">HELPFUL-LINKS</li>
              <li className=" mt-2 text-[15px] text-slate-200">
                <Link to="/shop">shop</Link>
              </li>
              <li className=" mt-2 text-[15px] text-slate-200">
                <Link to="#">ABOUT</Link>
              </li>
              <li className=" mt-2 text-[15px] text-slate-200">
                <Link to="#">SERVICES</Link>
              </li>
              <li className=" mt-2 text-[15px] text-slate-200">
                <Link to="#">CONTACT US</Link>
              </li>
              <li className=" mt-2 text-[15px] text-slate-200">
                <Link to="#">CAREERS</Link>
              </li>
            </ul>
            <ul className="text-white  px-4 md:px-10 xl:px-8 mt-6 flex  flex-wrap *:w-full xl:my-16">
              <li className=" font-rubik text-[20px]">SERVISEC</li>
              <li className=" mt-2 text-[15px] text-slate-200">
                <Link to="#">Gift Cards</Link>
              </li>
              <li className=" mt-2 text-[15px] text-slate-200">
                <Link to="#">Product Care</Link>
              </li>
              <li className=" mt-2 text-[15px] text-slate-200">
                <Link to="#">Personalized Recommendations </Link>
              </li>
            </ul>
            <ul className="text-white  px-4 md:px-10 xl:px-8 mt-6 flex  flex-wrap *:w-full xl:my-16">
              <li className=" font-rubik text-[20px]">LOCATION</li>
              <li className=" mt-2 text-[15px] text-slate-200">
                IRAN-TEHRAN-PARAND_ARI-STUDIO
              </li>
              <li className=" mt-2 text-[15px] text-slate-200">
                +98-938-914-95-39
              </li>
              <li className="mt-2 mb-4 flex justify-start space-x-4">
                <Link
                  className="flex items-center"
                  to="https://github.com/ari420"
                  target="blanck"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="hover:text-orange-900 duration-300 text-orange-600 text-[20px]"
                  />
                </Link>

                <Link
                  className="flex items-center"
                  to="https://www.instagram.com/component__shop?igsh=enRla3lxa3dzYXho"
                  target="blanck"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="hover:text-orange-900 duration-300 text-orange-600 text-[20px]"
                  />
                </Link>
                <Link
                  className="flex items-center"
                  to="https://twitter.com/arian_nw?t=gBHdfXRxznJSKjCqBdt8Yg&s=09"
                  target="blanck"
                >
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="hover:text-orange-900 duration-300 text-orange-600 text-[20px]"
                  />
                </Link>
                <Link
                  className="flex items-center"
                  to="https://www.linkedin.com/in/arian-afsharian-7a3903156"
                  target="blanck"
                >
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className="hover:text-orange-900 duration-300 text-orange-600 text-[20px]"
                  />
                </Link>
              </li>
            </ul>
            <figure className=" hidden xl:flex  my-16 xl:px-8">
              <img
                className=" w-[300px]  2xl:w-[250px] object-cover"
                src="/LOGOARI.png"
                alt=""
              />
            </figure>
          </section>
          <div className=" w-full  bg-[#181818] flex flex-wrap xl:flex-nowrap xl:justify-between *:w-full *:xl:w-fit">
            <span className=" p-4 xl:px-6 md:px-10 h-full flex items-center font-mono  text-slate-200">
              COPYRIGHT 2024
            </span>
            <span className=" p-4 xl:px-6 md:px-10 h-full flex items-center font-mono  text-slate-200">
              DESIGNED & BUILT BY_
              <a
                className=" text-orang text-[20px] hover:text-orange-900 duration-300 "
                target="balank"
                href="https://github.com/ari420"
              >
                ARI STUDIO
              </a>
            </span>
          </div>
        </footer>
        {isPopupVisible && selectedProduct && (
          <div className="popup fixed top-0 left-0 w-full h-[100vh] bg-[#000000CC] flex justify-center items-center z-50">
            <div className="p-4 overflow-y-scroll  w-full lg:w-[80%]  h-[90%] lg:h-[80%] bg-white lg:rounded-lg flex flex-wrap xl:flex-nowrap border shadow-lg overflow-hidden">
              {/* Image Section */}
              <figure className="w-full xl:w-[60%] h-[50%] lg:h-full flex justify-center items-center p-4 bg-gray-100">
                <img
                  className="border w-full h-[90%] xl:h-[80%] xl:rounded-lg object-cover"
                  src={selectedProduct.imag} // Use selectedProduct.image for dynamic image
                  alt={selectedProduct.name} // Use selectedProduct.name for alt text
                />
              </figure>

              {/* Info Section */}
              <div className="w-full xl:w-[50%] p-6 flex flex-col justify-between text-gray-800">
                {/* Product Details */}
                <div>
                  <h1 className="text-xl xl:text-3xl font-semibold mb-4 text-blue-950">
                    {selectedProduct.name}{" "}
                    {/* Display product name dynamically */}
                  </h1>
                  <p className="text-sm xl:text-base text-gray-600 mb-6">
                    {selectedProduct.info}{" "}
                    {/* Display product description dynamically */}
                  </p>
                  <span className="text-lg xl:text-2xl font-bold text-blue-950">
                    Price: ${selectedProduct.price}{" "}
                    {/* Display product price dynamically */}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="justify-between xl:px-2 flex">
                  <button
                    className="xl:w-auto px-6 py-4 xl:py-2 text-white bg-blue-600 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-blue-700"
                    onClick={closePopup}
                  >
                    Back to Shop
                  </button>
                  <button
                    onClick={() => onAddToCart(selectedProduct)}
                    className="xl:w-auto ml-2 px-6 py-4 xl:py-2 text-white bg-green-600 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-green-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
