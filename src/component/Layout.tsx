// Layout.tsx
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from './Sidebar';


const Layout = () => {
  return (
    <div className='w-[100%] h-screen flex'>
      <div className='w-[18%] h-full'>
        <Sidebar />
      </div>
      <div className='w-[82%] h-full flex flex-col ml-[-3px]'>
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;