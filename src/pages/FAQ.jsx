import { useState } from "react";
import Footer from "../components/Footer/Footer";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    id: 1,
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you’ll receive a tracking link via email or SMS. You can also view the status in your account under ‘My Orders’.",
  },
  {
    id: 2,
    question: "What is your return policy?",
    answer:
      "You can return any item within 7 days of delivery, provided it is unused and in original packaging.",
  },
  {
    id: 3,
    question: "Do you offer free shipping?",
    answer:
      "Yes, we offer free standard shipping on orders above $50 across all regions.",
  },
  {
    id: 4,
    question: "Can I cancel my order after placing it?",
    answer:
      "Yes, you can cancel within 12 hours of placing your order from the ‘My Orders’ section or by contacting our support team.",
  },
  {
    id: 5,
    question: "What payment methods are accepted?",
    answer:
      "We accept all major debit/credit cards, cash on delivery, and selected mobile wallets.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-5 py-16">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white shadow-md rounded-xl p-5 cursor-pointer hover:shadow-lg transition duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <FaChevronDown
                  className={`text-gray-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              {openIndex === index && (
                <p className="text-gray-600 mt-3">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
