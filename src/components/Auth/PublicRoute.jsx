import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMyProfileQuery } from "../../redux/apis/authApi";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
