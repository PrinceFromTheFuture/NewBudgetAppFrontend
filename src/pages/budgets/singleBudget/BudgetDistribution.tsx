import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { useAppSelector } from "../../../hooks";

import { getCurrentBudget } from "../../../redux/userDataSlice";

ChartJS.register(ArcElement, Tooltip);

const BudegtDistribution = () => {
  const allBudgets = useAppSelector(getCurrentBudget);

  const data = {
    labels: allBudgets.categories.map((budget) => budget.name),
    datasets: [
      {
        label: "Budget",
        data: allBudgets.categories.map((budget) => budget.scheduled),
        backgroundColor: allBudgets.categories.map((budget) => budget.color),
        borderWidth: 0,
        hoverOffset: 0,
      },
    ],
  };

  const totalBudget = allBudgets.categories
    .map((budget) => budget.scheduled)
    .reduce((first, second) => first + second);
  const options = {};

  return (
    <Card className="w-[25%]   bg-RichGray ">
      <CardHeader className="mb-5">
        <div className="flex justify-between  ">
          <div>
            {" "}
            <div className="tracking-tight text-White text-2xl font-bold">
              Budget
            </div>
            <div className="font-semibold text-DimGray">
              Scheduled budget disterbution{" "}
            </div>
          </div>
        </div>
      </CardHeader>{" "}
      <CardContent className="w-full flex flex-col justify-center items-center">
        <div className="  flex justify-center items-center w-[65%] relative">
          <Doughnut options={options} data={data}></Doughnut>
          <div className=" absolute text-White text-2xl font-semibold">
            {totalBudget}₪
          </div>
        </div>
        <div className=" mt-12  flex flex-wrap w-full ">
          {allBudgets.categories.map((budget) => {
            return (
              <div className="text-White w-1/2 flex justify-between items-center mb-3">
                <div className="flex justify-start items-center">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: budget.color }}
                  ></div>
                  <div className="ml-3 font-semibold">
                    {budget.name.length > 7
                      ? budget.name.substring(0, 7) + "..."
                      : budget.name}
                  </div>
                </div>
                <div className=" mr-6 text-DimGray font-semibold">
                  {" "}
                  {budget.scheduled.toFixed(2)}₪
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudegtDistribution;
