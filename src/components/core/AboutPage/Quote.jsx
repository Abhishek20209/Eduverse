import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    // <div>
    //   We are passionate about revolutionizing the way we learn. Our innovative platform
    //   <HighlightText text={"combines technology"}/>
    //   <span className='text-brown-500'>
    //     {" "}
    //     expertise
    //   </span>
    //   , and community to create an 
    //   <span  className='text-brown-500'>
    //   {" "}
    //     unparalleled educational experience.
    //   </span>
    // </div>

    <div className="max-w-3xl mx-auto px-4 py-8 text-lg leading-relaxed text-white font-medium">
      We are passionate about revolutionizing the way we learn. Our innovative platform
      <HighlightText text={"combines technology"} />
      <span className="text-amber-600 font-medium">
        {" "}
        expertise
      </span>
      , and community to create an 
      <span className="text-amber-600 font-medium">
        {" "}
        unparalleled educational experience.
      </span>
    </div>
  )
}

export default Quote
