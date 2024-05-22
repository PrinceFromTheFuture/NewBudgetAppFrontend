export interface actionInteface {
  title: string;
  type: "income" | "outcome" | "transaction";
  date: string;
  amount: number;
  budgetCategory: string;
  source: string;
  _id: string;
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
