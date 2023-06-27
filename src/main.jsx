import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import store from './redux/store.jsx';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { Game } from './pages/Game/Game.jsx';
import { socket } from './socket.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/game",
    element: <Game/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
