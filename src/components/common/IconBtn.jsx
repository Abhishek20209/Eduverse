import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    customClasses,
    type
}) => {
  return (  
    <button
        className='font-medium text-xl text-yellow-50 flex gap-x-2'
        disabled={disabled}
        onClick={onclick}
        type={type}
    >

        {children ? (
                <>
                    <span>{text}</span>
                    {children}
                </>
            ) : 
                (text )
        }
    </button>
  )
}

export default IconBtn