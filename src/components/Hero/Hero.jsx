import Hero_Img from "../../assets/hero/hero.png";
const Hero = () => {
  return (
    <div className="flex justify-center bg-black">
      <img src={Hero_Img} className="w-[full]" />
    </div>
  );
};

export default Hero;
