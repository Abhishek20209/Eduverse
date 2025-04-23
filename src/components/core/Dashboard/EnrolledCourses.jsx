// import React from 'react'
// import { useSelector } from 'react-redux'
// import {getUserEnrolledCourses} from '../../../services/operations/profileAPI';
// import ProgressBar from "@ramonak/react-progress-bar";
// import { useState,useEffect } from 'react';
// const EnrolledCourses = () => {

//     const {token}=useSelector((state)=>state.auth);

//     const [enrolledCourses,setEnrolledCourses]=useState(null);

//     const getEnrolledCourses=async()=>{
//         try{

//             const response=await getUserEnrolledCourses(token);
//             setEnrolledCourses(response);
            
//         }
//         catch(error){
//             console.log("unable to fetch enrolled courses details")
//         }
//     }

//     useEffect(()=>{
//         getEnrolledCourses();
//     },[]);


//   return (
//     <div className='text-white p-6 bg-gray-900 rounded-lg shadow-lg'>
//             <div className='text-2xl font-semibold mb-4'>
//                 Enrolled Courses
//             </div>

//             {!enrolledCourses ? (
//                 <div className='text-center text-gray-400'>Loading...</div>
//             ) : (
//                 !enrolledCourses.length ? (
//                     <p className='text-gray-400'>You have not enrolled in any course yet</p>
//                 ) : (
//                     <div>
//                         <div className='grid grid-cols-3 text-gray-300 font-medium border-b pb-2 mb-4 border-gray-700'>
//                             <p>Course</p>
//                             <p>Duration</p>
//                             <p>Progress</p>
//                         </div>
//                         {enrolledCourses.map((course, index) => (
//                             <div key={index} className='flex items-center gap-4 p-4 border-b border-gray-800'>
//                                 <img src={course.thumbnail} alt={course.courseName} className='w-16 h-16 rounded-lg object-cover' />
//                                 <div className='flex-1'>
//                                     <p className='text-lg font-semibold'>{course.courseName}</p>
//                                     <p className='text-sm text-gray-400'>{course.courseDescription}</p>
//                                 </div>
//                                 <div className='text-gray-300'>{course?.totalDuration}</div>
//                                 <div className='w-1/3'>
//                                     <p className='text-sm text-gray-300 mb-1'>Progress: {course?.progressPercentage || 0}%</p>
//                                     <ProgressBar completed={course?.progressPercentage || 0} 
//                                         height="8px"
//                                         isLabelVisible={false}
//                                         bgColor="#4CAF50"
//                                         baseBgColor="#333"
//                                     />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )
//             )}
//         </div>
//   )
// }

// export default EnrolledCourses;


import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUserEnrolledCourses(token) // Getting all the published and the drafted courses

        // Filtering the published course out
        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
        // console.log(
        //   "Viewing all the couse that is Published",
        //   filterPublishCourse
        // )

        console.log("enrolled courses",filterPublishCourse);
        setEnrolledCourses(filterPublishCourse)
      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
