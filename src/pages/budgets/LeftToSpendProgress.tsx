import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/hooks";

import { getCurrentBudget } from "@/redux/userDataSlice";

ChartJS.register(ArcElement, Tooltip);

const LeftToSpendProgress = () => {
  const allBudgets = useAppSelector(getCurrentBudget);

  const totalScheduled = allBudgets.categories
    .map((budget) => budget.scheduled)
    .reduce((first, second) => first + second);
  const totalSpent = allBudgets.categories
    .map((budget) => budget.spent)
    .reduce((first, second) => first + second);

  return (
    <Card className="w-[25%]   bg-RichGray ">
      <CardHeader className="mb-5">
        <div className="flex justify-between  ">
          <div>
            {" "}
            <div className="tracking-tight text-White text-2xl font-bold">Limit</div>
            <div className="font-semibold text-DimGray">Spendings By Now </div>
          </div>
        </div>
      </CardHeader>{" "}
      <CardContent className="w-full flex flex-col justify-center items-center">
        <div className="  flex justify-center items-center w-[65%] relative">
          <div className="relative overflow-visible">
            <div className=" w-[180px] h-[180px] bg-DimGray/30 rounded-full flex justify-center items-center">
              <div className="w-[120px] h-[120px] bg-RichGray rounded-full"></div>
            </div>

            <svg
              style={{ position: "absolute", top: 0, left: 0, height: "full" }}
              className="w-[180px] h-[180px] rotate-[-90deg]"
            >
              {" "}
              <circle
                cx={90}
                cy={90}
                r={75}
                strokeLinecap="round"
                fill="none"
                strokeWidth={30}
                stroke="#A5AEFF"
                strokeDashoffset={
                  Math.PI * 75 * 2 -
                  Math.PI *
                    75 *
                    2 *
                    (totalSpent / totalScheduled >= 1 ? 1 : totalSpent / totalScheduled)
                }
                strokeDasharray={Math.PI * 75 * 2}
              ></circle>
            </svg>
          </div>
          <div className=" absolute text-White text-2xl font-bold">
            {((totalSpent / totalScheduled) * 100).toFixed(1)}%
          </div>
        </div>
        <div className=" mt-12  flex  justify-around items-center w-full text-4xl font-semibold text-White ">
          <div className=" flex justify-center  flex-col  items-center hover:bg-DimGray/30 transition-all p-3 rounded-lg">
            <div>
              {totalSpent.toFixed(2)}
              <span className=" text-3xl text-FadedGray font-black">₪</span>
            </div>
            <div className="text-lg text-FadedGray font-bold">spent</div>
          </div>
          <div className=" flex justify-center  flex-col  items-center hover:bg-DimGray/30 transition-all p-3 rounded-lg">
            <div>
              {totalScheduled.toFixed(2)}
              <span className=" text-3xl text-FadedGray font-black">₪</span>
            </div>
            <div className="text-lg text-FadedGray font-bold">Scheduled</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeftToSpendProgress;
