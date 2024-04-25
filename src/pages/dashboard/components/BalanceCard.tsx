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
import { getBalances, getTodaysProfit } from "@/redux/userDataSlice";
import { useState } from "react";

const BalanceCard = () => {
  const [isNet, setIsNet] = useState(false);

  const userBalances = useAppSelector(getBalances);
  const todayProfit = useAppSelector(getTodaysProfit);

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
          {isNet ? userBalances.grossBalance : userBalances.netBalance}
          <span className="  font-black">₪</span>
        </div>
        {!isNet && (
          <div className="text-lg  bg-DeepGray/20  px-3 text-Dbg-DeepGray mt-2 font-bold">
            {todayProfit}
          </div>
        )}
        {String(isNet)}
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
