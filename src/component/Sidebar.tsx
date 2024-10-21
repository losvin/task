import { LuLayoutDashboard } from "react-icons/lu";
import { WiTime12 } from "react-icons/wi";
import { CiViewList } from "react-icons/ci";
import { BsTextParagraph } from "react-icons/bs";
import { IoReceiptOutline } from "react-icons/io5";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdWorkOutline } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { TbPhoto } from "react-icons/tb";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { TfiStatsUp } from "react-icons/tfi";
import { FaCheckCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white border-r-2 border-gray-100 flex flex-col justify-between">
      <div className="p-4">
        {/* Logo Section */}
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
          <div className="flex flex-col">
            <span className="text-black font-semibold">CONSTRUCTION</span>
            <span className="text-sm text-gray-400">SERVICE</span>
          </div>
        </div>

        {/* Search Box */}
        <div className="relative mb-6">
          <CiSearch className="text-xl text-gray-400 absolute m-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2.5 pl-8 pr-4 text-xs bg-white-100 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* Main Menu */}
        <nav className="flex flex-col space-y-[-1%] py-2">
          <p className="text-xs text-gray-500 mb-3">MAIN MENU</p>

          {menuItems.map((item, index) => (
            <Link to={item.url}>
              <div key={index} className="flex items-center space-x-3 py-2 px-3 rounded-md text-gray-400 hover:text-teal-600 hover:font-bold hover:bg-gray-100 transition cursor-pointer text-lg">
                {item.icon}
                <span className={`text-sm text-gray-400 font-medium hover:text-black ${item.active ? 'text-blue-500' : 'text-gray-700'}`}>
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="flex items-center p-4 justify-between border-t">
        <div className="flex items-center -mt-8">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full mr-2 border-b p-0.5 "
          />
          <div className="text-xs items-center ">
            <div className="flex">
              <p className="text-lg ml-2">Jacob Jones</p>
              <MdOutlineArrowForwardIos className="text-sm ml-8 mt-2" />
            </div>
          </div>
        </div>
        <p className="mt-12 text-sm ml-2 absolute">8:25 AM</p>
        <p className="mt-[5%] ml-2 absolute text-xs text-gray-500">FEB 27, 2022</p>
        <button className="text-gray-500 hover:text-blue-500 mt-[25%]">
          <FaCheckCircle />
        </button>
      </div>
    </div>
  );
};

// Menu items for the sidebar
const menuItems = [
  { label: 'Dashboard', icon: <LuLayoutDashboard />, active: false, url: "/" },
  { label: 'Time Tracking', icon: <WiTime12 />, active: false, url: "/" },
  { label: 'Task List', icon: <CiViewList />, active: false, url: "/" },
  { label: 'Lead Pipeline', icon: <BsTextParagraph />, active: false, url: "/projectLeads" },
  { label: 'Estimates', icon: <IoReceiptOutline />, active: false, url: "/" },
  { label: 'Invoices', icon: <LiaFileInvoiceSolid />, active: false, url: "/" },
  { label: 'Projects', icon: <MdWorkOutline />, active: false, url: "/" },
  { label: 'Schedule', icon: <IoCalendarOutline />, active: false, url: "/" },
  { label: 'Photos & Files', icon: <TbPhoto />, active: false, url: "/" },
  { label: 'Customers', icon: <MdOutlinePeopleAlt />, active: false, url: "/" },
  { label: 'Map', icon: <GrMapLocation />, acitve: false, url: "/" },
  { label: 'Reports', icon: <TfiStatsUp />, active: false, url: "/" },
];


export default Sidebar;
