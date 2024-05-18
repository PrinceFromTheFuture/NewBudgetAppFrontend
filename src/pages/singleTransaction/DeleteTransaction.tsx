import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch } from "@/hooks";
import { getAllTransactions } from "@/redux/actionsSlice";
import { getAllBudgets } from "@/redux/userDataSlice";

import { CaretSortIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteTransaction = () => {
  const [isCollapsableOpen, setIsCollapsableOpen] = useState(false);
  const [dataDeletingAdujustment, setDataDataDeletingAdujustment] = useState({
    budgets: true,
    sources: true,
  });
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API}/transactions/delete/${transactionId}`,
      { ...dataDeletingAdujustment },
      { withCredentials: true }
    );
    if (response.status === 200) {
      dispatch(getAllTransactions());
      dispatch(getAllBudgets());

      navigate(-1);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {" "}
        <div className="absolute top-8 right-8 flex justify-between items-center p-3 bg-RichGray rounded-lg cursor-pointer">
          <img className="w-5" src="/trash-can-solid.svg" alt="delete" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

        <AlertDialogDescription>
          <div className=" mb-8">
            this action will permenetly remove the transaction and delete the data asoociated with
            it
          </div>
          <Collapsible open={isCollapsableOpen} onOpenChange={setIsCollapsableOpen}>
            <div className=" flex justify-start gap-2 items-center">
              <Switch
                checked={dataDeletingAdujustment.budgets && dataDeletingAdujustment.sources}
                onCheckedChange={() => {
                  setDataDataDeletingAdujustment({
                    budgets: !dataDeletingAdujustment.budgets,
                    sources: !dataDeletingAdujustment.budgets,
                  });
                }}
              />
              <div className="leading-[0px] font-semibold text-RichGray">adjsut all data</div>
              <CollapsibleTrigger>
                <div className="hover:bg-FadedGray rounded-lg p-1 w-min cursor-pointer transition-all">
                  <CaretSortIcon className="h-6 w-6  " />
                  <span className="sr-only">Toggle</span>
                </div>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              {" "}
              <div className=" flex justify-start gap-2 items-center mt-2">
                <Switch
                  checked={dataDeletingAdujustment.budgets}
                  onCheckedChange={() =>
                    setDataDataDeletingAdujustment({
                      ...dataDeletingAdujustment,
                      budgets: !dataDeletingAdujustment.budgets,
                    })
                  }
                />
                <div className="leading-[0px] font-semibold text-RichGray">adjust for Bdugets</div>
              </div>
              <div className=" flex justify-start gap-2 items-center mt-2">
                <Switch
                  checked={dataDeletingAdujustment.sources}
                  onCheckedChange={() =>
                    setDataDataDeletingAdujustment({
                      ...dataDeletingAdujustment,
                      sources: !dataDeletingAdujustment.sources,
                    })
                  }
                />
                <div className="leading-[0px] font-semibold text-RichGray">adjust for Sources</div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </AlertDialogDescription>
        <div className="text-base"></div>
        <div className="w-full  flex justify-between items-center gap-4">
          <AlertDialogCancel className="w-full border-none bg-RichGray  text-FadedGray font-semibold text-md">
            Canel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="w-full border-2 border-RichGray  text-RichGray font-semibold text-md"
          >
            delete
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransaction;
