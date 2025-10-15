const Footer = () => {
  const Homelinks = [
    { id: 1, name: "About" },
    { id: 2, name: "Features" },
    { id: 3, name: "Career" },
    { id: 4, name: "Works" },
  ];
  const Helplinks = [
    { id: 5, name: "Customer Support" },
    { id: 6, name: "Delivery Details" },
    { id: 7, name: "Terms & Conditions" },
    { id: 8, name: "Privacy Policy" },
  ];
  const Faqlinks = [
    { id: 9, name: "Account" },
    { id: 10, name: "Payment" },
    { id: 11, name: "Orders" },
    { id: 12, name: "Management" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  mt-30 bg-black text-white p-4 sm:p-3 md:p-4 lg:p-0 ">
      <div className="mt-10 lg:w-[50%] md:ml-6 space-y-5">
        <p className="font-bold tracking-wider text-2xl">SHOP.FU</p>
        <p className="font-light text-base/8">
          We have clothes that suits your style and which you’re proud to wear.
          From women to men.
        </p>
      </div>
      {/* Links */}
      <div className="grid grid-cols-4 gap-6 mt-10 md:text-[1rem] mb-10">
        <div className="list-none space-y-5">
          <p className="font-medium tracking-wider text-lg">Home</p>
          {Homelinks.map((data, index) => (
            <div key={index}>
              <li className="cursor-pointer">{data.name}</li>
            </div>
          ))}
        </div>
        <div className="list-none space-y-5">
          <p className="font-medium tracking-wider text-lg">Help</p>
          {Helplinks.map((data, index) => (
            <div key={index}>
              <li className="cursor-pointer">{data.name}</li>
            </div>
          ))}
        </div>
        <div className="list-none space-y-5">
          <p className="font-medium tracking-wider text-lg">FAQ</p>
          {Faqlinks.map((data, index) => (
            <div key={index}>
              <li className="cursor-pointer">{data.name}</li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
