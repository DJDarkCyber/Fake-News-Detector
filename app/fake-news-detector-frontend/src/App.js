import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Home from './components/home';
import NewsQuiz from './components/newsquiz';
import CheckByTitle from './components/checkbytitle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/newsquiz',
    element: <NewsQuiz />,
  },

  {
    path: '/checkbytitle',
    element: <CheckByTitle />,
  }
]);

function App() {

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
