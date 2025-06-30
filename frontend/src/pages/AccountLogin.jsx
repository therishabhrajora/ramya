import { DiBackbone } from "react-icons/di";
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

  const handleChange = (e) => {
    setRegisteredData({ ...registeredData, [e.target.name]: e.target.value });
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
      let error=e.response.data.message;
      alert(error);
    }
  };
  return (
    <>
      <NavBar />
      <div className="account-login">
        <form className="login">
          <h1 className="text-3xl">Login</h1>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="loginemail"
              placeholder="Enter your email"
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="loginpassword"
              placeholder="Enter your password"
            />
          </div>
          <Link className="Link" to="">
            <p className="forgot-password">forgot your password ?</p>
          </Link>
          <div className="sign-in-btn">Sign in</div>
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={registeredData.email}
              onChange={handleChange}
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={registeredData.password}
              onChange={handleChange}
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
              onChange={handleChange}
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
