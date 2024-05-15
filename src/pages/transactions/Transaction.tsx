import { actionInteface } from "@/types";
import ArrowDown from "./ArrowDown";
import ArrowUp from "./ArrowUp";
import { useAppSelector } from "@/hooks";
import { getCurrentBudget } from "@/redux/userDataSlice";
import dayjs from "dayjs";

const Transaction = ({ transaction }: { transaction: actionInteface }) => {
  const cuurentBudget = useAppSelector(getCurrentBudget);

  return (
    <div className=" w-full h-14 hover:bg-RichGray cursor-pointer rounded-lg transition-all  mb-2 ">
      <div className="flex justify-between items-center  h-full">
        <div className="w-[5%] flex justify-center items-center ">
          {" "}
          <div
            className="p-2 rounded-xl"
            style={{
              backgroundColor:
                transaction.type === "outcome" ? "rgba(210,121,121,0.1)" : "rgba(101,173,130,0.1)",
            }}
          >
            {" "}
            {transaction.type === "outcome" ? <ArrowDown /> : <ArrowUp />}
          </div>
        </div>
        <div className=" w-[20%]  h-full flex justify-start items-center font-heebo font-semibold text-White text-lg">
          {transaction.title}
        </div>
        <div className=" w-[20%]  h-full flex justify-start items-center font-heebo font-semibold text-FadedGray text-lg">
          {dayjs(transaction.date).format("DD/MM HH:mm")}
        </div>

        <div className=" w-[20%]  h-full flex justify-start items-center font-heebo font-medium text-FadedGray text-sm shadow-sm">
          <div
            className="p-1 px-2 rounded-md"
            style={{
              backgroundColor: cuurentBudget.categories.find(
                (budget) => budget.name === transaction.budget
              )?.color,
            }}
          >
            {transaction.budget}
          </div>
        </div>
        <div className=" w-[20%]  h-full flex justify-start items-center font-heebo font-semibold text-FadedGray text-lg">
          {transaction.amount}₪
        </div>
        <div className=" w-[20%]  h-full flex justify-start items-center font-heebo font-semibold text-FadedGray text-lg">
          {transaction.source}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
