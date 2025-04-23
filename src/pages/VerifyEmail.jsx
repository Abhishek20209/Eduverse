import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input';
import { signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {

    const {signupData,loading}=useSelector((state)=>state.auth);
    const dispatch=useDispatch(); 
    const [otp,setOtp]=useState("");
    const navigate=useNavigate();

    const sendOtpFunc=()=>{
        console.log("function sendOtpFunc triggered");
        dispatch(sendOtp(signupData.email,navigate));
    }

    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[]);

    const setTheOtp=(e)=>{
        e.preventDefault();
        setOtp(otp);
    }

    const handleOnSubmit=(e)=>{
        e.preventDefault();
         
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        }=signupData;


        dispatch(signUp(accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,otp,navigate));

    }

  return (
    // <div className='text-white'>
    //     {
    //         loading?(<div>
    //             loading...
    //         </div>):(

    //             <div>
    //                 <h1>Verify Email</h1>
    //                 <p>A verification code has been sent to you. Enter the code below</p>

    //                 <form onSubmit={handleOnSubmit}>
    //                 <OTPInput
    //                     value={otp}
    //                     onChange={setOtp}
    //                     numInputs={6}
    //                     renderSeparator={<span>-</span>}
    //                     renderInput={(props) => <input {...props} />}
    //                     />
    //                     <button type="submit">
    //                         Verify Email
    //                     </button>
    //                 </form>
                    
    //                 <div>
    //                     <div className="mt-4 text-center">
    //                         <Link to="/login" className="text-gray-300 hover:text-yellow-100">
    //                         &larr; Back to Login
    //                         </Link>
    //                     </div>

    //                     <button onClick={()=>sendOtp(signupData.email)}>
    //                         Resend it
    //                     </button>
    //                 </div>
                    
    //             </div>
    //         )
    //     }
    // </div>

    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
  {loading ? (
    <div className="text-lg font-semibold">Loading...</div>
  ) : (
    <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center">Verify Email</h1>
      <p className="mt-2 text-gray-400 text-center">
        A verification code has been sent to you. Enter the code below.
      </p>

      <form onSubmit={handleOnSubmit} className="mt-6 flex flex-col items-center space-y-4">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="mx-1 text-yellow-400">-</span>}
          renderInput={(props) => (
            <input
              {...props}
              className="w-12 h-12 text-center text-lg font-bold bg-gray-700 text-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
            />
          )}
        />

        <button
          type="submit"
          className="w-full bg-yellow-100 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition duration-200"
        >
          Verify Email
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link to="/login" className="text-gray-300 hover:text-yellow-100">
          &larr; Back to Login
        </Link>
      </div>

      <button
        onClick={sendOtpFunc}
        className="mt-4 w-full text-yellow-400 hover:text-yellow-500 underline"
      >
        Resend it
      </button>
    </div>
  )}
</div>


  )
}

export default VerifyEmail