import { useState } from "react";
import "../../style/homepage/resetPassword.css"

function ResetPassword() {

  const [resetPassword,setResetPassword]=useState({
    newPassword:"",
    currPassword:""
  })

  const handleLoginChange=(e)=>{
    setResetPassword({...resetPassword,[e.target.name]:e.target.value});
  }

  const handleResetPassword=(e)=>{
    e.preventDefault()
  }

  return (
    <div className="resetPassword">
        <form className="forms" onSubmit={handleResetPassword}>
          <h1 className="text-3xl">Reset Password</h1>
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
          <button className="resetBtn" type="submit">
            Reset Password
          </button>
        </form>
    </div>
  );
}

export default ResetPassword;
