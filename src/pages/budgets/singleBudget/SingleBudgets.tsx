import { useAppSelector } from "../../../hooks";
import BudegtDistribution from "./BudgetDistribution";
import LeftToSpendProgress from "./LeftToSpendProgress";
import Spendings from "./Spendings";
import {
  getAllBudgetsSelector,
  getCurrentBudget,
  getSingleBudgetByIdSelector,
} from "../../../redux/userDataSlice";
import NewBudget from "../allBudgets/NewBudget";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const SingleBudget = () => {
  const { budgetId } = useParams();
  const budget = useAppSelector((rootState) =>
    getSingleBudgetByIdSelector(rootState, budgetId as string)
  );

  if (!budget) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <h4 className="  text-FadedGray text-lg font-semibold mt-2  ">
          <div>
            Budget from {dayjs(budget.start).format("DD/MM")} until{" "}
            {dayjs(budget.end).format("DD/MM")}
          </div>
        </h4>
      </div>
      <div className=" mt-10 overflow-auto flex justify-start gap-8 ">
        <Spendings />
        <BudegtDistribution />
        <LeftToSpendProgress />
      </div>
    </div>
  );
};

export default SingleBudget;
