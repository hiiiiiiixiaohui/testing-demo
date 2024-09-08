import React from "react";
import ReactDOM from "react-dom/client";
import "./mock";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Demo from "./pages/Demo";
import Test from "./pages/Test";

const rootElement = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/demo",
    element: <Demo />,
    loader: async () => {
      const data = await axios.get("/api/tablelist");
      return data?.data?.data || [];
    },
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider
        router={router}
        fallbackElement={<div className="loading">loading...</div>}
      />
    </React.StrictMode>
  );
}

reportWebVitals();
