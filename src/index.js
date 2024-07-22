import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Chapter1 from "./LearningPages/chapter1";
import MusicGame from "./MusicGame/musicGame";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "LearningPages/chapter1",
    element: <Chapter1 />,
  },
  {
    path: "MusicGame/musicGame",
    element: <MusicGame />,
  },
]);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

function startup() {
  const rootElement = document.getElementById("root");
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>
  )
}
startup();

