import "../style/homepage/accountLogin.css";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/homePage/NavBar";
import Footer from "../components/homePage/Footer";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../slices/AuthSlice";
import { MdSouth } from "react-icons/md";
import { ENDPOINTS } from "../helper/Constants";

function AccountLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginErrorMessage, setLoginErrorMessage] = useState({});
  const [registerErrorMessage, setRegisterErrorMessage] = useState({});

  const [registeredData, setRegisteredData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisteredData({ ...registeredData, [e.target.name]: e.target.value });
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(ENDPOINTS.login, loginData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const { token, user, role } = res.data;

      setLoginData({
        email: "",
        password: "",
      });

      dispatch(loginSuccess({ token, user, role }));

      navigate("/collections");
    } catch (e) {
      let error = e.response.data;
      setLoginErrorMessage(error);
    }
  };

  const handleRegisterForm = async (e) => {
    alert("register call");
    e.preventDefault();
    try {
      alert("this is before respose");
      const res = await axios.post(ENDPOINTS.register, registeredData);
      alert("after res")
      setRegisteredData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
      });
    } catch (e) {
      alert("e catch");
      let error = e.response.data;
      setRegisterErrorMessage(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="account-login">
        <form className="login" onSubmit={handleLoginForm}>
          <h1 className="text-3xl">Login</h1>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="loginemail"
              autoComplete="off"
              value={loginData.email}
              onChange={handleLoginChange}
              name="email"
              placeholder="Enter your email"
            />
            <small>
              {loginErrorMessage.email ? loginErrorMessage.email : null}
            </small>
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="loginpassword"
              autoComplete="new-password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder="Enter your password"
            />
            {loginErrorMessage.password && (
              <small>{loginErrorMessage.password}</small>
            )}
          </div>
          <Link className="Link" to="">
            <p className="forgot-password">forgot your password ?</p>
          </Link>
          <button className="sign-in-btn" type="submit">
            Sign in
          </button>
        </form>

        <form onSubmit={handleRegisterForm} className="register">
          <h1 className="text-3xl">Register</h1>
          <div className="first-name">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              name="firstName"
              id="first-name"
              placeholder="Enter your first name"
              value={registeredData.firstName}
              onChange={handleRegisterChange}
            />
            {registerErrorMessage.firstName && (
              <small>{registerErrorMessage.firstName}</small>
            )}
          </div>
          <div className="last-name">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="lastName"
              placeholder="Enter your last name"
              value={registeredData.lastName}
              onChange={handleRegisterChange}
            />
            {registerErrorMessage.lastName && (
              <small>{registerErrorMessage.lastName}</small>
            )}
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="registerEmail"
              placeholder="Enter your email"
              value={registeredData.email}
              onChange={handleRegisterChange}
            />
            {registerErrorMessage.email && (
              <small>{registerErrorMessage.email}</small>
            )}
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="resgisterPassword"
              name="password"
              // autocomplete="new-password"
              placeholder="Enter your password"
              value={registeredData.password}
              onChange={handleRegisterChange}
            />
            {registerErrorMessage.password && (
              <small>{registerErrorMessage.password}</small>
            )}
          </div>
          <div className="phone">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={registeredData.phone}
              name="phone"
              placeholder="Enter your phone"
              onChange={handleRegisterChange}
            />
            {registerErrorMessage.phone && (
              <small>{registerErrorMessage.phone}</small>
            )}
          </div>
          <button className="register-btn" type="submit">
            Register
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default AccountLogin;
