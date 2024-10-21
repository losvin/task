import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewLead } from "../redux/slices/projectLead";
import { AppDispatch } from "../redux/store";

interface LeadFormValues {
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
}

const AddForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [showForm, setShowForm] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<LeadFormValues>({
        name: "",
        email: "",
        phone: "",
        address: "",
        status: "New",
    });
    const [errors, setErrors] = useState<Partial<LeadFormValues>>({});

    const handleAddButtonClick = (): void => {
        setShowForm(!showForm);
    };

    const handleCloseModal = (): void => {
        setShowForm(false);
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<LeadFormValues> = {};

        if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!formValues.phone || !/^\d{10}$/.test(formValues.phone)) {
            newErrors.phone = "Please enter a valid 10-digit phone number.";
        }
        if (!formValues.name) {
            newErrors.name = "Name is required.";
        }
        if (!formValues.address) {
            newErrors.address = "Address is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (): void => {
        if (validateForm()) {
            dispatch(createNewLead(formValues));
            setFormValues({
                name: "",
                email: "",
                phone: "",
                address: "",
                status: "New",
            }); // Reset the form to initial state
            setShowForm(false);
        }
    };
    

    return (
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
                        onClick={handleCloseModal}
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

                            {/* Form Fields */}
                            <div className="flex space-x-4 mb-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                        placeholder="example@email.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formValues.phone}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                        placeholder="(907) 555-0101"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                                </div>
                            </div>

                            <div className="flex space-x-4 mb-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Lead Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Select Status</label>
                                    <select
                                        name="status"
                                        value={formValues.status}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                    >
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
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formValues.address}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                    placeholder="4517 Washington Ave. Manchester, Kentucky 39495"
                                />
                                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                            </div>

                            <button
                                className="btn btn-primary w-full"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default AddForm;
