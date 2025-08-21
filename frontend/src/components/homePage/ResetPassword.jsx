import { useState } from "react";
import "../../style/homepage/resetPassword.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { ENDPOINTS } from "../../helper/Constants";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  const [resetPassword, setResetPassword] = useState({
    email: "",
    newPassword: "",
    currPassword: "",
  });

  const handleLoginChange = (e) => {
    setResetPassword({ ...resetPassword, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (resetPassword.newPassword == resetPassword.currPassword) {
      toast.error("Please check confirm Password");
      return;
    }

    try {
      const res = await axios.post(ENDPOINTS.resetpassword, resetPassword);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="resetPassword">
        <form className="forms" onSubmit={handleResetPassword}>
          <h1 className="text-3xl">Reset Password</h1>
          <div className="email">
            <label htmlFor="emaill">Enter Email</label>
            <input
              type="email"
              id="emaill"
              autoComplete="off"
              value={resetPassword.email}
              onChange={handleLoginChange}
              name="email"
              placeholder="Enter email"
            />
          </div>
          <div className="email">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              autoComplete="off"
              value={resetPassword.newPassword}
              onChange={handleLoginChange}
              name="newPassword"
              placeholder="Enter new password"
            />
          </div>
          <div className="confirm password">
            <label htmlFor="currPassword">Confirm Password</label>
            <input
              type="password"
              id="currPassword"
              autoComplete="off"
              name="currPassword"
              value={resetPassword.currPassword}
              onChange={handleLoginChange}
              placeholder="Confirm password"
            />
          </div>
          <button
            className="resetBtn"
            type="submit"
            onSubmit={handleResetPassword}
          >
            Reset Password
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ResetPassword;
