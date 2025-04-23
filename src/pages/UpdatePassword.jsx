import React, { useState } from 'react'
import { setLoading } from '../slices/authSlice'
import { useSelector,useDispatch} from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { useLocation } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast"


const UpdatePassword = () => {

    const navigate=useNavigate();

    const dispatch=useDispatch();
    const location=useLocation();

    const [showPassword,setShowPassword]=useState(false);
    const [showPasswordc,setShowPasswordc]=useState(false);

    const {loading}=useSelector((state)=>state.auth);

    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:""
    });

    const {password,confirmPassword}=formData;

    const handleFormChange=(e)=>{
        setFormData((prevdata)=>(
            {
                ...prevdata,
                [e.target.name]:e.target.value
            }
        ))
    }

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        
        const token=location.pathname.split('/').at(-1);

        if(password!==confirmPassword)
            toast.error("Password and ConfirmPassword do not match")
        else
            dispatch(resetPassword(password,confirmPassword,token,navigate))
    }

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
  {loading ? (
    <div className="text-lg font-semibold">Loading...</div>
  ) : (
    <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center">Choose New Password</h1>
      <p className="mt-2 text-gray-400 text-center">
        Almost done. Enter your password and you're all set.
      </p>

      <form onSubmit={handleOnSubmit} className="mt-6 space-y-4">
        {/* New Password Field */}
        <label className="block">
          <p className="text-sm text-gray-300 mb-1">New Password</p>
          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder="Password"
              onChange={handleFormChange}
              className="w-full p-3 pr-10 rounded-lg bg-richblack-800 text-white border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-300"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-300 hover:text-white cursor-pointer"
            >
              {showPassword ? <IoEyeOff fontSize={24} /> : <IoEye fontSize={24} />}
            </span>
          </div>
        </label>

        {/* Confirm Password Field */}
        <label className="block">
          <p className="text-sm text-gray-300 mb-1">Confirm Password</p>
          <div className="relative">
            <input
              required
              type={showPasswordc ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={handleFormChange}
              className="w-full p-3 pr-10 rounded-lg bg-richblack-800 text-white border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-300"
            />
            <span
              onClick={() => setShowPasswordc(!showPasswordc)}
              className="absolute right-3 top-3 text-gray-300 hover:text-white cursor-pointer"
            >
              {showPasswordc ? <IoEyeOff fontSize={24} /> : <IoEye fontSize={24} />}
            </span>
          </div>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-200 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition duration-200"
        >
          Reset Password
        </button>
      </form>

      {/* Back to Login */}
      <div className="mt-4 text-center">
        <Link to="/login" className="text-gray-300 hover:text-yellow-100">
          &larr; Back to Login
        </Link>
      </div>
    </div>
  )}
</div>

  )
}

export default UpdatePassword;


