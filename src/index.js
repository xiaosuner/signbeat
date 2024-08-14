import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./config/app-router/app-router";

import "./index.css";
import "antd/dist/reset.css";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<RouterProvider router={AppRouter} />);
