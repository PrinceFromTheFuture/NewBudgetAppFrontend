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
import Login from "./pages/login/Login.tsx";
import Transactions from "./pages/transactions/Transactions.tsx";
import SingleTransaction from "./pages/singleTransaction/SingleTransaction.tsx";
import EntryPoint from "./EntryPoint.tsx";
import SourcesAndCards from "./pages/sourcesAndCards/SourcesAndCards.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EntryPoint />,
    children: [
      {
        path: "/",
        element: <Root />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/budgets", element: <Budgets /> },
          { path: "/transactions", element: <Transactions /> },
          { path: "/sourcesAndCards", element: <SourcesAndCards /> },
        ],
      },
      {
        path: "/newAction",
        element: <NewAction />,
      },
      {
        path: "/singleTransaction/:transactionId",
        element: <SingleTransaction />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
