import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Button } from "../components/Shared/Button";
import { Link } from "react-router-dom";

const Shop = () => {
  const categories = [
    {
      id: 1,
      title: "Men",
      description:
        "Explore our men’s collection — stylish, bold, and comfortable.",
      image:
        "https://img.freepik.com/free-photo/young-handsome-man-choosing-cloth-shop_1303-19847.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      id: 2,
      title: "Women",
      description: "Trendy outfits for every occasion — be confident, be you.",
      image:
        "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 3,
      title: "Accessories",
      description: "Complete your look with elegant and stylish accessories.",
      image:
        "https://fashionchinaagency.com/wp-content/uploads/2021/02/Store-Luxury-Bags.jpg",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-5">
        <Navbar />
      </div>

      <div className="max-w-6xl mx-auto px-5 py-16">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Welcome to SHOP.FU Store
        </h1>

        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Discover our latest collections designed to fit your lifestyle.
          Whether you’re looking for trendy outfits, comfy essentials, or unique
          accessories — we have it all at the best prices.
        </p>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition duration-300"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {cat.title}
              </h2>
              <p className="text-gray-500">{cat.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-gray-600 mb-6">
            Browse our full range of products and enjoy exclusive offers!
          </p>
          <Link to="/home">
            <Button
              text="Start Shopping"
              className="bg-black text-white px-6 py-3"
            />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
