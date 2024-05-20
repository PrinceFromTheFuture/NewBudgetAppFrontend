import { useAppDispatch } from "@/hooks";
import { cn } from "@/lib/utils";
import { getAllTransactions } from "@/redux/transactionsSlice";
import { getAllBudgets, getAllSources, login } from "@/redux/userDataSlice";
import axios from "axios";
import { useEffect } from "react";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";

function Root() {
  const navigate = useNavigate();

  const location = useLocation();
  const routes: { path: string; iconPath: string; name: string }[] = [
    { path: "/", iconPath: "3", name: "Home" },
    { path: "/transactions", iconPath: "3", name: "Transactions" },

    { path: "/dashboard", iconPath: "3", name: "Dashboard" },
    { path: "/newAction", iconPath: "3", name: "New Action" },
    { path: "/budgets", iconPath: "3", name: "Budgets" },
    { path: "/sourcesAndCards", iconPath: "3", name: "sources And Cards" },
  ];

  return (
    <div className=" w-full h-[100vh] flex justify-between items-center bg-DeepGray  select-none overflow-hidden ">
      <div className="w-[16%]  h-full  border-r-2 border-RichGray px-5 text-FadedGray flex justify-center items-center flex-col  py-14 gap-4">
        <div
          className="cursor-pointer flex-end w-full  bg-RichGray p-2 flex justify-center items-center rounded-md font-semibold"
          onClick={async () => {
            const respose = await axios.get(
              `${import.meta.env.VITE_BASE_API}/auth/logout`,
              {
                withCredentials: true,
              }
            );
            if ((respose.status = 200)) {
              navigate("/login");
            }
          }}
        >
          Log Out
        </div>

        {routes.map((route) => {
          return (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                " w-full rounded h-12 flex justify-start p-3 items-center text-lg font-semibold text-FadedGray hover:bg-RichGray transition-all",
                location.pathname == route.path && "bg-RichGray"
              )}
            >
              {route.name}
            </Link>
          );
        })}
      </div>
      <div className="w-full  h-full pt-14 px-12">
        <div className=" w-full h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Root;
