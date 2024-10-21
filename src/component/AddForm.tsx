import { useState } from "react";
import { createNewLead } from "../redux/slices/projectLead";
import { useDispatch } from "react-redux";
const AddForm = () => {
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState<boolean>(false);
    const handleAddButtonClick = (): void => {
        setShowForm(!showForm);
    };
    const handleCloseModal = (): void => {
        setShowForm(false);
    };
    return(
        <> 
            <button
                    onClick={handleAddButtonClick}
                    className="flex items-center space-x-1 px-4 py-1 text-teal-400 border border-teal-400 rounded-md hover:bg-teal-600 hover:text-white mr-[3%] ml-[3%]"
                >
                    <span className="text-lg">+</span>
                    <span className="text-sm mt-0.5">ADD</span>
                </button>

            {showForm && (
                <>
                    {/* Background Blur */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                        onClick={handleCloseModal} // Close the modal when clicking outside the form
                    />

                    {/* Form Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white border border-gray-500 rounded-lg p-6 w-full max-w-lg mx-auto relative">
                            {/* Close Button */}
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>

                            {/* Row 1: Email and Phone */}
                            <div className="flex space-x-4 mb-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="example@email.com"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="(907) 555-0101"
                                    />
                                </div>
                            </div>
                            {/* Row 2: Dropdown and Name */}
                            <div className="flex space-x-4 mb-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Lead Name</label>
                                    <input
                                        type="name"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Select Status</label>
                                    <select className="dropdown menu dropdown-content bg-white z-[1] p-2 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-500 sm:text-sm">
                                        <option value="new">New</option>
                                        <option value="contact">Contact</option>
                                        <option value="upload">Upload Scope</option>
                                        <option value="estimate">Estimate</option>
                                        <option value="sign-contract">Sign Contract</option>
                                        <option value="payment">Payment</option>
                                        <option value="installation">Installation</option>
                                        <option value="completed">Completed</option>
                                        <option value="feedback">Feedback</option>
                                    </select>
                                </div>
                            </div>

                            {/* Row 3: Addrss */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="4517 Washington Ave. Manchester, Kentucky 39495"
                                />
                            </div>

                            <button className='btn btn-primary w-full'>Submit</button>
                        </div>
                    </div>
                </>
            )}    
        </>
    )
}

export default AddForm;