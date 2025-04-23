import React, { useEffect,useState } from 'react'
import { useForm } from 'react-hook-form';
import countryCode from "../../../data/countrycode.json"
import { apiConnector } from "../../../services/apiconnector"
import { contactusEndpoint } from "../../../services/apis"

const ContactUsForm = () => {

    const [loading,setLoading]=useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors,isSubmitSuccessful},
      } = useForm();
    
    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                contactNumber:""
            })
        }
    },[reset,isSubmitSuccessful]); 

    const submitContactForm = async (data) => {
        // console.log("Form Data - ", data)
        try {
          setLoading(true)
          const res = await apiConnector(
            "POST",
            contactusEndpoint.CONTACT_US_API,
            data
          )
          // console.log("Email Res - ", res)
          setLoading(false)
        } catch (error) {
          console.log("ERROR MESSAGE - ", error.message)
          setLoading(false)
        }
      }

//   return (
//     <form onSubmit={handleSubmit(submitContactForm)}> 
//         <div className='flex flex-col items-center'>

//             <div className='flex flex-col'>
//                 <div className='flex gap-5'>

//                     <div className='flex flex-col'>
//                         <label htmlFor='firstName'>First Name</label>
//                         <input
//                             className='text-black'
//                             type="text"
//                             name="firstName"
//                             id="firstName"
//                             placeholder='Add first name'
//                             {...register("firstName",{required:true})}
//                         />
//                         {
//                             errors.firstName && (
//                                 <span>
//                                     Please Enter Your Name
//                                 </span>
//                             )
//                         }
//                     </div>
                    
                    
//                     <div className='flex flex-col'>
//                         <label htmlFor='lastName'>Last Name</label>
//                         <input
//                             className='text-black'
//                             type="text"
//                             name="lastName"
//                             id="lastName"
//                             placeholder='Add the last name'
//                             {...register("lastName")}
//                         />
//                     </div>

//                 </div>

//                 <div className='flex flex-col'>
//                         <label htmlFor='email'>Email</label>
//                         <input
//                             className='text-black'
//                             type="email"
//                             name="email"
//                             id="email"
//                             placeholder='Enter your email'
//                             {...register("email",{required:true})}
//                         />
//                         {
//                             errors.email&&(
//                                 <span>
//                                     Please Enter Your Email
//                                 </span>
//                             )
//                         }
//                 </div>
                 
//                 <div className='flex flex-col my-5'>
                        

//                         <div className='flex w-[15%] gap-5'>
                            
//                             <label htmlFor='contactNumber'>Phone No</label>

//                             <diV className="text-black flex lg:w-[80px] gap-5">
//                                 <select
//                                     name="dropdown"
//                                     id="dropdown"
//                                     {...register("countrycode",{required:true})}
//                                 >
//                                     {
//                                        countryCode.map((element,index)=>{
//                                             return(
//                                                 <option key={index} value={element.code}>
//                                                     {element.code} --{element.country}
//                                                 </option>
//                                             )
//                                        }) 
//                                     }
//                                 </select>
//                             </diV>


//                             <div className='w-[80%]'>
//                                 <input
//                                     type="number"
//                                     name="contactNumber"
//                                     id="phoennumber"
//                                     className='text-black'
//                                     placeholder='12345 67890'
//                                     {...register("contactNumber",
//                                         {require:{value:true,message:"Please enter Phone Number"},
//                                          maxLength:{value:10,message:"Invalid Phone Number"},
//                                          minLength:{value:10,message:"Invalid Phone Number"}
//                                         })}
//                                 />
//                             </div>
//                         </div>
//                         {
//                             errors.contactNumber &&(
//                                 <span>
//                                     {errors.contactNumber.message}
//                                 </span>
//                             )
//                         }

//                 </div>
                
//                 <div className='flex flex-col'>
//                     <label htmlFor='message'>Message</label>
//                     <textarea
//                         className='text-black'
//                         name="message"
//                         id="message"
//                         cols="30"
//                         rows="7"
//                         placeholder='Enter yur message here'
//                         {...register("message",{required:true})}
//                     />
//                     {
//                         errors.message&&(
//                             <span>
//                                 Please enter your message
//                             </span>
//                         )
//                     }
//                 </div>

//                 <button type="submit">Send Message</button>

//             </div>
//         </div>


//     </form>
//   )

