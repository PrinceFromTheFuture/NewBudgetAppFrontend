import { useAppSelector } from "@/hooks";
import { getAllTransactionsSelector } from "@/redux/transactionsSlice";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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

  const [serachValue, setSearchValue] = useState("");

  const {
    sortedTransactions,
    handleChangeSortedTransctions,
    handleChangeSearchValue,
  } = useSortingTransactions();

  if (allTransactions.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="overflow-hidden">
      <h1 className="  text-White text-4xl font-bold mb-8 ">Budgets</h1>
      <div className="mb-3 h-10 flex justify-between items-end text-md text-FadedGray  font-medium w-[98%]  ">
        <div className="text-lg font-medium bg-RichGray rounded-md flex justify-between items-center w-[300px] h-12 p-0 ">
          <img
            src="/magnifying-glass-solid.svg"
            alt=""
            className="w-4 m-4 mx-5 p-0"
          />

          <input
            value={serachValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
              handleChangeSearchValue(event.target.value);
            }}
            className=" h-full w-full m-0 p-0 outline-none border-none rounded-md bg-RichGray mr-4 text-base"
            placeholder="serach transaction..."
          />
        </div>
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
      <div className=" overflow-auto">
        {sortedTransactions
          .slice(
            (currentPage - 1) * maxActionsInPage,
            (currentPage - 1) * maxActionsInPage + maxActionsInPage
          )
          .map((transaction) => {
            return (
              <Transaction transaction={transaction} key={transaction._id} />
            );
          })}
      </div>
      <div className="my-2 h-10 flex justify-between items-end text-md text-FadedGray  font-medium w-[98%] ">
        <div>
          Shwoing {(currentPage - 1) * maxActionsInPage + 1} -{" "}
          {(currentPage - 1) * maxActionsInPage + maxActionsInPage} out of{" "}
          {sortedTransactions.length} results
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="text-lg"
                  onClick={() => {
                    if (currentPage - 1 > 0) {
                      setCurrentPage((prev) => prev - 1);
                    }
                  }}
                />
              </PaginationItem>
              {Array.from({ length: maxPages }, (_, index) => {
                if (index < 5) {
                  return (
                    <PaginationItem
                      onClick={() => setCurrentPage(index + 1)}
                      key={index}
                    >
                      <PaginationLink isActive={index + 1 === currentPage}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              })}
              <PaginationItem>
                <Select
                  defaultValue={maxActionsInPage.toString()}
                  onValueChange={(value) => setCurrentPage(Number(value))}
                >
                  <SelectTrigger
                    className=" bg-RichGray"
                    hidden
                  ></SelectTrigger>
                  <SelectContent className="bg-RichGray shadow-2xl">
                    {Array.from({ length: maxPages }, (_, index) => (
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
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className="text-lg  "
                  onClick={() => handleNextActionsPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
