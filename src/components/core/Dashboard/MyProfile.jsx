// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import IconBtn from '../../common/IconBtn'
// import { useSelector } from 'react-redux'

// const MyProfile = () => {

//     const {user}=useSelector((state)=>state.profile)

//     const navigate=useNavigate();



//   return (
//     <div className='text-white'>
//         <h1>
//             My Profile
//         </h1>

//         <div>
//             <div>
//                 <img src={user?.image} alt={`profile-${user?.firstName}`}
//                     className='aspect-square w-[78px] rounded-full object-cover'
//                 />

//                 <div>
//                     <p>{user?.firstName+" "+user?.lastName}</p>

//                     <p>{user?.email}</p>
//                 </div>
                
//             </div>

//             <IconBtn 
//                 text="Edit"
//                 onclick={()=>{
//                     console.log("Edit pressed")
//                     navigate("/dashboard/settings")
//                 }}
//             >

//             </IconBtn>
//         </div>


//         <div>
//             <div>
//                 <p>About</p>
//                 <IconBtn
//                     text="Edit"
//                     onclick={()=>{
//                         navigate("/dashboard/settings")
//                     }}
//                 />
//                 <p>{user?.additionalDetails?.about ?? "write something about yourself" }</p>
//             </div>
//         </div>

//         <div>
//             <div>
//                 <p>Personal Details</p>

//                 <IconBtn
//                     text="Edit"
//                     onclick={()=>{
//                         navigate("/dashboard/settings")
//                     }}
//                 />
//             </div>

//             <div>
//                 <p>First Name</p>
//                 <p>{user?.firstName}</p>
//             </div>

//             <div>
//                 <p>Email</p>
//                 <p>{user?.email}</p>
//             </div>

//             <div>
//                 <p>Gender</p>
//                 <p>{user?.additionalDetails?.gender ?? "Add gender"}</p>
//             </div>

//             <div>
//                 <p>LastName</p>
//                 <p>{user?.lastName}</p>
//             </div>

//             <div>
//                 <p>ContactNumber</p>
//                 <p>{user?.additionalDetails?.contactNumber ?? "Add contact Number"}</p>
//             </div>

//             <div>
//                 <p>Date of Birth</p>
//                 <p>{user?.additionalDetails?.dateOfBirth ?? "Add date of Birth"}</p>
//             </div>
//         </div>


//     </div>
//   )
// }

// export default MyProfile

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import IconBtn from "../../common/IconBtn";
// import { useSelector } from "react-redux";

// const MyProfile = () => {
//   const { user } = useSelector((state) => state.profile);
//   const navigate = useNavigate();

//   return (
//     <div className="flex min-h-screen min-w-fit bg-richblack-800">
//       {/* Sidebar Space Fix: Adjust Margin to Avoid Overlapping */}
//       <div className="flex-grow w-full px-6 py-8 ml-[220px]">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-3xl font-medium text-richblack-5 mb-10">My Profile</h1>

//           {/* Profile Section */}
//           <div className="flex items-center justify-between rounded-lg border border-richblack-700 bg-richblack-700 p-6 mb-8">
//             <div className="flex items-center gap-4">
//               <img
//                 src={user?.image}
//                 alt={`profile-${user?.firstName}`}
//                 className="aspect-square w-[78px] rounded-full object-cover border-2 border-yellow-50"
//               />
//               <div className="space-y-1">
//                 <p className="text-xl font-semibold text-richblack-5">
//                   {user?.firstName + " " + user?.lastName}
//                 </p>
//                 <p className="text-sm text-richblack-300">{user?.email}</p>
//               </div>
//             </div>
//             <IconBtn
//               text="Edit"
//               onClick={() => navigate("/dashboard/settings")}
//               customClasses="bg-yellow-50 text-richblack-900 px-6 py-2 rounded-lg hover:scale-95 transition-all"
//             />
//           </div>

//           {/* About Section */}
//           <div className="rounded-lg border border-richblack-700 bg-richblack-700 p-6 mb-8">
//             <div className="flex items-center justify-between mb-4">
//               <p className="text-lg font-medium text-richblack-5">About</p>
//               <IconBtn
//                 text="Edit"
//                 onClick={() => navigate("/dashboard/settings")}
//                 customClasses="bg-yellow-50 text-richblack-900 px-4 py-1.5 rounded-md hover:scale-95 transition-all"
//               />
//             </div>
//             <p className="text-richblack-200 text-sm leading-6">
//               {user?.additionalDetails?.about || "Write something about yourself..."}
//             </p>
//           </div>

//           {/* Personal Details Section */}
//           <div className="rounded-lg border border-richblack-700 bg-richblack-700 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <p className="text-lg font-medium text-richblack-5">Personal Details</p>
//               <IconBtn
//                 text="Edit"
//                 onClick={() => navigate("/dashboard/settings")}
//                 customClasses="bg-yellow-50 text-richblack-900 px-4 py-1.5 rounded-md hover:scale-95 transition-all"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Column 1 */}
//               <div className="space-y-6">
//                 <DetailItem label="First Name" value={user?.firstName} />
//                 <DetailItem label="Email" value={user?.email} />
//                 <DetailItem label="Gender" value={user?.additionalDetails?.gender || "Add gender"} />
//               </div>

//               {/* Column 2 */}
//               <div className="space-y-6">
//                 <DetailItem label="Last Name" value={user?.lastName} />
//                 <DetailItem
//                   label="Contact Number"
//                   value={user?.additionalDetails?.contactNumber || "Add contact Number"}
//                 />
//                 <DetailItem
//                   label="Date of Birth"
//                   value={user?.additionalDetails?.dateOfBirth || "Add date of Birth"}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable Detail Item Component
// const DetailItem = ({ label, value }) => (
//   <div className="flex flex-col gap-1">
//     <p className="text-sm text-richblack-300">{label}</p>
//     <p className="font-medium text-richblack-5">{value}</p>
//   </div>
// );

// export default MyProfile;


import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-yellow-25">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-yellow-25">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-yellow-25">
            Personal Details
          </p>

          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>


        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-md font-medium text-richblack-400">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-md font-medium text-richblack-400">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-md font-medium text-richblack-400">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-md font-medium text-richblack-400">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-md font-medium text-richblack-400">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-md font-medium text-richblack-400">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}