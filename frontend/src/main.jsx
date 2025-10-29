import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout01 from './layout/Layout01';
import Index from './pages/Index';
import App from './App';
import Event from './pages/Evenv';
import Food from './pages/Food';
import Admin from './pages/Admin';

// this code work without backend also.

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/index',
    element: <Layout01 />,
    children: [
      { index: true, element: <Index /> },
      { path: "/index/event", element: <Event /> },
      { path: "/index/food", element: <Food /> },
      { path: "/index/admin", element: <Admin /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
