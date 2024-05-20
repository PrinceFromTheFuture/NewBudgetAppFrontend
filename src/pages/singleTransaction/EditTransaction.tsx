import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  getAllTransactions,
  getAllTransactionsSelector,
} from "@/redux/transactionsSlice";
import {
  getAllBudgets,
  getAllSources,
  getAllSourcesSelector,
  getCurrentBudget,
} from "@/redux/userDataSlice";
import { actionInteface } from "@/types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTransaction = () => {
  const [isCollapsableOpen, setIsCollapsableOpen] = useState(false);
  const [dataUpdatingAdujustment, setDataDataDeletingAdujustment] = useState({
    budgets: true,
    sources: true,
  });
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const allTransactions: actionInteface[] | null = useAppSelector(
    getAllTransactionsSelector
  );

  const singleTransaction = allTransactions.find(
    (transction) => transction._id === transactionId
  )!;

  const currentBudget = useAppSelector(getCurrentBudget);
  const allSources = useAppSelector(getAllSourcesSelector);

  const [formData, setFormData] = useState({
    ...singleTransaction,
    date: dayjs(singleTransaction.date).format("YYYY-MM-DDTHH:mm"),
  });

  const updateFormFiled = (
    field: keyof actionInteface, // Use keyof to ensure field matches keys of newActionFormInteface
    value: string | number
  ) => {
    let newFormData = { ...formData }; // Explicitly declare type
    (newFormData[field] as any) = value;
    // Update state
    setFormData(newFormData);
  };

  const handleSaveUpdate = async () => {
    console.log(formData);
    await axios.patch(
      `${import.meta.env.VITE_BASE_API}/transactions/${transactionId}`,
      {
        updatedTransaction: {
          ...formData,
          date: dayjs(formData.date).utc().format(),
        },
        options: dataUpdatingAdujustment,
      },
      {
        withCredentials: true,
      }
    );
    dispatch(getAllSources());
    dispatch(getAllTransactions());
    dispatch(getAllBudgets());
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="absolute top-8 left-8 flex justify-between items-center p-3 bg-Purple rounded-lg cursor-pointer">
          <img className="w-5" src="/pen-to-square-solid.svg" alt="delete" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Edit Transaction</AlertDialogTitle>
        <div className=" flex flex-col">
          <label htmlFor="title" className="mb-2 font-medium text-base">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            id="title"
            name="title"
            className=" border-2 rounded-md p-1 border-DimGray font-heebo text-right"
            onChange={(event) => updateFormFiled("title", event.target.value)}
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="amount" className="mb-2 font-medium text-base">
            Amount
          </label>
          <input
            type="number"
            min={1}
            value={formData.amount}
            id="amount"
            name="amount"
            className=" border-2 rounded-md p-1 border-DimGray"
            onChange={(event) => updateFormFiled("amount", event.target.value)}
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="date" className="mb-2 font-medium text-base">
            Date
          </label>
          <input
            type="datetime-local"
            min={1}
            value={formData.date}
            id="date"
            name="date"
            className=" border-2 rounded-md p-1 border-DimGray"
            onChange={(event) => updateFormFiled("date", event.target.value)}
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="budget" className="mb-2 font-medium text-base">
            Budget Cateory
          </label>
          <Select
            onValueChange={(value) => updateFormFiled("budgetCategory", value)}
          >
            <SelectTrigger className="w-[180px] bg-FadedGray text-DeepGray">
              <SelectValue
                defaultValue={formData.budgetCategory}
                placeholder={formData.budgetCategory}
              />
            </SelectTrigger>
            <SelectContent className="bg-FadedGray text-DeepGray">
              <SelectGroup>
                <SelectLabel className="text-RichGray font-bold">
                  Budget Cateory
                </SelectLabel>
                {currentBudget.categories.map((cateory) => {
                  return (
                    <SelectItem key={cateory.color} value={cateory.name}>
                      {cateory.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className=" flex flex-col">
          <label htmlFor="source" className="mb-2 font-medium text-base">
            Source
          </label>
          <Select onValueChange={(value) => updateFormFiled("source", value)}>
            <SelectTrigger className="w-[180px] bg-FadedGray text-DeepGray">
              <SelectValue
                defaultValue={formData.source}
                placeholder={formData.source}
              />
            </SelectTrigger>
            <SelectContent className="bg-FadedGray text-DeepGray">
              <SelectGroup>
                <SelectLabel className="text-RichGray font-bold">
                  Source
                </SelectLabel>
                {allSources.map((cateory) => {
                  return (
                    <SelectItem key={cateory.color} value={cateory.name}>
                      {cateory.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className=" flex flex-col">
          <label htmlFor="type" className="mb-2 font-medium text-base">
            Type
          </label>
          <Select onValueChange={(value) => updateFormFiled("type", value)}>
            <SelectTrigger className="w-[180px] bg-FadedGray text-DeepGray">
              <SelectValue
                defaultValue={formData.type}
                placeholder={formData.type}
              />
            </SelectTrigger>
            <SelectContent className="bg-FadedGray text-DeepGray">
              <SelectGroup>
                <SelectLabel className="text-RichGray font-bold">
                  Source
                </SelectLabel>
                <SelectItem value="outcome">outcome</SelectItem>
                <SelectItem value="inceome">income</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <AlertDialogDescription>
          <Collapsible
            open={isCollapsableOpen}
            onOpenChange={setIsCollapsableOpen}
          >
            <div className=" flex justify-start gap-2 items-center">
              <Switch
                checked={
                  dataUpdatingAdujustment.budgets &&
                  dataUpdatingAdujustment.sources
                }
                onCheckedChange={() => {
                  setDataDataDeletingAdujustment({
                    budgets: !dataUpdatingAdujustment.budgets,
                    sources: !dataUpdatingAdujustment.budgets,
                  });
                }}
              />
              <div className="leading-[0px] font-semibold text-RichGray">
                adjsut all data
              </div>
              <CollapsibleTrigger>
                <div className="hover:bg-FadedGray rounded-lg p-1 w-min cursor-pointer transition-all">
                  <CaretSortIcon className="h-6 w-6  " />
                  <span className="sr-only">Toggle</span>
                </div>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className=" flex justify-start gap-2 items-center mt-2">
                <Switch
                  checked={dataUpdatingAdujustment.budgets}
                  onCheckedChange={() =>
                    setDataDataDeletingAdujustment({
                      ...dataUpdatingAdujustment,
                      budgets: !dataUpdatingAdujustment.budgets,
                    })
                  }
                />
                <div className="leading-[0px] font-semibold text-RichGray">
                  adjust for Bdugets
                </div>
              </div>
              <div className=" flex justify-start gap-2 items-center mt-2">
                <Switch
                  checked={dataUpdatingAdujustment.sources}
                  onCheckedChange={() =>
                    setDataDataDeletingAdujustment({
                      ...dataUpdatingAdujustment,
                      sources: !dataUpdatingAdujustment.sources,
                    })
                  }
                />
                <div className="leading-[0px] font-semibold text-RichGray">
                  adjust for Sources
                </div>
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
            onClick={handleSaveUpdate}
            className="w-full border-2 border-RichGray  text-RichGray font-semibold text-md"
          >
            Save
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditTransaction;
