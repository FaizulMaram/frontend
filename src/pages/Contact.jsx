import BackPage from "../components/Shared/BackPage";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center">
      <div className="w-full max-w-3xl p-6">
        <BackPage to="/home" text="Back" />

        {/* Heading */}
        <h1 className="text-5xl font-bold text-center text-white mt-8">
          Get in Touch
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-400 mt-4 text-lg">
          We’d love to hear from you! Whether you have questions, feedback, or
          business inquiries, reach us directly.
        </p>

        {/* Contact Info Card */}
        <div className="mt-10 bg-white text-black rounded-2xl p-10 shadow-lg flex flex-col items-start space-y-6">
          <div className="flex justify-center items-center gap-4 sm:gap-4">
            <FaMapMarkerAlt className="text-xl" />
            <p className="text-sm font-medium ">
              123 Main Street, Pakistan, 54000
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-xl" />
            <p className="text-sm font-medium">+92 (123) 999-4567</p>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-xl" />
            <p className="text-sm font-medium">contact@yourcompany.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
