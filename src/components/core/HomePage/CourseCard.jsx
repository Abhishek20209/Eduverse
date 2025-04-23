
import React from 'react';
import { FaBookOpen, FaSignal } from 'react-icons/fa';






const CourseCard = ({ cardData, currentCard, setCurrentCard}) => {


    const isActive = currentCard === cardData.heading;

    return (
        <div 
            className={`cursor-pointer p-6  shadow-lg transition-all duration-300
                ${isActive ? 'bg-blue-500 from-blue-500 to-purple-600 scale-105 border-blue-700 shadow-[10px_0_20px_-5px_rgba(255,223,0,0.75)]' : 'bg-[#161D29] text-[#6E727F] hover:bg-gray-700 border-gray-600'}`} 
            onClick={() => setCurrentCard(cardData.heading)}
        >
            <h3 className="text-xl` text-white font-bold mb-2">{cardData.heading}</h3>
            <p className={`text-md mb-4 ${isActive ? 'text-white' : 'text-[#6E727F]'} `}>{cardData.description}</p>
             <div className="flex justify-between items-center text-sm font-medium">
             <span className="flex items-center gap-2 bg-gray-700 text-gray-200 px-4 py-1 rounded-full whitespace-nowrap">
                    <FaSignal className="shrink-0" /> {cardData.level}
                </span>
                <span className="flex items-center gap-2 bg-gray-700 text-gray-200 px-4 py-1 rounded-full whitespace-nowrap">
                    <FaBookOpen className="shrink-0" /> {cardData.lessionNumber} Lessons
                </span>
             </div>
        </div>
    );
};

export default CourseCard;







