import { useAppSelector } from "@/hooks";
import NewBudget from "./NewBudget";
import { getAllBudgetsSelector } from "@/redux/userDataSlice";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const AllBudgets = () => {
  const allBudgets = useAppSelector(getAllBudgetsSelector);
  return (
    <div className=" w-full mt-4">
      <NewBudget />
      <div className=" overflow-auto">
        <div className="mt-4 text-White text-xl font-semibold">All Budgets</div>
        {allBudgets.length !== 0
          ? allBudgets.map((budget) => {
              return (
                <Link
                  to={`singleBudget/${budget._id}`}
                  className="bg-RichGray hover:bg-DimGray transition-all rounded-lg p-3 w-64 m-4 cursor-pointer font-semibold text-FadedGray  flex justify-between items-center"
                >
                  <div>{dayjs(budget.start).format("DD MMM YYYY")} </div>
                  <div className=" border-x-2 px-1  border-DimGray">to</div>
                  <div>{dayjs(budget.end).format("DD MMM YYYY")}</div>
                </Link>
              );
            })
          : "loading..."}
      </div>
    </div>
  );
};
export default AllBudgets;
