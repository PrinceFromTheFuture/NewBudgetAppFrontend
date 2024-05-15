import { useAppSelector } from "@/hooks";
import { getAllBudgetsSelector, getCurrentBudget } from "@/redux/userDataSlice";
import dayjs from "dayjs";
import Spendings from "./Spendings";
import BudegtsDistribution from "./BudgetsDistribution";
import NewBudget from "./NewBudget";
import LeftToSpendProgress from "./LeftToSpendProgress";

const Budgets = () => {
  // react keeps flagging me this is the problem on line 36
  const allBudgets = useAppSelector(getAllBudgetsSelector);

  const budget = useAppSelector(getCurrentBudget);

  return (
    <div>
      <div className=" w-full flex justify-between items-center">
        <div>
          {" "}
          <h1 className="  text-White text-4xl font-bold ">Budgets</h1>
          <h4 className="  text-FadedGray text-lg font-semibold mt-2  ">
            {allBudgets.length > 0 && (
              <div>
                Budget from {dayjs(budget.start).format("DD/MM")} until{" "}
                {dayjs(budget.end).format("DD/MM")}
              </div>
            )}
          </h4>
        </div>
        <NewBudget />
      </div>

      {allBudgets.length > 0 ? (
        <div className=" mt-10 overflow-auto flex justify-start gap-8 ">
          <Spendings />
          <BudegtsDistribution />
          <LeftToSpendProgress />
        </div>
      ) : (
        <div className="text-White">you dont have any budgets yet...</div>
      )}
    </div>
  );
};

export default Budgets;
