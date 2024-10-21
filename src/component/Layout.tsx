// Layout.tsx
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from './Sidebar';


const Layout = () => {
  return (
    <div className='w-[100%] flex'>
      <div className='w-[18%]'>
        <Sidebar />
      </div>
      <div className='w-[82%] ml-[-3px]'>
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
