import Logo1 from "../assets/logos/logo1.svg";
import Logo2 from "../assets/logos/logo2.svg";
import Logo3 from "../assets/logos/logo3.svg";
import Logo4 from "../assets/logos/logo4.svg";
import Logo5 from "../assets/logos/logo5.svg";

const Logos = () => {
  const logos = [Logo1, Logo2, Logo3, Logo4, Logo5];
  return (
    <div className="bg-black sm:flex justify-center items-center p-6 gap-0 grid grid-cols-5 sm:gap-10 md:gap-15 lg:gap-30">
      {logos.map((logo) => (
        <img
          src={logo}
          className="hover:scale-105 cursor-pointer duration-200 w-10 sm:w-10 md:w-12 lg:w-20"
        />
      ))}
    </div>
  );
};

export default Logos;
