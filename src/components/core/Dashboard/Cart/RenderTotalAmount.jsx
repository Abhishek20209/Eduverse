// import React from 'react'
// import { useSelector } from 'react-redux'
// import IconBtn from '../../../common/IconBtn'

// const RenderTotalAmount = () => {

//     const {total,cart}=useSelector((state)=>state.cart)

//     const handleBuyCourse=()=>{
        
//         const courses=cart.map((course)=>course._id);
//         console.log("Bought these courses",courses);

//         //APT INTEGRATION OF PAYMENT GATEWAY
//     }

//   return (
//     // <div>
//     //     <p>Total:</p>

//     //     <p>Rs: {total}</p>

//     //     <IconBtn
//     //         text="Buy Now"
//     //         onClick={handleBuyCourse}
//     //         customClasses={"w-full justify center "}
//     //     />
//     // </div>

//     <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center">
//         <p className="text-xl font-semibold text-gray-300">Total:</p>
//         <p className="text-3xl font-bold text-green-400">Rs: {total}</p>
//         <IconBtn
//             text="Buy Now"
//             onClick={handleBuyCourse}
//             customClasses="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4 transition-all text-center"
//         />
//     </div>
//   )
// }

// export default RenderTotalAmount


import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI"
import IconBtn from "../../../common/IconBtn"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    BuyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}
