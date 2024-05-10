import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/hooks";
import { getAllTransactionsSelector } from "@/redux/actionsSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllBudgetsSelector, getCurrentBudget } from "@/redux/userDataSlice";
import { actionInteface } from "@/types";
import { useState } from "react";
import dayjs from "dayjs";

ChartJS.register(ArcElement, Tooltip);

const Chart = () => {
  const [TimeFrame, setTimeFrame] = useState<string>("today");
  const allActions = useAppSelector(getAllTransactionsSelector);
  const budgets = useAppSelector(getCurrentBudget);
  const chartBudgets: { name: string; amountSpent: number; color: string }[] =
    [];

  const options = {};

  const findRealBudgetFromAction = (action: actionInteface) => {
    const budgetFound = budgets.categories.find(
      (budget) => budget.name === action.budget
    );
    if (!budgetFound) {
      return budgets[0];
    }
    return budgetFound;
  };

  const OnlyOutcomesActions = allActions.filter(
    (action) => action.type === "outcome"
  );

  let timeFramesOnlyOutcomesActions = OnlyOutcomesActions;
  if (TimeFrame === "today") {
    timeFramesOnlyOutcomesActions = timeFramesOnlyOutcomesActions.filter(
      (action) => {
        if (dayjs(action.date).isSame(dayjs().toString(), "day") === true) {
          return action;
        } else {
          return;
        }
      }
    );
  }

  for (let i = 0; i < timeFramesOnlyOutcomesActions.length; i++) {
    if (i === 0) {
      chartBudgets.push({
        name: findRealBudgetFromAction(timeFramesOnlyOutcomesActions[i]).name,
        amountSpent: timeFramesOnlyOutcomesActions[i].amount,
        color: findRealBudgetFromAction(timeFramesOnlyOutcomesActions[i]).color,
      });
    } else {
      const actionBudget = chartBudgets.find(
        (budget) => budget.name === timeFramesOnlyOutcomesActions[i].budget
      );
      if (!actionBudget) {
        chartBudgets.push({
          name: findRealBudgetFromAction(timeFramesOnlyOutcomesActions[i]).name,
          amountSpent: timeFramesOnlyOutcomesActions[i].amount,
          color: findRealBudgetFromAction(timeFramesOnlyOutcomesActions[i])
            .color,
        });
      } else {
        chartBudgets.find(
          (budget) => budget.name === timeFramesOnlyOutcomesActions[i].budget
        )!.amountSpent += timeFramesOnlyOutcomesActions[i].amount;
      }
    }
  }

  const data = {
    labels: chartBudgets.map((budget) => budget.name),
    datasets: [
      {
        label: "Budget",
        data: chartBudgets.map((budget) => budget.amountSpent),
        backgroundColor: chartBudgets.map((budget) => budget.color),
        borderWidth: 0,
        hoverOffset: 0,
      },
    ],
  };
  let totalSpent: number = 0;
  for (let i = 0; i < chartBudgets.length; i++) {
    totalSpent += chartBudgets[i].amountSpent;
  }

  return (
    <Card className="w-[30%]  bg-RichGray ">
      <CardHeader className="mb-5">
        <div className="flex justify-between  ">
          <div>
            {" "}
            <div className="tracking-tight text-White text-2xl font-bold">
              Activity
            </div>
            <div className="font-semibold text-DimGray">
              Money Spent by By Budget
            </div>
          </div>
          <Select
            defaultValue="today"
            onValueChange={(value) => setTimeFrame(value)}
          >
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Select View" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="lastBillingCycle">
                  Last Billing Cycle
                </SelectItem>
                <SelectItem value="today">Today</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>{" "}
      <CardContent className="w-full flex flex-col justify-center items-center">
        <div className="  flex justify-center items-center w-[50%] relative">
          <Doughnut options={options} data={data}></Doughnut>
          <div className=" absolute text-White text-2xl font-semibold">
            {totalSpent}₪
          </div>
        </div>
        <div className=" mt-12  flex flex-wrap w-full ">
          {chartBudgets.map((budget) => {
            return (
              <div className="text-White w-1/2 flex justify-between items-center mb-3">
                <div className="flex justify-start items-center">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: budget.color }}
                  ></div>
                  <div className="ml-3 font-semibold">
                    {budget.name.length > 10
                      ? budget.name.substring(0, 10) + "..."
                      : budget.name}
                  </div>
                </div>
                <div className=" mr-6 text-DimGray font-semibold">
                  {" "}
                  {budget.amountSpent.toFixed(2)}₪
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default Chart;
