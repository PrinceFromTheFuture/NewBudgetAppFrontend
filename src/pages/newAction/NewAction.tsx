// MultiStageForm.js
import { useState } from "react";
import Satge1 from "./Satge1";
import Satge2 from "./Stage2";
import Satge3 from "./Stage3";
import Satge5 from "./Stage5";
import Satge4 from "./Stage4";
import { actionInteface, transactionForm } from "@/types";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getAllTransactions } from "@/redux/transactionsSlice";
import { useNavigate } from "react-router-dom";
import { getAllSourcesSelector, getCurrentBudget } from "@/redux/userDataSlice";
import dayjs from "dayjs";

export const NewAction = () => {
  const navigate = useNavigate();

  const [stage, setStage] = useState(1);
  const dispatch = useAppDispatch();

  const allSources = useAppSelector(getAllSourcesSelector);

  const totalStages = 5; // Adjust as per your form stages

  const nextStage = () => {
    if (stage < totalStages) {
      setStage(stage + 1);
    }
  };

  const prevStage = () => {
    if (stage > 1) {
      setStage(stage - 1);
    }
  };

  const [formData, setFormData] = useState<transactionForm>({
    title: "",
    source: undefined,
    budget: "",
    amount: undefined,
    date: dayjs().format("YYYY-MM-DDTHH:mm"),
    type: "income",
    card: undefined,
  });

  const updateFormFiled = (
    field: keyof actionInteface, // Use keyof to ensure field matches keys of newActionFormInteface
    value: string | number | undefined
  ) => {
    let newFormData = { ...formData }; // Explicitly declare type

    (newFormData[field] as any) = value;
    if (field === "card") {
      newFormData.source = undefined;
    }
    if (field === "source") {
      newFormData.card = undefined;
    }
    setFormData(newFormData);
  };

  const handlePostNewTransaction = async () => {
    await axios.post(
      `${import.meta.env.VITE_BASE_API}/transactions`,
      { ...formData, date: dayjs(formData.date).utc().format() },
      {
        withCredentials: true,
      }
    );
    dispatch(getAllTransactions());
    navigate("/budgets");
  };
  const budget = useAppSelector(getCurrentBudget);
  if (!budget) {
    return <div>you have not create any budget yet!</div>;
  }
  return (
    <div className="transition-all fixed right-0 top-0 bottom-0 left-0 bg-DeepGray overflow-hidden text-White  flex  flex-col justify-between p-3 select-none ">
      <div>
        {" "}
        <div className="w-full flex justify-start items-center">
          <div onClick={() => navigate(-1)} className="p-3 bg-RichGray rounded cursor-pointer">
            Back
          </div>
        </div>
        <div className="w-full bg-RichGray h-2 rounded-full mt-4">
          <div
            className="  h-2 bg-Purple rounded-full transition-all duration-200 "
            style={{ width: `${(stage / totalStages) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="w-full  border-[3px] border-RichGray rounded-xl py-6 p-4">
        <div
          className="   text-White h-full overflow-visible flex justify-between transition-all  duration-300"
          style={{
            transform: `translateX(-${(stage - 1) * 20}%`,
            width: `500%`,
          }}
        >
          <Satge1 stage={stage} updateFormFiled={updateFormFiled} nextStage={nextStage} />
          <Satge2
            nextStage={nextStage}
            formData={formData}
            updateFormFiled={updateFormFiled}
            stage={stage}
          />

          <Satge3 stage={stage} updateFormFiled={updateFormFiled} />
          <Satge4
            stage={stage}
            nextStage={nextStage}
            formData={formData}
            updateFormFiled={updateFormFiled}
          />

          <Satge5
            formData={formData}
            nextStage={nextStage}
            stage={stage}
            updateFormFiled={updateFormFiled}
          />
        </div>
      </div>
      <div className="flex gap-2">
        {stage > 1 && (
          <div
            className="py-2 font-bold w-full flex justify-center items-center text-lg bg-RichGray rounded-xl cursor-pointer"
            onClick={prevStage}
          >
            Back
          </div>
        )}
        {stage < totalStages && (
          <div
            className="py-2 font-bold w-full flex justify-center items-center text-lg bg-RichGray rounded-xl cursor-pointer"
            onClick={nextStage}
          >
            Next
          </div>
        )}
        {stage === totalStages && (
          <div
            className="py-2 font-bold w-full flex justify-center items-center text-lg text-DeepGray bg-Purple rounded-xl cursor-pointer"
            onClick={handlePostNewTransaction}
          >
            Submit
          </div>
        )}
      </div>
    </div>
  );
};
