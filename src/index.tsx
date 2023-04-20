import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter, useRouteError } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import App from './App';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import Library from './pages/Library';

import './index.css';
import routes from './routes/routes';
import Wishlist from './pages/Wishlist';

function ErrorBoundary() {
  let error = useRouteError() as any;
  console.error(error);
  return <div>{error.message}</div>;
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createHashRouter([
  {
    path: '',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: routes.HOME,
        element: <Home />,
      },
      {
        path: routes.SEARCH,
        element: <SearchResult />,
      },
      {
        path: routes.LIBRARY,
        element: <Library />,
      },
      {
        path: routes.WISHLIST,
        element: <Wishlist />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
