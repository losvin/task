import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './component/Layout';
import ProjectLeadPage from './pages/projectLead';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout is used as a wrapper
    children: [
      {
        index: true, 
        element: <h1>Home Page</h1>
      },
      {
        path: "projectLeads",
        element: <ProjectLeadPage />
      },
      {
        path: "temp",
        element: <h1>Temp Page</h1>
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
