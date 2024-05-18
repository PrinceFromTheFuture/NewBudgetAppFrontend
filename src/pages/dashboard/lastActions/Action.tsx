import { cn } from "@/lib/utils";
import { actionInteface } from "@/types";
import dayjs from "dayjs";

interface actionPropsInterface {
  action: actionInteface;
}
const Action = ({ action }: actionPropsInterface) => {
  return (
    <tr className=" rounded-full hover:bg-DimGray transition-all cursor-pointer ">
      <th className="font-semibold">
        {" "}
        {action.title.length > 20 ? action.title.substring(0, 20) + "..." : action.title}
      </th>
      <th className="font-semibold">
        <div
          className={cn(
            " bg-DeepGray rounded-full w-min p-1 px-3 text-center",
            action.type === "outcome" && "text-Orange"
          )}
        >
          {action.type}
        </div>
      </th>

      <th className="font-semibold">{dayjs(action.date).format("DD/MM/YYYY")}</th>
      <th className="font-bold text-Purple ">{action.amount}₪</th>

      <th className="font-semibold"> {action.budgetCategory}</th>
      <th className="font-semibold">{action.source}</th>
    </tr>
  );
};

export default Action;
