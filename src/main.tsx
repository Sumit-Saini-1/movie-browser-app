import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorPage from './error-page.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/index.tsx';
import Favorites from './pages/Favorites/index.tsx';
import MovieDetail from './pages/MovieDetail/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path: "/favorite",
        element: <Favorites />
      },
      {
        path: "/detail",
        element: <MovieDetail/>
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
