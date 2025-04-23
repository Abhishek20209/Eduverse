import React, { useState } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);

  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch=useDispatch();

  const handleOnSubmit=(e)=>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent));
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      {loading ? (
        <div className="text-2xl font-semibold">Loading...</div>
      ) : (
        <div className="w-full max-w-md bg-gray-800 bg-opacity-30 p-8 rounded-xl shadow-xl backdrop-blur-md">
       
          <h1 className="text-3xl font-bold text-center text-yellow-100">
            {emailSent ? "Check Your Email" : "Reset Your Password"}
          </h1>

          
          <p className="mt-4 text-gray-300 text-center">
            {emailSent
              ? `We have sent a reset link to ${email}`
              : "No worries! We'll email you instructions to reset your password. If you don’t have access to your email, try account recovery."}
          </p>

         
          {!emailSent && (
            <form onSubmit={handleOnSubmit} className="mt-6">
              <label className="block">
              <p className="text-sm text-gray-200">
                Email Address <span className="text-brown-50 text-lg font-bold">*</span>
              </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="abc@gmail.com"
                  className="w-full mt-2 p-3 rounded-lg bg-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-yellow-100"
                />
              </label>
            </form>
          )}

          {/* Button */}
          <button type="submit" onClick={handleOnSubmit}
            className="mt-6 w-full bg-yellow-100 text-black font-semibold py-3 rounded-lg hover:bg-yellow-100 transition-all duration-300"
          >
            {emailSent ? "Resend Email" : "Reset Password"}
          </button>

          {/* Back to Login */}
          <div className="mt-4 text-center">
            <Link to="/login" className="text-gray-300 hover:text-yellow-100">
              &larr; Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
