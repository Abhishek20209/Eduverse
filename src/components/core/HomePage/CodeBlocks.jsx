import React from 'react'
import CTAButton from "./Button";
import HighlightText from './HighlightText';
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation'


const CodeBlocks = ({
    position,heading,subheading,ctabtn1,ctabtn2, codeblock , backgroundGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 md:flex-col items-center mb-5 z-10 sm:flex-col`}>

        <div className='w-[50%] flex flex-col gap-8 md:mb-4'>
                {heading}

                <div className='text-richblack-300 font-bold'>
                    {subheading}
                </div>

                <div className='flex gap-7 mt-7'>

                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctabtn1.btnText}
                            <FaArrowRightLong/>
                        </div>
                    </CTAButton>


                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    <div className='flex gap-2 items-center'>
                            {ctabtn2.btnText}
                            <FaArrowRightLong/>
                    </div>
                    </CTAButton>

                </div>


        </div>
        

        <div className=' h-fit  flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px]'> 
        {/*HW -> BG gradient*/}

        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>

        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
           <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
           
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }
            omitDeletionAnimation={true}
           />
        </div>

        </div>

        


    </div>
  )
}

export default CodeBlocks