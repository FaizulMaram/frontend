import BackPage from "../components/Shared/BackPage";
const Contact = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="p-9">
        <BackPage to="/home" text="Back" />
        <p className="text-5xl text-center text-white font-bold ">
          Get in Touch
        </p>
        <div className="mt-10 text-gray-100 text-center">
          <p class="text-2xl font-semibold tracking-widest mb-5">
            We’d love to hear from you! Whether you have a question, feedback,
            or business inquiry - reach us directly.
          </p>
          <p className="font-medium">123 Main Street, Pakistan, 54000</p>
          <p>+92 (123) 999-4567</p>
          <p>contact@yourcompany.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
