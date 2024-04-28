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

export interface budgetInterface {
  name: string;
  spent: number;
  scheduled: number;
  color: string;
}
