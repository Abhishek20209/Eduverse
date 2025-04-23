import React from 'react'


const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const StatsComponent = () => {
  return (
    // <section>
    //     <div>
    //         <div className='flex gap-x-5'>
    //             {
    //                 Stats.map( (data, index) => {
    //                     return (
    //                         <div key={index}>
    //                             <h1>
    //                                 {data.count}
    //                             </h1>
    //                             <h2>
    //                                 {data.label}
    //                             </h2>
    //                         </div>
    //                     )
    //                 } )
    //             }
    //         </div>
    //     </div>
    // </section>

    <section className="py-16 bg-richblack-900">
        <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {
                    Stats.map( (data, index) => {
                        return (
                            <div 
                                key={index}
                                className="bg-richblack-800 p-6 rounded-xl hover:bg-richblack-700 transition-all duration-300 group"
                            >
                                <div className="space-y-2">
                                    <h1 className="text-3xl md:text-4xl font-bold text-caribbeangreen-400">
                                        {data.count}
                                    </h1>
                                    <h2 className="text-lg font-medium text-richblack-200 group-hover:text-richblack-5 transition-colors">
                                        {data.label}
                                    </h2>
                                </div>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent
