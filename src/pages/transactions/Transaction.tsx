import { actionInteface } from "@/types";
import ArrowDown from "../../components/ArrowDown";
import ArrowUp from "../../components/ArrowUp";
import { useAppSelector } from "@/hooks";
import { getAllSourcesSelector, getCurrentBudget } from "@/redux/userDataSlice";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const Transaction = ({ transaction }: { transaction: actionInteface }) => {
  const cuurentBudget = useAppSelector(getCurrentBudget);
  const allSources = useAppSelector(getAllSourcesSelector);

  const transactionSourceName = allSources.find(
    (source) => source._id === transaction.source
  )!.name;
  const updatedTransaction: actionInteface = { ...transaction, source: transactionSourceName };
  if (!updatedTransaction) {
    return <div>laoding...</div>;
  }

  return (
    <Link to={`/singleTransaction/${updatedTransaction._id}`}>
      <div className=" w-full h-14 hover:bg-RichGray cursor-pointer rounded-lg transition-all  mb-2 ">
        <div className="flex justify-between items-center  h-full">
          <div className="w-[5%] flex justify-center items-center ">
            {" "}
            <div
              className="p-2 rounded-xl"
              style={{
                backgroundColor:
                  updatedTransaction.type === "outcome"
                    ? "rgba(210,121,121,0.1)"
                    : "rgba(101,173,130,0.1)",
              }}
            >
              {" "}
              {updatedTransaction.type === "outcome" ? <ArrowDown /> : <ArrowUp />}
            </div>
          </div>
          <div className=" w-[20%]  h-full flex justify-start items-center font-heebo font-semibold text-White text-lg">
            {updatedTransaction.title.length > 20
              ? "..." + updatedTransaction.title.substring(0, 20)
              : updatedTransaction.title}
          </div>
          <div className=" w-[20%]  h-full flex justify-start items-center font-heebo font-semibold text-FadedGray text-lg">
            {dayjs(updatedTransaction.date).format("DD/MM HH:mm")}
          </div>

          <div className=" w-[20%]  h-full flex justify-start items-center font-heebo font-semibold text-FadedGray  text-lg shadow-sm">
            <div
              className=" h-8 mr-2 w-2 rounded-md "
              style={{
                backgroundColor: cuurentBudget.categories.find(
                  (budget) => budget.name === updatedTransaction.budgetCategory
                )?.color,
              }}
            ></div>
            {updatedTransaction.budgetCategory}
          </div>
          <div className=" w-[20%]  h-full flex justify-start items-center font-heebo font-semibold text-FadedGray text-lg">
            {updatedTransaction.amount}₪
          </div>
          <div className=" w-[20%]  h-full flex justify-start items-center font-heebo font-semibold text-FadedGray text-lg">
            {updatedTransaction.source}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Transaction;
