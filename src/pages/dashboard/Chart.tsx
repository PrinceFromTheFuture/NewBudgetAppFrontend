import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/hooks";
import { getAllActions } from "@/redux/actionsSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

ChartJS.register(ArcElement);

const Chart = () => {
  const allActions = useAppSelector(getAllActions);

  const options = {};

  let allBudgets: { name: string; amount: number; color: string }[] = [];

  for (let i = 0; i < allActions.length; i++) {
    if (i === 0) {
      allBudgets.push({
        name: allActions[i].budget.name,
        amount: allActions[i].amount,
        color: allActions[i].budget.color,
      });
    } else {
      const actionBudget = allBudgets.find(
        (budget) => budget.name === allActions[i].budget.name
      );
      if (!actionBudget) {
        allBudgets.push({
          name: allActions[i].budget.name,
          amount: allActions[i].amount,
          color: allActions[i].budget.color,
        });
      } else {
        allBudgets.find(
          (budget) => budget.name === allActions[i].budget.name
        )!.amount += allActions[i].amount;
      }
    }
  }

  const data = {
    labels: allBudgets.map((budget) => budget.name),
    datasets: [
      {
        label: "Budget",
        data: allBudgets.map((budget) => budget.amount),
        backgroundColor: allBudgets.map((budget) => budget.color),
        borderWidth: 0,
        hoverOffset: 0,
      },
    ],
  };

  console.log(allBudgets);

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
          <Select>
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
        <div className="  flex justify-center items-center w-[50%]">
          <Doughnut options={options} data={data}></Doughnut>
        </div>
        <div className=" mt-12  flex flex-wrap w-full ">
          {allBudgets.map((budget) => {
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
                  {budget.amount}₪
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
