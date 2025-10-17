import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMyProfileQuery } from "../../redux/apis/authApi";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: user, isLoading } = useGetMyProfileQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;