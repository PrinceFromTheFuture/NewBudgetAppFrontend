import { useAppSelector } from "@/hooks";
import { getAllTransactionsSelector } from "@/redux/actionsSlice";
import Transaction from "./Transaction";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import useSortingTransactions from "./useSortingTransactions";
const Transactions = () => {
  const allTransactions = useAppSelector(getAllTransactionsSelector);

  const [maxActionsInPage, setMaxActionsInPage] = useState(10);
  const [maxPages, setMaxPages] = useState(
    allTransactions.length % maxActionsInPage > 0
      ? Number((allTransactions.length / maxActionsInPage).toString()[0]) + 1
      : allTransactions.length / maxActionsInPage
  );

  const [currentPage, setCurrentPage] = useState(1);

  const handleNextActionsPage = () => {
    if (currentPage + 1 <= maxPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handleActionsInPageChange = (items: string) => {
    setCurrentPage(1);
    const ActionsInPages = Number(items);
    setMaxPages(
      allTransactions.length % ActionsInPages > 0
        ? Number((allTransactions.length / ActionsInPages).toString()[0]) + 1
        : allTransactions.length / ActionsInPages
    );

    setMaxActionsInPage(ActionsInPages);
  };

  const { sortedTransactions, handleChangeSortedTransctions } = useSortingTransactions();

  const TempTrigers = () => {
    return (
      <div className="bg-RichGray flex justify-between items-center w-[10%] text-White">
        <div
          onClick={() => {
            if (currentPage - 1 > 0) {
              setCurrentPage((prev) => prev - 1);
            }
          }}
          className="p-3 cursor-pointer"
        >
          prev
        </div>
        <div>{currentPage}</div>

        <div className="p-3 cursor-pointer" onClick={() => handleNextActionsPage()}>
          next
        </div>
      </div>
    );
  };
  return (
    <div>
      <TempTrigers />
      <h1 className="  text-White text-4xl font-bold ">Budgets</h1>
      <div className="mb-2 h-10 flex justify-between items-end text-md text-FadedGray  font-medium w-[98%] ">
        <div></div>
        <div className="flex justify-center items-end ">
          <div className="w-32 text-wrap"> Rows Per Page: </div>
          <div>
            <Select
              defaultValue={maxActionsInPage.toString()}
              onValueChange={handleActionsInPageChange}
            >
              <SelectTrigger className=" bg-RichGray">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-RichGray shadow-2xl">
                {Array.from({ length: 30 }, (_, index) => (
                  <SelectItem
                    className=" focus:bg-DeepGray "
                    value={(index + 1).toString()}
                    key={index}
                  >
                    {index + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex w-[98%] h-14 rounded-lg bg-RichGray justify-between items-center text-White px-4 font-semibold text-lg mb-2">
        <div
          className="w-[5%] cursor-pointer"
          onClick={() => handleChangeSortedTransctions("type")}
        >
          Type
        </div>
        <div
          className="w-[20%] flex gap-2 cursor-pointer"
          onClick={() => handleChangeSortedTransctions("name")}
        >
          <div>Name</div>
          <img src="/sort.svg" className="w-5 " />
        </div>
        <div
          className="w-[20%] flex gap-2 cursor-pointer"
          onClick={() => handleChangeSortedTransctions("date")}
        >
          <div>Date</div>
          <img src="/sort.svg" className="w-5" />
        </div>

        <div
          className="w-[20%] flex gap-2 cursor-pointer"
          onClick={() => handleChangeSortedTransctions("budget")}
        >
          <div>Budget</div>
          <img src="/sort.svg" className="w-5" />
        </div>

        <div
          className="w-[20%] flex gap-2 cursor-pointer "
          onClick={() => handleChangeSortedTransctions("amount")}
        >
          <div>Amount</div>
          <img src="/sort.svg" className="w-5" />
        </div>
        <div className="w-[20%] flex gap-2 ">
          <div>Source</div>
          <img src="/sort.svg" className="w-5" />
        </div>
      </div>
      {sortedTransactions
        .slice(
          (currentPage - 1) * maxActionsInPage,
          (currentPage - 1) * maxActionsInPage + maxActionsInPage
        )
        .map((transaction) => {
          return <Transaction transaction={transaction} key={transaction.date} />;
        })}
    </div>
  );
};

export default Transactions;
