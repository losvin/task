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
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { useDispatch } from 'react-redux';
import { changeLeadStatus } from '../redux/slices/projectLead';

import { FaCheck} from 'react-icons/fa';

const ProgressTracker = () => {
    const [currentStep, setCurrentStep] = useState<number | null>(null); // No default step selected
    const dispatch = useDispatch();

    const statusCount = useSelector((state: RootState) => state.projectLeads.statusCount);
    const count = useSelector((state: RootState) => state.projectLeads.count);

    const handleStatusChange = (index: number): void => {
        setCurrentStep(index); // Update the current step
        dispatch(changeLeadStatus(steps[index].value)); // Dispatch action with the step's value
        console.log(`Changing status to: ${steps[index].value}`);
    };

    const steps = [
        { icon: <MdWorkOutline />, percentage: "100%", days: "3 DAYS", description: "New", value: "New" },
        { icon: <IoCallOutline />, percentage: "70%", days: "12 DAYS", description: "Contact", value: "Contact" },
        { icon: <IoCalendarOutline />, percentage: "30%", days: "3 DAYS", description: "Upload Scope", value: "UploadScope" },
        { icon: <IoReceiptOutline />, percentage: "40%", days: "3 DAYS", description: "Estimate", value: "Estimate" },
        { icon: <PiPencilSimpleLineLight />, percentage: "20%", days: "9 DAYS", description: "Sign Contract", value: "SignContract" },
        { icon: <FaRedo />, percentage: "20%", days: "8 DAYS", description: "Payment", value: "Payment" },
        { icon: <TbMailPause />, percentage: "10%", days: "5 DAYS", description: "Installation", value: "Installation" },
        { icon: <FaCheck />, percentage: "10%", days: "8 DAYS", description: "Completed", value: "Completed" },
        { icon: <FaRegThumbsUp />, percentage: "10%", days: "8 DAYS", description: "Feedback", value: "Feedback" },
    ];

    return (
        <div className="container border-b-2 ">
            {/* Step Labels */}
            <div className="step-labels  flex flex-row text-xs text-gray-500  justify-between w-[85%] ml-[9%] mt-[2%] space-x-5">
                {steps.map((step, index) => (
                    <p 
                        key={index} 
                        onClick={() => handleStatusChange(index)}
                        role="button"
                        className={`p-2 ${currentStep === index ? 'font-bold text-blue-500' : 'text-gray-500'}`}
                    >
                        {step.description}
                    </p>
                ))}
            </div>
   
            {/* Steps with Icons and Status Count */}
            <div className="arrow-steps clearfix flex ml-[6%] mt-[-1%]">
    {steps.map((step, index) => (
        <div
            key={index}
            className={`step p-5 ${currentStep === index ? 'current' : ''}`}
        >
            <div className='flex justify-between ml-2'>
                {step.icon}
                <span className={`text-xs mr-3 font-bold ${currentStep === index ? 'text-white' : 'text-black'}`}>
                    {statusCount[index]}
                </span>
            </div>
        </div>
    ))}
</div>



            {/* Percentage and Days */}
            <div className="step-labels flex flex-row text-gray-700 justify-around w-[85%] ml-[8%] mt-[1%] space-x-5 cursor-pointer">
                {steps.map((step, index) => (
                    <p key={index} className={`p-2 ${currentStep === index ? 'font-bold text-blue-500' : ''}`}>
                        <span className='text-black text-sm font-bold'>{step.percentage}</span>
                        <span className='ml-1.5 text-gray-500 text-xs'>{step.days}</span>
                    </p>
                ))}
            </div>

            {/* Footer */}
            <div className="footer flex justify-between items-center mt-[2%] mb-2">
                <span className="text-gray-500 text-xs ml-[6%]">{`${count} Total Leads`}</span>
                
            </div>
        </div>
    );
};

export default ProgressTracker;
