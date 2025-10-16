import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    { id: 1, name: "Home" },
    { id: 2, name: "Shop" },
    { id: 3, name: "Contact" },
  ];

  const supportLinks = [
    { id: 4, name: "FAQ" },
    { id: 5, name: "Returns" },
    { id: 6, name: "Shipping" },
  ];

  return (
    <footer className="bg-black text-white mt-20 py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="font-extrabold text-2xl mb-3">SHOP.FU</h2>
          <p className="text-gray-400 text-sm">
            Trendy, comfortable and stylish wear for everyone. Discover your
            fashion today!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            {quickLinks.map((link) => (
              <li
                key={link.id}
                className="cursor-pointer hover:text-white transition"
              >
                {link.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Customer Support</h3>
          <ul className="space-y-2 text-gray-300">
            {supportLinks.map((link) => (
              <li
                key={link.id}
                className="cursor-pointer hover:text-white transition"
              >
                {link.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <FaFacebookF className="cursor-pointer hover:text-blue-400" />
            <FaInstagram className="cursor-pointer hover:text-pink-500" />
            <FaTwitter className="cursor-pointer hover:text-blue-300" />
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-6" />
      <p className="text-center text-gray-500 text-sm">
        © 2025 SHOP.FU — All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
