import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  getAllBudgets,
  getAllBudgetsSelector,
  getBudgetTimeFrameSelector,
} from "@/redux/userDataSlice";
import { budgetInterface } from "@/types";
import axios from "axios";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import Spendings from "./Spendings";
import BudegtsDistribution from "./BudgetsDistribution";

const Budgets = () => {
  // react keeps flagging me this is the problem on line 36
  const allBudgets = useAppSelector(getAllBudgetsSelector);

  const budgetTimeFrame = useAppSelector(getBudgetTimeFrameSelector);
  const dispatch = useAppDispatch();

  const [newBudgetTimeFrame, setNewBudgetTimeFrame] = useState<{
    from: string;
    to: string;
  }>({ from: dayjs().toString(), to: dayjs().add(30, "days").toString() });

  const handleSubmitNewBudget = async () => {
    console.log("test");
    await axios.post(
      `${import.meta.env.VITE_BASE_API}/budgets/new`,
      newBudgetTimeFrame
    );

    dispatch(getAllBudgets());
  };

  return (
    <>
      {allBudgets.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className=" w-full flex justify-between items-center">
            <div>
              {" "}
              <h1 className="  text-White text-4xl font-bold ">Budgets</h1>
              <h4 className="  text-FadedGray text-lg font-semibold mt-2  ">
                Budget from {dayjs(budgetTimeFrame.from).format("DD/MM")} until{" "}
                {dayjs(budgetTimeFrame.to).format("DD/MM")}
              </h4>
            </div>
            <Dialog>
              <DialogTrigger className=" bg-RichGray p-2 px-4 text-White font-semibold text-lg rounded-lg cursor-pointer hover:bg-DimGray transition-all">
                {" "}
                create new budget
              </DialogTrigger>
              <DialogContent className="select-none">
                <DialogHeader>
                  <DialogTitle>Create New Budget</DialogTitle>
                </DialogHeader>
                <div className=" text-DeepGray font-semibold mt-2 text-xl">
                  Select The Time Frame For Your Budget
                </div>
                <div className="w-full flex justify-between gap-2 items-center">
                  <div className="w-full ">
                    <div className="text-md font-semibold text-DeepGray ml-2 mb-2">
                      From
                    </div>
                    <input
                      type="date"
                      value={newBudgetTimeFrame.from}
                      onChange={(e) =>
                        setNewBudgetTimeFrame({
                          ...newBudgetTimeFrame,
                          from: e.target.value,
                        })
                      }
                      className="w-full bg-RichGray hover:bg-DeepGray transition-all font-bold cursor-pointer text-White rounded text-center p-3"
                    />
                  </div>
                  <div className="w-full ">
                    <div className="text-md font-semibold text-DeepGray ml-2 mb-2">
                      To
                    </div>
                    <input
                      type="date"
                      value={newBudgetTimeFrame.to}
                      onChange={(e) =>
                        setNewBudgetTimeFrame({
                          ...newBudgetTimeFrame,
                          to: e.target.value,
                        })
                      }
                      className="w-full bg-RichGray hover:bg-DeepGray transition-all font-bold cursor-pointer text-White rounded text-center p-3"
                    />
                  </div>
                </div>
                <DialogClose
                  onClick={() => {
                    handleSubmitNewBudget();
                  }}
                  className="w-full bg-RichGray hover:bg-DeepGray transition-all font-bold cursor-pointer text-White rounded text-center p-3"
                >
                  Create
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>

          <div className=" mt-10 overflow-auto flex justify-start gap-8 ">
            <Spendings />
            <BudegtsDistribution />
          </div>
        </div>
      )}
    </>
  );
};

export default Budgets;
