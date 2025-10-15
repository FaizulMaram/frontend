import { Link } from "react-router-dom";

const BackPage = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="text-red-400 hover:underline text-sm flex items-center gap-2 mb-5"
    >
      ← {text}
    </Link>
  );
};

export default BackPage;
