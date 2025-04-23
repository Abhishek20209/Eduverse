// import React from 'react'
// import logo from "../../assets/Logo/Logo-Full-Light.png"
// import { Link } from 'react-router-dom'
// import {NavbarLinks} from "../../data/navbar-links"
// import { useLocation,matchPath } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { FaShoppingCart } from "react-icons/fa";
// import ProfileDropDown from '../core/Auth/ProfileDropDown'
// import { apiConnector } from '../../services/apiconnector'
// import {categories} from "../../services/apis";
// import { useState,useEffect} from 'react'
// import { IoIosArrowDown } from "react-icons/io";


// // const subLinks=[
// //     {
// //         title:"python",
// //         link:"/catalog/python"
// //     },
// //     {
// //         title:"web  development",
// //         link:"/catalog/web-development"
// //     }

// // ]

// const Navbar = () => {

//     const {token}=useSelector((state)=>state.auth); 
//     const {user}=useSelector((state)=>state.profile);
//     const {totalItems}=useSelector((state)=>state.cart);

//     const [subLinks,setSubLinks]=useState([]);

//     const fetchSublinks=async()=>{
//         try{
//             const result=await apiConnector("GET",categories.CATEGORIES_API);
//             console.log("Printing the api call for getting all categories ",result)
//             setSubLinks(result.data.data);
//         }
//         catch(error){
//             console.log("Could not get all the categories");
//         }
//     }

//     useEffect( ()=>{
//         fetchSublinks();
//     },[])



//     const location=useLocation();

//     const matchRoute=(route)=>{
//         return matchPath({path:route},location.pathname);
//     }

//   return (
//     <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 '>
//         <div className=' flex w-11/12 max-w-maxContent items-center justify-between'>

//             <Link to="/">
//                 <img src={logo} width={160} height={42} loading="lazy" alt="logo image of Eduverse" />
//             </Link>

//             <nav>
//                 <ul className='flex gap-x-6 text-richblack-25'>
//                     {
//                         NavbarLinks.map((link,index)=>(
//                             <li key={index}> 
//                                 {
                
//                 link.title==="Catalog"?(
//                                 <div className=' relative flex items-center gap-2 group'>
                                    
//                                     <p>{link.title}</p>
//                                     <IoIosArrowDown />

//                                     <div className='invisible absolute left-[50%] 
//                                         translate-x-[-50%] translate-y-[50%] 
//                                     top-[50%] flex flex-col 
//                                     rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 
//                                     group-hover:visible group-hover:opacity-100 group-hover: lg:w-[300px] '>
                                        
//                                         <div className='absolute left-[50%] translate-x-[80%] translate-y-[-45%]  top-0 h-6 w-6 rotate-45 rounded bg-richblack-5'>

//                                         </div >

//                                         {
//                                             subLinks.length?(
                                            
//                                                 subLinks.map((subLink,index)=>(
//                                                     <Link to={`/catalog/${subLink.name}`} key="index">
//                                                             <p>{subLink.name}</p>
//                                                     </Link>
//                                                 ))
                                            
//                                             )                       
//                                             :(<div></div>)
//                                         }

//                                     </div>

//                                 </div>):
//                                     (
//                                         <Link to={link?.path}>
//                                             <p className={`${matchRoute(link.path) ? "text-yellow-5" : "text-richblack-25" }`}>
//                                                 {link.title}
//                                             </p>
//                                         </Link>
//                                     ) 
//                                 }
//                             </li>
//                         ))
//                     }
//                 </ul>
//             </nav>

//             <div className='flex gap-x-4'>
//                 {
//                     user&&user?.accountType != "Instructor" &&(
//                         <Link to="/dashboard/cart" className='relative' >
//                             <FaShoppingCart />
//                             {
//                                 totalItems>0&&(
//                                     <span>
//                                         {totalItems}
//                                     </span>
//                                 )
//                             }
//                         </Link>
//                     )
//                 }
//                 {
//                     token===null && (
//                         <Link to="/login" >
//                             <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
//                                 Log in
//                             </button>
//                         </Link>
//                     )
//                 }
//                 {
//                     token===null && (
//                         <Link to="/signup" >
//                             <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
//                                 Sign Up
//                             </button>
//                         </Link>
//                     )
//                 }
//                 {
//                     token!==null && <ProfileDropDown/>
//                 }
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Navbar


