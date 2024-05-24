export interface actionInteface {
  title: string;
  type: "income" | "outcome" | "transaction";
  date: string;
  amount: number;
  budgetCategory: string;
  source?: string;
  card?: string;
  _id: string;
}

export interface Card {
  amountUsed: number;
  name: string;
  associatedSource: string;
  resetDay: number;
  limit: number;
  _id: string;
}
export interface transactionForm {
  title: string;
  type: "income" | "outcome" | "transaction";
  date: string;
  amount: number | undefined;
  budget: string;
  source?: string;
  card?: string;
}

export interface sourceInterface {
  name: string;
  balance: number;
  color: string;
  username: string;
  icon: string;
  _id: string;
}

export interface BudgetCategory {
  name: string;
  spent: number;
  scheduled: number;
  color: string;
}

export interface budgetInterface {
  _id: string;
  user: string;
  start: string;
  end: string;
  categories: {
    name: string;
    spent: number;
    scheduled: number;
    color: string;
  }[];
}
