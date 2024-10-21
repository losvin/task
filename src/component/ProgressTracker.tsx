import { useState } from 'react';
import { SlHandbag } from "react-icons/sl";
import { MdWorkOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoReceiptOutline } from "react-icons/io5";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { TbMailPause } from "react-icons/tb";
import { FaRedo } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";

import { FaCheck} from 'react-icons/fa';

const ProgressTracker = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { icon: <MdWorkOutline/>, label: "200", percentage: "100%", days: "3 DAYS", description: "New" },
        { icon: <IoCallOutline/>, label: "50", percentage: "70%", days: "12 DAYS", description: "Contact" },
        { icon: <IoCalendarOutline/>, label: "30", percentage: "30%", days: "3 DAYS", description: "Upload Scope" },
        { icon: <IoReceiptOutline/>, label: "12", percentage: "40%", days: "3 DAYS", description: "Estimate" },
        { icon: <PiPencilSimpleLineLight />, label: "15", percentage: "20%", days: "9 DAYS", description: "Sign Contract" },
        { icon: <FaRedo/>, label: "2", percentage: "20%", days: "8 DAYS", description: "Payment" },
        { icon: <TbMailPause/>, label: "8", percentage: "10%", days: "5 DAYS", description: "Installation" },
        { icon: <FaCheck />, label: "10", percentage: "10%", days: "8 DAYS", description: "Completed" },
        { icon: <FaRegThumbsUp/>, label: "30", percentage: "10%", days: "8 DAYS", description: "Feedback" }
    ];

    return (
        <div className="container border-b-2">
            <div className="wrapper cursor-pointer">
                {/* Labels for each step */}
                <div className="step-labels flex flex-row text-xs text-gray-500  justify-between stify-around  w-[93%] ml-[10%] mt-[2%] space-x-10 ">
                    {steps.map((step, index) => (
                        <p key={index} className={`p-2 ${currentStep === index ? 'font-bold text-blue-500' : ''}`}>
                            {step.description}
                        </p>
                    ))}
                </div>
                {/* Steps with icons and labels */}
                <div className="arrow-steps clearfix flex ml-[6%] mt-[-1%]">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`step p-5 ${currentStep === index ? 'current' : ''} ${currentStep > index ? 'done' : ''}`}
                        >
                           <div className='flex justify-between ml-2  text-black'> {step.icon} <span className='text-xs mr-3 font-bold text-black'>{step.label}</span></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="step-labels flex flex-row text-gray-700 justify-around  w-[85%] ml-[8%] mt-[1%] space-x-5 cursor-pointer">
                    {steps.map((step, index) => (
                        <p key={index} className={`p-2 ${currentStep === index ? 'font-bold text-blue-500' : ''}`}>
                           <span className='text-black text-sm font-bold'> {step.percentage} </span> <span className='ml-0 text-gray-500 text-xs'> {step.days} </span>
                        </p>
                    ))}
                </div>

            {/* Footer - Active Leads and Completed */}
            <div className="footer flex justify-between items-center mt-[2%] mb-2">
                <span className="text-gray-500 text-xs ml-[6%]">120 Active Leads</span>
                <div className="flex items-center space-x-2 text-gray-500 text-xs font-bold mr-[4%]">
                    <FaCheck />
                    <span>COMPLETED (10)</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressTracker;
