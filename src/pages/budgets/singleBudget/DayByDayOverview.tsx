import { useAppSelector } from "@/hooks";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { useRef, useState } from "react";
import { getCurrentBudget, getSingleBudgetByIdSelector } from "@/redux/userDataSlice";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { getAllTransactionsSelector } from "@/redux/transactionsSlice";
import { actionInteface } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import Transaction from "@/pages/transactions/Transaction";

interface BudgetDay {
  date: string;
  transactions: actionInteface[];
  totalAmountSpent: number;
}

const DayByDayOverview = () => {
  const previous7Days = useRef<HTMLButtonElement>(null);
  const next7Days = useRef<HTMLButtonElement>(null);
  const { budgetId } = useParams();
  const budget = useAppSelector((rootState) =>
    getSingleBudgetByIdSelector(rootState, budgetId as string)
  );
  const allTransactions = useAppSelector(getAllTransactionsSelector);

  let budgetDay = dayjs(budget.start);
  const budgetEndDate = dayjs(budget.end);
  let allBudgetDays: BudgetDay[] = [];

  while (budgetDay.isBefore(budgetEndDate.add(1, "day"))) {
    const allTransactionsMadeInThisDay = allTransactions.filter((transaction) =>
      dayjs(transaction.date).isSame(budgetDay, "day")
    );

    allBudgetDays.push({
      date: budgetDay.utc().format(),
      transactions: allTransactionsMadeInThisDay,
      totalAmountSpent: allTransactionsMadeInThisDay
        .map((transaction) => transaction.amount)
        .reduce((a, b) => a + b, 0),
    });
    budgetDay = budgetDay.add(1, "day");
  }
  interface DisplayBudgetDay extends BudgetDay {
    BarHightPercentage: number;
  }
  let daysSlice7: { weekIndex: number; days: DisplayBudgetDay[] }[] = [];

  for (let i = 0; i <= allBudgetDays.length; ) {
    const daysSpendings = allBudgetDays
      .slice(i, i + 7)
      .map((budgetDay) => budgetDay.totalAmountSpent);
    const highestSpendingsDayInTheWeek = Math.max(...daysSpendings);
    const weekAmountDevider = highestSpendingsDayInTheWeek / 100;

    daysSlice7.push({
      days: allBudgetDays.slice(i, i + 7).map((day) => {
        return {
          ...day,
          BarHightPercentage:
            day.totalAmountSpent / weekAmountDevider > 3
              ? day.totalAmountSpent / weekAmountDevider
              : 3,
        };
      }),
      weekIndex: i / 7 + 1,
    });
    i += 7;
  }

  const [selectedDate, setSelctedDate] = useState(daysSlice7[0].days[1].date);

  return (
    <div>
      {" "}
      <div className="w-[90%]  flex justify-between  items-center mt-5">
        <div className=" bg-RichGray rounded-xl flex flex-col items-start justify-between p-6 h-[500px]   w-full max-w-[70%]">
          <div className="w-full flex justify-between items-start mb-7">
            <div className="mt-2 ml-4">
              <div className="text-FadedGray font-medium mb-3">Time frame</div>
              <div className="text-White font-bold text-4xl  ">
                {dayjs(budget.start).format("DD.MM")} - {dayjs(budget.end).format("DD.MM")}
                {", "}
                {dayjs(budget.end).format("YYYY")}
              </div>
            </div>
            <div
              className=" w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-DimGray/20 hover:bg-DimGray transition-all cursor-pointer"
              onClick={() => next7Days.current && next7Days.current.click()}
            >
              <ArrowRight color="#ffffff" />
            </div>
          </div>
          <div className=" flex justify-center items-center h-full w-full">
            <Carousel className=" w-full  m-0 p-0 h-full" opts={{ align: "start", loop: true }}>
              <CarouselPrevious className="hidden absolute " ref={previous7Days} />
              <div className="w-full h-full ">
                <CarouselContent className=" w-full  m-0 p-0 h-full ">
                  {daysSlice7.map((weekSlice) => {
                    return (
                      <CarouselItem className="m-0 p-0  h-full" key={weekSlice.weekIndex}>
                        <div className=" w-full h-full flex justify-between items-end gap-7">
                          {weekSlice.days.map((day, index) => {
                            return (
                              <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                  <div className="h-full w-full flex flex-col justify-end items-center">
                                    <TooltipTrigger
                                      onClick={() => setSelctedDate(day.date)}
                                      className="bg-DimGray/50 rounded-xl w-full hover:bg-Purple transition-all     duration-100 hover:shadow-2xl hover:scale-[1.01] "
                                      style={{
                                        height: `${day.BarHightPercentage}%`,
                                        backgroundColor:
                                          day.date === selectedDate ? "rgb(165 174 255)" : "",
                                      }}
                                    ></TooltipTrigger>{" "}
                                    <div className="w-min text-FadedGray font-semibold mt-3">
                                      {dayjs(day.date).format("ddd")}
                                    </div>
                                  </div>

                                  <TooltipContent
                                    side="top"
                                    align="center"
                                    sideOffset={day.BarHightPercentage > 80 ? -80 : 20}
                                  >
                                    <div> {day.totalAmountSpent.toFixed(2)}₪ </div>
                                    {dayjs(day.date).format("ddd DD/MM")}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            );
                          })}
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </div>
              <CarouselNext className="hidden absolute" ref={next7Days} />
            </Carousel>
          </div>
        </div>
        <div className=" bg-RichGray rounded-xl p-3 gap-4 w-[28%] h-[500px]">
          <h1 className="text-xl text-FadedGray font-semibold ml-6 mt-3 mb-3">Date</h1>
          <div className=" w-full flex justify-center items-center">
            <Calendar
              mode="single"
              selected={dayjs(selectedDate).toDate()}
              defaultMonth={dayjs(selectedDate).toDate()}
              className=" p-0"
            />
          </div>
          <div className=" w-full justify-center flex-col flex items-center mt-4 ">
            <div className=" text-FadedGray font-medium tracking-wide">Total spent this day</div>
            <div className="text-4xl font-bold text-White">
              {allTransactions
                .filter((transaction) => dayjs(transaction.date).isSame(dayjs(selectedDate), "day"))
                .map((transaction) => transaction.amount)
                .reduce((a, b) => a + b, 0)
                .toFixed(2)}
              ₪
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90%] mt-5 min-h-32">
        {allTransactions
          .filter((transaction) => dayjs(transaction.date).isSame(dayjs(selectedDate), "day"))
          .map((transaction) => (
            <Transaction transaction={transaction} />
          ))}
      </div>
    </div>
  );
};

export default DayByDayOverview;
