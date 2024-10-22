import { useState } from 'react';
import { BsPlayCircle } from "react-icons/bs";
import { BsSortDown } from "react-icons/bs";
import { AiOutlineFilter } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from 'react-tailwindcss-datepicker';
import { changeLeadStatus, sortByCreatedDate } from '../redux/slices/projectLead';
import { useDispatch } from 'react-redux';
import AddForm from './AddForm';

interface DateValue {
    startDate: Date;
    endDate: Date;
}

const ProjectLeadsHeader = () => {
    const dispatch = useDispatch();

    // State declarations with proper types
    const [sortOption, setSortOption] = useState<string>("oldest"); // Default to 'oldest'
    const [filterOption, setFilterOption] = useState<string>("All"); // Default to 'New'
    const [showForm, setShowForm] = useState<boolean>(false);
    const [oneWay, setOneWay] = useState<boolean>(true);
    const [value, setValue] = useState<DateValue>({
        startDate: new Date(),
        endDate: new Date(),
    });

    // Event handler for sort change with type annotation
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSortOption(event.target.value);
        dispatch(sortByCreatedDate(event.target.value));
        console.log(`Sorting by: ${event.target.value}`);
    };

    // Event handler for filter change with type annotation
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setFilterOption(event.target.value);
        dispatch(changeLeadStatus(event.target.value));
        console.log(`Filtering by: ${event.target.value}`);
    };

    // Handle add button click (no event, so no need for event types)
    const handleAddButtonClick = (): void => {
        setShowForm(!showForm);
    };

    // Handle modal close (no event, so no need for event types)
    const handleCloseModal = (): void => {
        setShowForm(false);
    };

    // Handle date change with a proper type for `newValue`
    const handleDateChange = (newValue: DateValueType) => {
        if (newValue) {
            setValue(newValue as DateValue);
        } else {
            console.log("Datepicker value is null");
        }
    };

    return (
        <div className="relative bg-gray-50">
            {/* Header */}
            <div className="flex justify-between items-center bg-white border-b-2 border-gray-100 p-4">
                {/* Left Section - Title */}
                <div className="flex items-center space-x-2 ml-8 w-[60%]">
                    <h2 className="text-xl font-semibold text-gray-800">New Project Leads</h2>
                    <BsPlayCircle className="text-teal-500 text-3xl" />
                </div>

                {/* Right Section - Controls */}
                <div className="flex space-x-3 items-center ml-[0%] float-right -mr-5 w-[65%]">
                    {/* Sort by */}
                    <div className="relative flex items-center space-x-2 border rounded-md px-3 py-1 text-gray-500 text-sm">
                        <BsSortDown className="text-lg" />
                        <span>{sortOption === 'latest' ? 'Latest' : 'Oldest'}</span> {/* Dynamically show selected option */}
                        <MdKeyboardArrowDown className="text-lg" />
                        <select
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full bg-white"
                            value={sortOption} // Default value is 'oldest'
                            onChange={handleSortChange}
                        >
                            <option value="latest" className="px-4 py-2">Latest</option>
                            <option value="oldest" className="px-4 py-2">Oldest</option>
                        </select>
                    </div>

                    {/* Filters */}
                    <div className="relative flex items-center space-x-2 border rounded-md px-3 py-1 text-gray-500 text-sm">
                        <AiOutlineFilter className="text-lg" />
                        <span>{filterOption}</span> {/* Dynamically show selected filter */}
                        <MdKeyboardArrowDown className="text-lg" />
                        <select
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full bg-white"
                            value={filterOption} // Default value is 'New'
                            onChange={handleFilterChange}
                        >
                            <option value = "All" disabled>All</option>
                            <option value="New">New</option>
                            <option value="Contact">Contact</option>
                            <option value="UploadScope">Upload Scope</option>
                            <option value="Estimate">Estimate</option>
                            <option value="SignContract">Sign Contract</option>
                            <option value="Payment">Payment</option>
                            <option value="Installation">Installation</option>
                            <option value="Completed">Completed</option>
                            <option value="Feedback">Feedback</option>
                        </select>
                    </div>

                    {/* Datepicker */}
                    <div className="w-[45%]">
                        <Datepicker
                            inputClassName={"w-full border-[1px] border-gray-300 p-0.5 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"}
                            containerClassName=""
                            asSingle={false} // Set to false to show both start and end date
                            primaryColor={"blue"}
                            value={value}
                            showShortcuts={true}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>

                <AddForm />
            </div>
        </div>
    );
};

export default ProjectLeadsHeader;