// import React, { useState, useEffect } from "react";
// import { Link, useLocation, matchPath } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FaShoppingCart } from "react-icons/fa";
// import { IoIosArrowDown } from "react-icons/io";
// import ProfileDropDown from "../core/Auth/ProfileDropDown";
// import logo from "../../assets/Logo/Logo-Full-Light.png";
// import EduverseLogo from "../../assets/Logo/EduverseLogo.jpeg"
// import { NavbarLinks } from "../../data/navbar-links";
// import { apiConnector } from "../../services/apiconnector";
// import { categories } from "../../services/apis";

// const Navbar = () => {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { totalItems } = useSelector((state) => state.cart);

//   const [subLinks, setSubLinks] = useState([]);

//   useEffect(() => {
//     const fetchSublinks = async () => {
//       try {
//         const result = await apiConnector("GET", categories.CATEGORIES_API);
//         setSubLinks(result.data.data);
//       } catch (error) {
//         console.error("Could not fetch categories", error);
//       }
//     };

//     fetchSublinks();
//   }, []);

//   const location = useLocation();

//   const matchRoute = (route) => matchPath({ path: route }, location.pathname);

//   return (
//     <div className="flex h-14 items-center justify-center border-b border-b-richblack-700">
//       <div className="flex w-11/12 max-w-maxContent items-center justify-between">
//         {/* Logo */}
//         <Link to="/">
//           <img
//             src={EduverseLogo}
//             width={50}
//             height={12}
//             loading="lazy"
//             alt="Eduverse Logo"
//             className="rounded-md"
//           />
//         </Link>

//         {/* Navbar Links */}
//         <nav>
//           <ul className="flex gap-x-6 text-richblack-25">
//             {NavbarLinks.map((link, index) => (
//               <li key={index} className="relative group">
//                 {link.title === "Catalog" ? (
//                   <div className="flex items-center gap-2 cursor-pointer">
//                     <p>{link.title}</p>
//                     <IoIosArrowDown />

//                     {/* Dropdown Content */}
//                     <div className="invisible absolute left-0 top-full mt-2 w-[200px] rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 z-50 shadow-lg">
//                       {subLinks.length ? (
//                         subLinks.map((subLink, index) => (
//                           <Link
//                             to={`/catalog/${subLink.name}`}
//                             key={index}
//                             className="block px-4 py-2 hover:bg-richblack-100 rounded-md"
//                           >
//                             {subLink.name}
//                           </Link>
//                         ))
//                       ) : (
//                         <p className="text-gray-500">Loading...</p>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <Link to={link?.path}>
//                     <p
//                       className={`${
//                         matchRoute(link.path)
//                           ? "text-yellow-5"
//                           : "text-richblack-25"
//                       }`}
//                     >
//                       {link.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Right Section (Cart & Profile) */}
//         <div className="flex gap-x-4 items-center">
//           {user && user?.accountType !== "Instructor" && (
//             <Link to="/dashboard/cart" className="relative">
//               <FaShoppingCart />
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}

//           {!token && (
//             <>
//               <Link to="/login">
//                 <button className="border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 rounded-md">
//                   Log in
//                 </button>
//               </Link>
//               <Link to="/signup">
//                 <button className="border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 rounded-md">
//                   Sign Up
//                 </button>
//               </Link>
//             </>
//           )}

//           {token && <ProfileDropDown />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;








import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

// import logo from "../../assets/Logo/Logo-Full-Light.png"
import logo1 from "../../assets/Logo/EduverseFullBlack.png";

import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"



function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);

        console.log("categories data in navbar.jsx",res);

        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo1} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  )
}

export default Navbar