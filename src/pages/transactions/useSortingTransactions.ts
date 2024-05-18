import { useAppSelector } from "@/hooks";
import { getAllTransactionsSelector } from "@/redux/actionsSlice";
import { getCurrentBudget } from "@/redux/userDataSlice";
import { actionInteface } from "@/types";
import dayjs from "dayjs";
import { useState } from "react";

const useSortingTransactions = () => {
  const allTransactions = useAppSelector(getAllTransactionsSelector);
  const currentBudget = useAppSelector(getCurrentBudget);
  const [sortedTransactions, setSortedTransactions] = useState(allTransactions);

  const transactionsTypeOrder = {
    outcome: 1,
    income: 2,
  };
  let budgetCategoriesOrder = {};
  currentBudget.categories.forEach((category, index) => {
    budgetCategoriesOrder[category.name] = index;
  });

  const allSortingFilters = {
    budget: (actionA: actionInteface, actionB: actionInteface) => {
      return (
        budgetCategoriesOrder[actionA.budgetCategory] -
        budgetCategoriesOrder[actionB.budgetCategory]
      );
    },
    name: (actionA: actionInteface, actionB: actionInteface) =>
      actionA.title.localeCompare(actionB.title),
    date: (actionA: actionInteface, actionB: actionInteface) =>
      dayjs(actionA.date).unix() - dayjs(actionB.date).unix(),
    amount: (actionA: actionInteface, actionB: actionInteface) => actionA.amount - actionB.amount,
    type: (actionA: actionInteface, actionB: actionInteface) => {
      return transactionsTypeOrder[actionA.type] - transactionsTypeOrder[actionB.type];
    },
  };

  const handleChangeSortedTransctions = (
    filter: "name" | "date" | "budget" | "amount" | "source" | "type"
  ) => {
    const newSortedTransactions = sortedTransactions.slice().sort(allSortingFilters[filter]);
    const didChange = !newSortedTransactions.every(
      (transaction, index) => transaction === sortedTransactions[index]
    );
    if (didChange) {
      setSortedTransactions(newSortedTransactions);
    } else {
      const newTransactions = newSortedTransactions.slice().reverse();
      setSortedTransactions(newTransactions);
    }
  };

  const handleChangeSearchValue = (value: string) => {
    const newSortedTransactions = allTransactions.filter((transaction) => {
      return transaction.title.includes(value);
    });
    setSortedTransactions(newSortedTransactions);
  };

  return { sortedTransactions, handleChangeSortedTransctions, handleChangeSearchValue };
};

export default useSortingTransactions;
