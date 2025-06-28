import { DiBackbone } from "react-icons/di";
import "../styles/homepage/accountLogin.css";
import "../index.css"
import { Link } from "react-router-dom";
import NavBar from "../components/homePage/NavBar";
import Footer from "../components/homePage/Footer";

function AccountLogin() {
  return (
    <>
      <NavBar />
      <div className="account-login">
        <div className="login">
          <h1 className="text-3xl">Login</h1>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input type="email" id="loginemail" placeholder="Enter your email" />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="loginpassword"
              placeholder="Enter your password"
            />
          </div>
          <Link className="Link"to="">
            <p className="forgot-password">forgot your password ?</p>
          </Link>
          <div className="sign-in-btn">Sign in</div>
        </div>
        <div className="register">
          <h1 className="text-3xl">Register</h1>
          <div className="first-name">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              placeholder="Enter your first name"
            />
          </div>
          <div className="last-name">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              placeholder="Enter your last name"
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="phone">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" placeholder="Enter your phone" />
          </div>
          <div className="register-btn">Register</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AccountLogin;
