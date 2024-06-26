import StageWraper from "./StageWraper";
import { actionInteface, transactionForm } from "@/types";
import { useEffect, useRef } from "react";

interface stage5PropsInterface {
  stage: number;
  formData: transactionForm;
  updateFormFiled: (
    field: keyof actionInteface, // Use keyof to ensure field matches keys of newActionFormInteface
    value: string | number | undefined
  ) => void;
  nextStage: () => void;
}

const Satge5 = ({ stage, formData, updateFormFiled, nextStage }: stage5PropsInterface) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stage === 5) {
      if (inputRef.current !== null) inputRef.current.focus();
    } else {
      if (inputRef.current !== null) inputRef.current.blur();
    }
  }, [stage]);

  return (
    <StageWraper stage={5} currentStage={stage}>
      <div className="flex flex-col justify-normal items-center w-full">
        {" "}
        <div className="text-3xl mb-5 ml-5 font-extrabold">
          How Would you Call your Transaction?
        </div>
        <input
          type="text"
          ref={inputRef}
          style={{ position: "absolute", left: "-9999px" }}
          value={formData.title}
          onChange={(e) => updateFormFiled("title", e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextStage();
            }
          }}
        />
        <div
          className=" text-2xl font-semibold bg-RichGray text-center outline-none p-3 w-full rounded-xl"
          onClick={() => {
            if (inputRef.current !== null) inputRef.current.focus();
          }}
        >
          {formData.title === "" ? "Title" : formData.title}
        </div>
      </div>
    </StageWraper>
  );
};

export default Satge5;
