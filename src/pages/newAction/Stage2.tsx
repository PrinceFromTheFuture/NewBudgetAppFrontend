import StageWraper from "./StageWraper";
import { actionInteface, transactionForm } from "@/types";
import dayjs from "dayjs";
import { useRef } from "react";

interface stage2PropsInterface {
  stage: number;
  formData: transactionForm;
  updateFormFiled: (
    field: keyof actionInteface, // Use keyof to ensure field matches keys of newActionFormInteface
    value: string | number | undefined
  ) => void;
  nextStage: () => void;
}

const Satge2 = ({ stage, formData, updateFormFiled, nextStage }: stage2PropsInterface) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <StageWraper stage={2} currentStage={stage}>
      <div className="flex flex-col justify-normal items-center w-full">
        <div className="text-3xl mb-5 ml-5 font-extrabold">When did your Action occured?</div>
        <input
          type="datetime-local"
          name="date"
          id="date"
          className="  text-DeepGray"
          ref={inputRef}
          onChange={(e) => updateFormFiled("date", e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Set") {
              nextStage();
            }
          }}
          yyyy-MM-ddThh:mm
          value={formData.date}
        />
        <div className=" w-full flex justify-between items-center gap-3 h-20">
          <div className="h-full w-full bg-RichGray rounded-lg  flex justify-start items-center">
            <div className="flex justify-start items-center">
              <div className=" h-8 w-8 bg-Purple ml-4"></div>
              <div className="ml-2">
                {" "}
                <div className="text-White text-md font-extrabold">
                  {dayjs(formData.date).format("DD/MM/YYYY HH:mm")}
                </div>
                <div className=" text-FadedGray text-sm font-bold">Calender</div>
              </div>
            </div>
          </div>
          <label
            className="   rounded-lg bg-Purple h-20 w-20 flex items-center justify-center"
            htmlFor="date"
          >
            Date
          </label>
        </div>
      </div>
    </StageWraper>
  );
};

export default Satge2;
