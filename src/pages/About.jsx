import React from 'react'
import HighlightText from "../components/core/HomePage/HighlightText"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import Footer from '../components/common/Footer'
import Quote from '../components/core/AboutPage/Quote'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
  return (
    // <div className='mx-auto mt-[100px] w-11/12 items-center max-w-maxContent text-white'>
    //     <section>
    //     <div>
    //         <header>
    //             Driving Innovation in Online Education for a 
    //             <HighlightText text={"Brighter Future"}/>
    //             <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
    //         </header>
    //         <div className='flex gap-x-3 mx-auto'>
    //             <img src={BannerImage1} />
    //             <img src={BannerImage2} />
    //             <img src={BannerImage3} />
    //         </div>
    //     </div>
    //   </section>

    //   <section>
    //     <div>
    //         <Quote/>
    //     </div>
    //   </section>

    //   <section>
    //     <div className='flex flex-col'>
    //         {/* foudning story wala div */}
    //         <div className='flex '>
    //             {/* founding story left box */}
    //             <div>
    //                 <h1>Our Founding Story</h1>

    //                 <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

    //                 <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
    //             </div>
    //             {/* foudning story right box */}
    //             <div>
    //                 <img  src={FoundingStory} />
    //             </div>
    //         </div>

    //         {/* vision and mission wala parent div */}
    //         <div className='flex'>
    //             {/* left box */}
    //             <div>
    //                 <h1>Our Vision</h1>
    //                 <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
    //             </div>

    //             {/* right box */}
    //             <div>
    //                 <h1>
    //                     Our Mission
    //                 </h1>
    //                 <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
    //             </div>
    //         </div>
    //     </div>
    //   </section>  


    //   <StatsComponent/>  
      
    //   {/* section 5 */}
    //   <section className='mx-auto flex flex-col items-center justify-between gap-5 mb-[140px]'>
    //     <LearningGrid />
    //     <ContactFormSection />
    //   </section>

    //   <section>
    //     <div>
    //         Reviews from other learners
    //         {/* <ReviewSlider /> */}
    //     </div>
    //   </section>

    //   <Footer/>
    // </div>
    <>
    <div className='mx-auto mt-20 w-11/12 max-w-6xl'>
    {/* Hero Section */}
    <section className='mb-24'>
        <div className='flex flex-col md:flex-row gap-12 items-center'>
            <header className='md:w-1/2 space-y-6'>
                <h1 className='text-4xl md:text-5xl font-bold text-richblack-5 leading-tight'>
                    Driving Innovation in Online Education for a 
                    <HighlightText text={"Brighter Future"}/>
                </h1>
                <p className='text-lg text-richblack-300 font-medium  leading-relaxed'>
                    Eduverse is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
            </header>
            <div className='md:w-1/2 flex gap-4 justify-center'>
                <img 
                    src={BannerImage1} 
                    className='w-1/3 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300' 
                    alt="Learning experience"
                />
                <img 
                    src={BannerImage2} 
                    className='w-1/3 rounded-2xl shadow-lg mt-8 hover:scale-105 transition-transform duration-300' 
                    alt="Course preview"
                />
                <img 
                    src={BannerImage3} 
                    className='w-1/3 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300' 
                    alt="Student success"
                />
            </div>
        </div>
    </section>

    {/* Quote Section */}
    <section className='my-14'>
        <div className='bg-richblack-800 rounded-2xl p-8 text-center'>
            <Quote/>
        </div>
    </section>

    {/* Founding Story Section */}
    <section className='my-24'>
        <div className='flex flex-col md:flex-row gap-12 items-center'>
            <div className='md:w-1/2 space-y-6'>
                <h1 className='text-3xl font-semibold text-richblack-5'>Our Founding Story</h1>
                <p className='text-richblack-300 font-medium  leading-relaxed'>
                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                </p>
                <p className='text-richblack-300 font-medium  leading-relaxed'>
                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                </p>
            </div>
            <div className='md:w-1/2'>
                <img 
                    src={FoundingStory} 
                    className='rounded-2xl shadow-xl md:w-[500px]' 
                    alt="Founding story"
                />
            </div>
        </div>
    </section>

    {/* Vision & Mission Section */}
    <section className='my-24'>
        <div className='grid md:grid-cols-2 gap-12'>
            <div className='bg-richblack-800 p-8 rounded-2xl space-y-4'>
                <h1 className='text-3xl font-semibold text-richblack-5'>Our Vision</h1>
                <p className='text-richblack-300 font-medium leading-relaxed'>
                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                </p>
            </div>
            <div className='bg-richblack-800 p-8 font-medium  rounded-2xl space-y-4'>
                <h1 className='text-3xl font-semibold text-richblack-5'>Our Mission</h1>
                <p className='text-richblack-300 leading-relaxed'>
                    Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                </p>
            </div>
        </div>
    </section>

    <StatsComponent/>  

    {/* Learning Grid & Contact Section */}
    <section className='my-24 max-w-7xl mx-auto'>
        <div className='bg-gradient-to-b from-richblack-800 to-richblack-900 p-8 rounded-2xl'>
            <LearningGrid />
            <ContactFormSection />
        </div>
    </section>

    {/* Reviews Section */}
    <section className='my-24'>
        <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-richblack-5 mb-4'>Reviews From Our Learners</h2>
            {/* <ReviewSlider /> */}
            <ReviewSlider/>
        </div>
    </section>

    
</div>
<Footer/>
</>
  )
}

export default About