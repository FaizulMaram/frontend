import Logo1 from "../assets/logos/logo1.svg";
import Logo2 from "../assets/logos/logo2.svg";
import Logo3 from "../assets/logos/logo3.svg";
import Logo4 from "../assets/logos/logo4.svg";
import Logo5 from "../assets/logos/logo5.svg";

const Logos = () => {
  const logos = [
    { src: Logo1, url: "https://www.vogue.com/fashion-shows/designer/versace" },
    { src: Logo2, url: "https://www.zara.com/" },
    { src: Logo3, url: "https://en.wikipedia.org/wiki/Gucci" },
    { src: Logo4, url: "https://en.wikipedia.org/wiki/Prada" },
    { src: Logo5, url: "https://en.wikipedia.org/wiki/Netflix" },
  ];
  return (
    <div className="bg-black sm:flex justify-center items-center p-6 gap-0 grid grid-cols-5 sm:gap-10 md:gap-15 lg:gap-30">
      {logos.map((logo) => (
        <a href={logo.url} target="_blank">
          <img
            src={logo.src}
            className="hover:scale-105 cursor-pointer duration-200 w-10 sm:w-10 md:w-12 lg:w-20"
          />
        </a>
      ))}
    </div>
  );
};

export default Logos;
