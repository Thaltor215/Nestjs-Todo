import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setCredentials,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./login.scss";
interface LoginRequest {
  username: string;
  password: string;
}

const Login = () => {
  const [validations, setValidations] = useState({
    username: true,
    password: true,
  });

  const [loginForm, setLogin] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const [login, { isLoading: submitting }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      navigate("/");
    }
    return () => {};
  }, [currentUser]);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setValidations({
      ...validations,
      username: !!loginForm.username,
      password: !!loginForm.password,
    });

    if (!!loginForm.username === false || !!loginForm.password === false) {
      return;
    }

    try {
      const userData: any = await login(loginForm).unwrap();

      dispatch(
        setCredentials({
          accessToken: userData.access_token,
          isLoggedIn: true,
          username: userData.username,
          firstname: userData.firstname,
          lastname: userData.lastname,
        })
      );
    } catch (error) {
      // Handle login error
      toast.error("Login failed.", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setLogin((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="card-blurred login-card">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            autoComplete="off"
            type="text"
            id="username"
            className={`form-control ${validations.username ? "" : "error"}`}
            placeholder=""
            name="username"
            value={loginForm.username}
            onChange={handleChange}
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${validations.password ? "" : "error"}`}
            placeholder=""
            value={loginForm.password}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
        </div>
        {submitting ? (
          <div className="loader"></div>
        ) : (
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