return (
    <form onSubmit={handleSubmit(submitContactForm)} className="bg-[#0F1114] p-8 rounded-xl shadow-lg max-w-md mx-auto space-y-6 border border-gray-700">
        {/* <h2 className="text-3xl font-bold text-center  text-white">Get in Touch</h2>
        <p className="text-center text-2xl font-bold text-richblack-25">We'd love to hear from you, please fill out this form.</p>
         */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-black '>
            <div className='flex flex-col'>
                <label htmlFor='firstName' className='text-gray-300 font-medium mb-1 text-richblack-25'>First Name</label>
                <input
                    className='border border-gray-600 rounded-lg px-4 py-3 text-black font-medium bg-gray-800 focus:ring-2 focus:ring-yellow-500 outline-none shadow-sm'
                    type='text'
                    id='firstName'

                    placeholder='Enter first name'
                    {...register("firstName", { required: true })}
                />
                {errors.firstName && <span className='text-richblack-25 text-sm'>Please enter your first name</span>}
            </div>
            
            <div className='flex flex-col'>
                <label htmlFor='lastName' className='text-richblack-25 font-medium mb-1 '>Last Name</label>
                <input
                    className='border border-gray-600 rounded-lg text-black px-4 py-3 font-medium bg-gray-800 focus:ring-2 focus:ring-yellow-500 outline-none shadow-sm'
                    type='text'
                    id='lastName'
                    name="lastName"
                    placeholder='Enter last name'
                    {...register("lastName")}
                />
            </div>
        </div>

        <div className='flex flex-col'>
            <label htmlFor='email' className='text-richblack-25 font-medium mb-1'>Email Address</label>
            <input
                className='border border-gray-600 font-medium rounded-lg px-4 py-3 text-black bg-gray-800 focus:ring-2 focus:ring-yellow-500 outline-none shadow-sm'
                type='email'
                id='email'
                placeholder='Enter email address'
                {...register("email", { required: true })}
            />
            {errors.email && <span className='text-red-500 text-sm'>Please enter your email</span>}
        </div>
        
        <div className='flex flex-col'>
        <label htmlFor='contactNumber' className='text-gray-300 font-medium mb-1 text-richblack-25'>Phone Number</label>
        <div className='flex  items-stretch gap-2'>
        <select
            className='border border-gray-600 font-medium rounded-lg px-4 py-3 text-black bg-gray-800 focus:ring-2 focus:ring-yellow-500 outline-none shadow-sm w-32 hover:border-gray-500 transition-colors'
            {...register("countrycode", { required: true })}
        >
            {countryCode.map((element, index) => (
                <option key={index} value={element.code} className='bg-gray-800 font-medium text-black'>
                    {element.code} -{element.country}
                </option>
            ))}
        </select>
        <input
            type='tel'
            name="contactNumber"
            id='contactNumber'
            className='border border-gray-600 rounded-lg px-4 py-3 text-black bg-gray-800 flex-1 font-medium focus:ring-2 focus:ring-yellow-500 outline-none shadow-sm hover:border-gray-500 transition-colors'
            placeholder='12345 67890'
            pattern='[0-9]{10}'
            {...register("contactNumber", {
                required: { value: true, message: "Please enter phone number" },
                maxLength: { value: 10, message: "Invalid phone number" },
                minLength: { value: 10, message: "Invalid phone number" }
            })}
        />
    </div>
    {errors.contactNumber && <span className='text-red-500 text-sm'>{errors.contactNumber.message}</span>}

</div>
        
        <div className='flex flex-col'>
            <label htmlFor='message' className='text-gray-300 font-medium mb-1 text-richblack-25'>Message</label>
            <textarea
                className='border border-gray-600 rounded-lg px-4 py-3 font-medium text-black bg-gray-800 focus:ring-2 focus:ring-yellow-500 outline-none shadow-sm'
                id='message'
                rows='5'
                placeholder='Enter your message here...'
                {...register("message", { required: true })}
            />
            {errors.message && <span className='text-red-500 text-sm'>Please enter your message</span>}
        </div>
        
        <button type='submit' className='mt-6 w-full bg-yellow-100 text-black py-3 rounded-lg hover:bg-yellow-50 transition font-semibold text-lg shadow-md'>
            Send Message
        </button>
    </form>
);
}

export default ContactUsForm