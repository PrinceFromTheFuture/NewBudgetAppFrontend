export interface actionInteface {
  title: string;
  type: "income" | "outcome" | "transaction";
  date: string;
  amount: number;
  budget: string;
  source: string;
}

export interface sourceInterface {
  name: string;
  balance: number;
  color: string;
}

export interface BudgetCategory {
  name: string;
  spent: number;
  scheduled: number;
  color: string;
}

export interface budgetInterface {
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
