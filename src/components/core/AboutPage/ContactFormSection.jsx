import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto lg:my-40'>
        <h2 className="text-3xl font-bold text-center  text-white">Get in Touch</h2>
        <p className="text-center text-2xl font-bold text-richblack-25">We'd love to hear from you, please fill out this form.</p>
        <div>
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactFormSection