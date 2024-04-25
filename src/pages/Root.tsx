import { cn } from "@/lib/utils";
import { Outlet, useLocation, Link } from "react-router-dom";

function Root() {
  const location = useLocation();

  const routes: { path: string; iconPath: string; name: string }[] = [
    { path: "/", iconPath: "3", name: "Home" },
    { path: "/dashboard", iconPath: "3", name: "Dashboard" },
    { path: "/newAction", iconPath: "3", name: "New Action" },
    { path: "/users", iconPath: "3", name: "Users" },
  ];
  return (
    <div className=" w-full h-[100vh] flex justify-between items-center bg-DeepGray  select-none overflow-hidden ">
      <div className="w-[16%]  h-full  border-r-2 border-RichGray px-5 text-FadedGray flex justify-center items-center flex-col  py-14 gap-4">
        {routes.map((route) => {
          return (
            <Link
              to={route.path}
              className={cn(
                "bg-RichGray w-full rounded h-12 flex justify-start p-3 items-center text-lg font-semibold text-FadedGray hover:bg-DimGray transition-all",
                location.pathname == route.path && "bg-DimGray"
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
