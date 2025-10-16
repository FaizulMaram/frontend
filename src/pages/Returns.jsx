import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Returns = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-1">
        <Navbar />
      </div>
      <div className="max-w-4xl mx-auto px-5 py-16">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Returns & Refund Policy
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            At <span className="font-semibold">SHOP.FU</span>, we want you to
            love your purchase. If you're not completely satisfied, we’re here
            to help.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            1. Return Eligibility
          </h2>
          <p>
            You can return items within <strong>7 days of delivery</strong> if
            they are unused, unwashed, and in their original packaging with all
            tags attached.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            2. Non-Returnable Items
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Items marked as “Final Sale”</li>
            <li>Gift cards or discount vouchers</li>
            <li>Used or damaged products</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            3. Refunds
          </h2>
          <p>
            Once your return is received and inspected, we’ll notify you by
            email. If approved, your refund will be processed within{" "}
            <strong>5–7 business days</strong> using your original payment
            method.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            4. Exchange Policy
          </h2>
          <p>
            We currently don’t offer direct exchanges. You can return your item
            and place a new order for your preferred size or color.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            5. Shipping for Returns
          </h2>
          <p>
            Customers are responsible for the return shipping cost unless the
            item received was defective or incorrect.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            6. Contact Us
          </h2>
          <p>
            For any questions or concerns about returns, please contact our
            support team at{" "}
            <span className="font-semibold">support@shopfu.com</span>.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Returns;
