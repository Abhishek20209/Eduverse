// import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { useState } from 'react';
// import {getUserEnrolledCourses} from '../../../services/operations/profileAPI';
// import { RiDeleteBin2Fill } from "react-icons/ri";
// import { MdEdit } from "react-icons/md";
// import { useSelector } from 'react-redux'



// //Instructort ke courses
// const MyCourses = () => {

//     const {token}=useSelector((state)=>state.auth);

//     const [courseCreated,setCourseCreated]=useState(null);

//     const getCoursesCreated=async()=>{
//         try{

//             const response=await getUserEnrolledCourses(token);

//             setCourseCreated(response);

//         }
//         catch(error){
//             console.log("error while calling the getEnrolled Courses for instructor ",error);
//         }
//     }



//     useEffect(()=>{
//         getCoursesCreated();
//     },[]);

    


//   return (

//     // <div>
//     //     <div>
//     //         My Courses
//     //     </div>

//     //     {!courseCreated ? (
//     //                     <div className='text-center text-gray-400'>Loading...</div>
//     //                 ) : (
//     //                     !courseCreated.length ? (
//     //                         <p className='text-gray-400'>You have not enrolled in any course yet</p>
//     //                     ) : (
//     //                         <div>
//     //                             <div className='grid grid-cols-3 text-gray-300 font-medium border-b pb-2 mb-4 border-gray-700'>
//     //                                 <p>Course</p>
//     //                                 <p>Duration</p>
//     //                                 <p>Price</p>
//     //                                 <p>Actions</p>
//     //                             </div>
//     //                             {courseCreated.map((course, index) => (
//     //                                 <div key={index} className='flex items-center gap-4 p-4 border-b border-gray-800'>
//     //                                     <img src={course.thumbnail} alt={course.courseName} className='w-16 h-16 rounded-lg object-cover' />
//     //                                     <div className='flex-1'>
//     //                                         <p className='text-lg font-semibold'>{course.courseName}</p>
//     //                                         <p className='text-sm text-gray-400'>{course.courseDescription}</p>

//     //                                     </div>
//     //                                     <div className='text-gray-300'>{course?.totalDuration}</div>
//     //                                     <div className=''>{course?.price}</div>

//     //                                     <div className='flex flex-row justify-between'>
//     //                                         <RiDeleteBin2Fill />
//     //                                         <MdEdit />
//     //                                     </div>

//     //                                 </div>
//     //                             ))}
//     //                         </div>
//     //                     )
//     //                 )}

//     // </div>

//     <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold mb-6">My Courses</h2>

//             {!courseCreated ? (
//                 <div className="text-center text-gray-400 text-lg">Loading...</div>
//             ) : !courseCreated.length ? (
//                 <p className="text-gray-400 text-lg">You have not enrolled in any course yet.</p>
//             ) : (
//                 <div>
//                     <div className="grid grid-cols-4 text-gray-300 font-medium border-b pb-2 mb-4 border-gray-700 text-lg">
//                         <p>Course</p>
//                         <p>Duration</p>
//                         <p>Price</p>
//                         <p className="text-center">Actions</p>
//                     </div>
//                     {courseCreated.map((course, index) => (
//                         <div 
//                             key={index} 
//                             className="flex items-center gap-6 p-4 border-b border-gray-800 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
//                         >
//                             <img 
//                                 src={course.thumbnail} 
//                                 alt={course.courseName} 
//                                 className="w-20 h-20 rounded-lg object-cover border border-gray-700"
//                             />
//                             <div className="flex-1">
//                                 <p className="text-lg font-semibold">{course.courseName}</p>
//                                 <p className="text-sm text-gray-400">{course.courseDescription}</p>
//                             </div>
//                             <div className="text-gray-300 text-lg">{course?.totalDuration}</div>
//                             <div className="text-lg font-medium text-green-400">${course?.price}</div>

//                             <div className="flex gap-4 text-xl text-gray-400 hover:text-white">
//                                 <button className="hover:text-red-500">
//                                     <RiDeleteBin2Fill />
//                                 </button>
//                                 <button className="hover:text-blue-400">
//                                     <MdEdit />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//   )
// }

// export default MyCourses


import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}