import "../styles/homepage/accountLogin.css";
import "../index.css";
import { Link } from "react-router-dom";
import NavBar from "../components/homePage/NavBar";
import Footer from "../components/homePage/Footer";
import { useState } from "react";
import axios from "axios";

function AccountLogin() {
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
      const res=axios.post("http://localhost:9090/collections/login", loginData);
      setLoginData({
        email: "",
        password: "",
      });

      res.then((res)=>{
        console.log(res);
      })
    } catch (e) {
      console.log(e);
    }
  };

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:9090/collections/register",
        registeredData
      );

      setRegisteredData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
      });



    } catch (e) {
      let error = e.response.data.message;
      alert(error);
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
              type="email"
              id="loginemail"
              autoComplete="off"
              value={loginData.email}
              onChange={handleLoginChange}
              name="email"
              placeholder="Enter your email"
            />
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
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="registerEmail"
              placeholder="Enter your email"
              value={registeredData.email}
              onChange={handleRegisterChange}
            />
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
