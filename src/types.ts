export interface actionInteface {
  title: string;
  type: "income" | "outcome" | "transaction";
  date: string;
  amount: number;
  budget: {
    name: string;
    color: string;
  };
  source: string;
}
export interface newActionFormInteface {
  title: string;
  source: string;
  budget: string;
  amount: number;
  date: string;
  type: string;
}
