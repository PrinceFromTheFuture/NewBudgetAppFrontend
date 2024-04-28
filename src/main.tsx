import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./pages/Root.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import { NewAction } from "./pages/newAction/NewAction.tsx";
import Budgets from "./pages/budgets/Budgets.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/budgets", element: <Budgets /> },
    ],
  },
  {
    path: "/newAction",
    element: <NewAction />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
