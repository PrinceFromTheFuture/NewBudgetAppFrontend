import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/hooks";
import { getAllTransactionsSelector } from "@/redux/transactionsSlice";
import { getAllSourcesSelector } from "@/redux/userDataSlice";
import dayjs from "dayjs";

import { useState } from "react";

const BalanceCard = () => {
  const [isNet, setIsNet] = useState(false);

  const allSources = useAppSelector(getAllSourcesSelector);
  const allTransactions = useAppSelector(getAllTransactionsSelector);

  if (allSources.length === 0 || allTransactions.length === 0) {
    return <div>Loasings....</div>;
  }

  const balance = allSources
    .map((source) => source.balance)
    .reduce((inc, amount) => inc + amount);

  const now = dayjs();

  const todaysChange = allTransactions
    .filter((transaction) => dayjs(transaction.date).isSame(now, "day"))
    .map((transaction) => transaction.amount)
    .reduce((inc, amount) => (inc -= amount), 0);

  return (
    <Card className="bg-Purple w-[350px] h-[270px]">
      <CardHeader>
        <CardTitle className="text-DeepGray flex justify-between items-center">
          <div>Balance</div>
          <Select
            defaultValue="gross"
            onValueChange={(value) => setIsNet(value === "net" ? true : false)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select View" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="net">Net</SelectItem>
                <SelectItem value="gross">Gross</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardTitle>
        <CardDescription>
          Overall {isNet && " Net"} Balance{" gross"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center flex-col ">
        <div className="text-xl font-semibold">Total Balance</div>

        <div className="text-4xl font-extrabold">
          {isNet ? balance : balance}
          <span className="  font-black">₪</span>
        </div>
        <div> Todays's change {todaysChange}₪ </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
