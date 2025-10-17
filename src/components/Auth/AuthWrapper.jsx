import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetMyProfileQuery } from "../../redux/apis/authApi";
import { setUser, clearUser } from "../../redux/slices/authSlice";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { data: user, isSuccess, isError } = useGetMyProfileQuery();

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(setUser(user));
    } else if (isError) {
      dispatch(clearUser());
    }
  }, [user, isSuccess, isError, dispatch]);

  return children;
};

export default AuthWrapper;