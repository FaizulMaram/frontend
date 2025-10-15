import { Link } from "react-router-dom";

const GoPage = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="bg-black text-white text-sm flex items-center gap-2 mb-5"
    >
      {text}
    </Link>
  );
};

export default GoPage;
