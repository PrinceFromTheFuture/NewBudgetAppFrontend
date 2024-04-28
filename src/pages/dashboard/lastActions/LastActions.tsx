import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/hooks";
import { getAllTransactionsSelector } from "@/redux/actionsSlice";
import Action from "./Action";

const LastActions = () => {
  const allActions = useAppSelector(getAllTransactionsSelector);
  return (
    <Card className="w-[70%] ">
      <CardHeader>
        <CardTitle>Last 5 Actions</CardTitle>
        <CardDescription className=" text-DimGray">
          {allActions.length} Actions made
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <table className=" text-FadedGray w-full text-left  p-3  h-[300px]  rounded-full ">
          <tr className="  text-DimGray pl-3   rounded-full">
            <th>Title</th>
            <th>Type</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Budget</th>
            <th>Source</th>
          </tr>
          {allActions.map((action, index) => {
            if (index <= 5) {
              return <Action action={action} />;
            } else {
              return;
            }
          })}
        </table>
      </CardContent>
    </Card>
  );
};

export default LastActions;
