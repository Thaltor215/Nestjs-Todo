import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { logOut, selectCurrentUser } from "../features/auth/authSlice";
import { sharedRoute } from "../routes";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, firstname, lastname, userId } =
    useSelector(selectCurrentUser);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logOut());
  };

  const render = useMemo(() => {
    if (!isLoggedIn)
      return (
        <Navigate
          to={sharedRoute.Login()}
          replace
          state={{
            previousPage: location.pathname,
          }}
        />
      );

    return (
      <>
        <div className="card-blurred nav">
          <h4>
            Welcome {firstname}&nbsp;{lastname}!
          </h4>
          <div className="btn-logout" onClick={handleLogout}></div>
        </div>
        {children}
      </>
    );
  }, [children, isLoggedIn, userId]);

  return render;
};

export default ProtectedRoute;
