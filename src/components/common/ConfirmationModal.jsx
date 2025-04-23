import React from 'react'
import IconBtn from './IconBtn'

// const ConfirmationModal = ({modalData}) => {
//   return (
//     <div className='text-white'>
//         <div>
//             <p>
//                 {modalData.text1}
//             </p>

//             <p>
//                 {modalData.text2}
//             </p>

//             <div>
//                 <IconBtn
//                     onclick={modalData?.btn1Handler}
//                     text={modalData?.btn1Text} 
//                 />

//                 <button>
//                     onClick={modalData?.bt2Handler}
//                     text={modalData?.btn2Text}
//                 </button>
//             </div>

            
//         </div>
//     </div>
//   )
// }

const ConfirmationModal = ({ modalData }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        {/* Modal Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          {/* Modal Content */}
          <p className="text-lg font-semibold text-gray-800 text-center">
            {modalData.text1}
          </p>
  
          <p className="text-sm text-richblack-600 text-center mt-2">
            {modalData.text2}
          </p>
  
          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            {/* Confirm Button */}
            <button
              onClick={modalData?.btn1Handler}
              className="bg-pink-600 hover:bg-pink-800 text-white font-medium py-2 px-4 rounded-md transition"
            >
              {modalData?.btn1Text || "Logout"}
            </button>
  
            {/* Cancel Button */}
            <button
              onClick={modalData?.btn2Handler}
              className="bg-caribbeangreen-400 hover:bg-caribbeangreen-600 text-richblack-100 font-medium py-2 px-4 rounded-md transition"
            >
              {modalData?.btn2Text || "Cancel"}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmationModal;
