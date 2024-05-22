import { useAppSelector } from "@/hooks";
import { getAllTransactionsSelector } from "@/redux/transactionsSlice";
import Transaction from "./Transaction";
import { useEffect, useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllBudgetsSelector } from "@/redux/userDataSlice";
import { Checkbox } from "@/components/ui/checkbox";
import { find } from "node_modules/@reduxjs/toolkit/dist/utils";
const Transactions = () => {
  const allTransactions = useAppSelector(getAllTransactionsSelector);
  const allBudgets = useAppSelector(getAllBudgetsSelector);

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
  const [budgetsFilters, setBudgetsFilters] = useState(
    allBudgets
      .map((budegt) =>
        budegt.categories.map((cateogy) => {
          return { cateogyName: cateogy.name, isChecked: false };
        })
      )
      .flat()
  );

  const handleBudgetsFiltersCheckboxChnage = (
    budgetCategoryName: string,
    newValue: boolean
  ) => {
    const newBudgetFilters = budgetsFilters.map((categoryNameObject) => {
      if (categoryNameObject.cateogyName === budgetCategoryName) {
        return {
          ...categoryNameObject,
          isChecked: newValue,
        };
      } else {
        return categoryNameObject;
      }
    });
    setBudgetsFilters(newBudgetFilters);
  };
  const handleClearBudgetsFilter = () => {
    const resetedAllFilters = budgetsFilters.map((budgetFilter) => {
      return {
        cateogyName: budgetFilter.cateogyName,
        isChecked: false,
      };
    });
    setBudgetsFilters(resetedAllFilters);
  };

  const [minPriceRange, setMinPriceRange] = useState(0);
  const [maxPriceRange, setMaxPriceRange] = useState(
    allTransactions.slice().sort((a, b) => b.amount - a.amount)[0].amount
  );

  const {
    sortedTransactions,
    handleChangeSortedTransctions,
    handleChangeSearchValue,
  } = useSortingTransactions(budgetsFilters, {
    min: minPriceRange,
    max: maxPriceRange,
  });

  if (allTransactions.length === 0 || allBudgets.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="overflow-hidden">
      <h1 className="  text-White text-4xl font-bold mb-8 ">Budgets</h1>
      <div className="mb-3 h-10 flex justify-between items-end text-md text-FadedGray  font-medium w-[98%]  ">
        <div className="w-full flex justify-start items-center gap-3">
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
          <Popover>
            <PopoverTrigger className="h-12 bg-RichGray rounded-md px-3 flex justify-center gap-2 items-center">
              <img src="/filter-solid.svg" className="w-3" alt="" />
              budgets
            </PopoverTrigger>
            <PopoverContent className=" bg-RichGray m-0 p-0 py-4 ">
              {allBudgets.map((budget) => {
                return budget.categories.map((category) => {
                  return (
                    <div
                      key={category.color}
                      className=" p-1 px-2 mx-3 rounded select-none text-FadedGray font-semibold  text-base hover:bg-DimGray transition-all flex justify-start items-center"
                    >
                      <input
                        type="checkbox"
                        checked={
                          budgetsFilters.find(
                            (budgetCheckedObject) =>
                              budgetCheckedObject.cateogyName === category.name
                          )?.isChecked
                        }
                        onChange={(event) =>
                          handleBudgetsFiltersCheckboxChnage(
                            category.name,
                            event.target.checked
                          )
                        }
                        id={category.name}
                        name={category.name}
                        className=" mr-3"
                      />
                      <div
                        className=" w-1 mr-2 rounded-full h-4"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <label htmlFor={category.name}>{category.name}</label>
                    </div>
                  );
                });
              })}
              <div
                onClick={handleClearBudgetsFilter}
                className=" mt-2  font-bold hover:bg-DimGray transition-all rounded-md text-White cursor-pointer  p-1 px-2 mx-3 text-center"
              >
                Clear Filters
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger className="h-12 bg-RichGray rounded-md px-3 flex justify-center gap-2 items-center">
              Range from: {minPriceRange.toFixed(2)}₪ to{" "}
              {maxPriceRange.toFixed(2)}₪
            </PopoverTrigger>
            <PopoverContent className="flex justify-between items-center bg-RichGray">
              <div>
                <div className="text-lg mb-2 font-medium text-White">
                  <label htmlFor="min">min</label>
                </div>
                <input
                  onChange={(event) =>
                    setMinPriceRange(Number(event.target.value))
                  }
                  type="number"
                  min={0}
                  value={minPriceRange}
                  name="min"
                  id="min"
                  className="w-[90%] py-1  rounded-md bg-DimGray border-none outline-none text-White text-center"
                />
              </div>
              <div>
                <div className="text-lg mb-2 font-medium text-White">
                  <label htmlFor="max">max</label>
                </div>
                <input
                  onChange={(event) =>
                    setMaxPriceRange(Number(event.target.value))
                  }
                  value={maxPriceRange}
                  type="number"
                  min={0}
                  name="max"
                  id="max"
                  className="w-[90%] py-1  rounded-md bg-DimGray border-none outline-none text-White text-center"
                />
              </div>
              <div
                onClick={() => {
                  setMinPriceRange(0);
                  setMaxPriceRange(
                    allTransactions
                      .slice()
                      .sort((a, b) => b.amount - a.amount)[0].amount
                  );
                }}
                className=" mt-2  font-bold hover:bg-DimGray transition-all rounded-md text-White cursor-pointer  p-1 px-2 mx-3 text-center"
              >
                Reset
              </div>
            </PopoverContent>
          </Popover>
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
