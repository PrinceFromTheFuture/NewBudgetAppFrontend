import ArrowDown from "@/components/ArrowDown";
import ArrowUp from "@/components/ArrowUp";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/hooks";
import { getAllTransactionsSelector } from "@/redux/transactionsSlice";
import { getCurrentBudget } from "@/redux/userDataSlice";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import DeleteTransaction from "./DeleteTransaction";
import EditTransaction from "./EditTransaction";

const SingleTransaction = () => {
  const allTransactions = useAppSelector(getAllTransactionsSelector);
  const navigate = useNavigate();
  const { transactionId } = useParams();

  const currentBudget = useAppSelector(getCurrentBudget);
  if (allTransactions.length === 0 || !currentBudget) {
    return (
      <div className=" bg-DeepGray fixed right-0 top-0 bottom-0 left-0  text-White  ">
        loading...
      </div>
    );
  }
  const singleTransaction = allTransactions.find(
    (transction) => transction._id === transactionId
  )!;

  return (
    <div className="transition-all fixed right-0 top-0 bottom-0 left-0 bg-DeepGray overflow-hidden text-White  flex flex-col justify-between items-center p-20 select-none ">
      <div
        onClick={() => navigate(-1)}
        className="bg-RichGray text-FadedGray p-3 rounded-lg text-lg font-semibold absolute top-8 left-8 cursor-pointer"
      >
        {" "}
        back
      </div>
      <div className="border-[3px]   border-RichGray h-full w-1/2 rounded-2xl p-14 flex justify-start items-center flex-col relative min-w-min">
        <DeleteTransaction />
        <EditTransaction />
        <div
          className="absolute rounded-lg top-[-20px]  w-[175px] h-[40px]"
          style={{
            backgroundColor: currentBudget.categories.find(
              (category) => category.name === singleTransaction.budgetCategory
            )?.color,
          }}
        ></div>
        <div className="mb-8 flex flex-col justify-center items-center">
          {" "}
          <div className="  text-6xl font-extrabold text-White  mb-2 flex justify-center items-end   gap-2">
            <div> ₪{singleTransaction.amount.toFixed(2)} </div>{" "}
            <div
              className="p-2 rounded-xl h-min"
              style={{
                backgroundColor:
                  singleTransaction.type === "outcome"
                    ? "rgba(210,121,121,0.1)"
                    : "rgba(101,173,130,0.1)",
              }}
            >
              {" "}
              {singleTransaction.type === "outcome" ? (
                <ArrowDown />
              ) : (
                <ArrowUp />
              )}
            </div>
          </div>
          <div className=" text-2xl  text-FadedGray font-bold mb-4">
            {singleTransaction.title}
          </div>
        </div>
        <div className="flex justify-start gap-5 h-[9.5rem]">
          <Card className="w-min ">
            <CardHeader>
              {" "}
              <div className="  ">
                {" "}
                <div className="tracking-tight text-White text-2xl font-bold">
                  Date
                </div>
                <div className="font-semibold text-DimGray">
                  What Date your transaction occur
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={dayjs(singleTransaction.date).toDate()}
                defaultMonth={dayjs(singleTransaction.date).toDate()}
                className=" p-0"
              />
            </CardContent>
          </Card>
          <div>
            {" "}
            <Card className="w-min">
              <CardHeader>
                {" "}
                <div>
                  <div className="tracking-tight text-White text-2xl font-bold">
                    Time
                  </div>
                  <div className="font-semibold text-DimGray">
                    When did your transaction occur
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className=" text-3xl text-FadedGray font-medium bg-DeepGray rounded-2xl p-8">
                  {dayjs(singleTransaction.date).format("HH:mm")}
                </div>
              </CardContent>
            </Card>
            <div
              className="mt-5 h-full rounded-3xl flex justify-center items-center text-White font-bold text-3xl "
              style={{
                backgroundColor: currentBudget.categories.find(
                  (category) =>
                    category.name === singleTransaction.budgetCategory
                )?.color,
              }}
            >
              {singleTransaction.budgetCategory}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTransaction;
