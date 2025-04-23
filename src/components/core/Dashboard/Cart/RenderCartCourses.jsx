// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { IoIosStarOutline } from "react-icons/io";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import ReactStars from 'react-stars';



// const RenderCartCourses = () => {

//     const {cart,removeFromCart}=useSelector((state)=>state.cart);
//     const dispatch=useDispatch()

//   return (

//     // <div>
//     //     {
//     //         cart.map((course,index)=>(
//     //             <div>
//     //                 <div>
//     //                     <img src={course?.thumbnail} />
//     //                     <div>
//     //                         <p>{course?.courseName}</p>
//     //                         <p>{course?.category?.name}</p>
//     //                         <div>
//     //                             <span>4.8</span>
//     //                             <ReactStars
//     //                                 count={5}
//     //                                 size={20}
//     //                                 edit={false}
//     //                                 activeColor="#ffd700"
//     //                                 emptyIcon={<IoIosStarOutline/>}
//     //                                 fullIcon={<IoIosStarOutline/>}
//     //                             />
//     //                             <span>{course?.ratingAndReviews?.length} Ratings</span>

//     //                         </div>
//     //                     </div>
//     //                 </div>

//     //                 <div>
//     //                     <button
//     //                         onClick={()=>dispatch(removeFromCart(course._id))}
//     //                     >
//     //                         <RiDeleteBin6Line/>
//     //                         <span>Remove</span>
//     //                     </button>

//     //                     <p>{course?.price}</p>
//     //                 </div>
//     //             </div>
//     //         ))
//     //     }
//     // </div>

//     <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
//             {cart.map((course, index) => (
//                 <div 
//                     key={index} 
//                     className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all mb-4"
//                 >
//                     <div className="flex items-center gap-4">
//                         <img 
//                             src={course?.thumbnail} 
//                             alt={course?.courseName} 
//                             className="w-24 h-24 rounded-lg object-cover border border-gray-700"
//                         />
//                         <div>
//                             <p className="text-lg font-semibold">{course?.courseName}</p>
//                             <p className="text-sm text-gray-400">{course?.category?.name}</p>
//                             <div className="flex items-center gap-2 text-gray-400 text-sm">
//                                 <span className="text-yellow-400 font-bold">4.8</span>
//                                 <ReactStars
//                                     count={5}
//                                     size={20}
//                                     edit={false}
//                                     activeColor="#ffd700"
//                                     emptyIcon={<IoIosStarOutline />}
//                                     fullIcon={<IoIosStarOutline />}
//                                 />
//                                 <span>{course?.ratingAndReviews?.length} Ratings</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex flex-col items-end">
//                         <button
//                             onClick={() => dispatch(removeFromCart(course._id))}
//                             className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-all text-sm font-medium"
//                         >
//                             <RiDeleteBin6Line className="text-lg" />
//                             <span>Remove</span>
//                         </button>
//                         <p className="text-lg font-semibold text-green-400">${course?.price}</p>
//                     </div>
//                 </div>
//             ))}
//     </div>
//   )
// }

// export default RenderCartCourses


import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
// import ReactStars from "react-rating-stars-component"
import ReactStars from 'react-stars';
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  return (
    <div className="flex flex-1 flex-col">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${indx !== 0 && "mt-6"} `}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="h-[148px] w-[220px] rounded-lg object-cover"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-richblack-5">
                {course?.courseName}
              </p>
              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-5">4.5</span>
                <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-richblack-400">
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-3xl font-medium text-yellow-100">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
