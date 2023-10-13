import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import "./App.css";

import { Home } from "./Home";
import { FunctionalApp } from "./Functional/FunctionalApp";
import { ClassApp } from "./Class/ClassApp";
import { Playground } from "./Playground";

const rootElement = document.getElementById("root");

if (rootElement) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/functional",
      element: <FunctionalApp />,
    },
    {
      path: "/class",
      element: <ClassApp />,
    },
    {
      path: "/playground",
      element: <Playground />,
    },
  ]);

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Toaster />
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error('Element with ID "root" not found');
}
