import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/hooks";
import { getAllBudgetsSelector } from "@/redux/userDataSlice";
import React from "react";

const Spendings = () => {
  const allBudgets = useAppSelector(getAllBudgetsSelector);
  const ThisBillingCycleSpendings =
    allBudgets.length === 0
      ? null
      : allBudgets
          .map((budget) => budget.scheduled - budget.spent)
          .reduce((first, second) => first + second);
  return (
    <Card className="w-[20%] h-fit">
      <CardHeader>
        <CardTitle>Spendings </CardTitle>
        <CardDescription className=" text-DimGray">
          Spendings This Billing Cycle
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full text-White">
        <div className=" w-full  text-4xl font-extrabold">
          ₪ {ThisBillingCycleSpendings!.toFixed(2)}
        </div>
        <div className="text-FadedGray text-md font-semibold mt-1 ">
          {" "}
          left to Spend This Month
        </div>
        <div className="mt-7  flex justify-start items-start flex-col ">
          {allBudgets.map((bugdet) => {
            return (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger className="mb-5 w-full text-left">
                    <div
                      className=" font-semibold text-md mb-1 "
                      style={{ color: bugdet.color }}
                    >
                      {(bugdet.spent / bugdet.scheduled) * 100}% {bugdet.name}{" "}
                      {bugdet.spent / bugdet.scheduled > 1 && "!!!"}
                    </div>
                    <div className="w-full h-2 bg-DimGray rounded-full">
                      <div
                        className=" h-2 rounded-full w-full bg-Orange"
                        style={{
                          backgroundColor: bugdet.color,
                          width: `${
                            (bugdet.spent / bugdet.scheduled) * 100 <= 100
                              ? (bugdet.spent / bugdet.scheduled) * 100
                              : 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={-170}>
                    <div className="font-semibold">{bugdet.name}</div>
                    <div>
                      Scheduled:{" "}
                      <span className=" font-semibold">
                        {bugdet.scheduled.toFixed(2)}₪
                      </span>
                    </div>

                    <div>
                      Spent By now:{" "}
                      <span className=" font-semibold">
                        {bugdet.spent.toFixed(2)}₪
                      </span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default Spendings;
