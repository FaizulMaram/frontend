import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMyProfileQuery } from "../../redux/apis/authApi";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: user } = useGetMyProfileQuery();

  if (isAuthenticated || user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;