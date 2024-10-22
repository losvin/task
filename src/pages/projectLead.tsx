import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeads } from '../redux/slices/projectLead';// Adjust the import based on your folder structure
import ProgressTracker from '../component/ProgressTracker';
import ProjectCard from '../component/ProjectCard';
import ProjectLeadsHeader from '../component/ProjectLeadsHeader';
import { AppDispatch } from '../redux/store';

// Define the types for the Redux state
interface RootState {
  projectLeads: {
    filteredLeads: {
      id: string;
      name: string;
      email: string;
      phone: string;
      address: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    }[];
    loading: boolean;
    error: string | null;
  };
}

function ProjectLeadPage() {
  const dispatch : AppDispatch = useDispatch();
  
  
  const { filteredLeads:filteredLeads , loading, error } = useSelector((state: RootState) => state.projectLeads);

  console.log("Lead", filteredLeads);

  
  useEffect(() => {
    console.log("Hello Vinay");
    dispatch(fetchLeads());
  }, [dispatch]);

  return (
    <>
      <ProjectLeadsHeader />
      <div className="flex-none">
      <ProgressTracker />
    </div>
      
      {/* Show loading state */}
      {loading && <p>Loading leads...</p>}
      
      {/* Show error message if there's an error */}
      {error && <p className='text-red-500'>{error}</p>}
      
      <div className='flex-grow justify-items-center overflow-y-scroll bg-gray-50 items-center'>
        {filteredLeads.map((lead) => (
          <ProjectCard 
            key={lead.id} 
            lead={lead} // Pass lead data to ProjectCard
          />
        ))}
      </div>
    </>
  );
}

export default ProjectLeadPage;
