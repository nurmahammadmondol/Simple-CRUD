import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import User from './Components/User.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Update from './Components/Update.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
  },
  {
    path: '/Users',
    element: <User></User>,
  },
  {
    path: '/Update/:id',
    element: <Update></Update>,
    loader: ({ params }) => fetch(`http://localhost:3000/info/${params.id}`),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
