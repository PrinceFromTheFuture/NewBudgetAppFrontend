import { useAppSelector } from "@/hooks";
import { getAllBudgetsSelector, getCurrentBudget } from "@/redux/userDataSlice";
import dayjs from "dayjs";
import NewBudget from "./allBudgets/NewBudget";
import { Outlet } from "react-router-dom";

const Budgets = () => {
  // react keeps flagging me this is the problem on line 36
  const allBudgets = useAppSelector(getAllBudgetsSelector);

  return (
    <div>
      <h1 className="  text-White text-4xl font-bold ">Budgets</h1>
      <Outlet />
    </div>
  );
};

export default Budgets;
