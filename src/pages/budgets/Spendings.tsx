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
import { getAllBudgetsSelector, getCurrentBudget } from "@/redux/userDataSlice";

const Spendings = () => {
  const allBudgets = useAppSelector(getCurrentBudget);
  const ThisBillingCycleSpendings =
    allBudgets.categories.length === 0
      ? null
      : allBudgets.categories
          .map((budget) => budget.scheduled - budget.spent)
          .reduce((first, second) => first + second);
  return (
    <Card className="w-[20%] ">
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
          {allBudgets.categories.map((bugdet) => {
            return (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger className="mb-5 w-full text-left">
                    <div
                      className=" font-semibold text-md mb-1 "
                      style={{ color: bugdet.color }}
                    >
                      {((bugdet.spent / bugdet.scheduled) * 100).toFixed(1)}%{" "}
                      {bugdet.name}{" "}
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
