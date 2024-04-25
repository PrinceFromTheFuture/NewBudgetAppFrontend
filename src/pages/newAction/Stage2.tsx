import { cn } from "@/lib/utils";
import StageWraper from "./StageWraper";
import { newActionFormInteface } from "@/types";
import { useEffect, useRef, useState } from "react";

interface stage2PropsInterface {
  stage: number;
  formData: newActionFormInteface;
  updateFormFiled: (
    field: keyof newActionFormInteface, // Use keyof to ensure field matches keys of newActionFormInteface
    value: string | number
  ) => void;
  nextStage: () => void;
}

const Satge2 = ({
  stage,
  formData,
  updateFormFiled,
  nextStage,
}: stage2PropsInterface) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = () => {
    if (inputRef.current !== null) inputRef.current.focus();
  };

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (stage === 2) {
      if (inputRef.current !== null) inputRef.current.focus();
    } else {
      if (inputRef.current !== null) inputRef.current.blur();
    }
  }, [stage]);

  return (
    <StageWraper stage={2} currentStage={stage}>
      <div className="flex flex-col justify-normal items-center w-full">
        <div className="text-3xl mb-5 ml-5 font-extrabold">
          {formData.type === "outcome"
            ? "And How Much Did Your Transation Cost?"
            : "And How Much Did You Earn?"}
        </div>
        <input
          type="number"
          name="amount"
          id="amount"
          ref={inputRef}
          style={{ position: "absolute", left: "-9999px" }}
          value={formData.amount}
          onChange={(e) => updateFormFiled("amount", e.target.value)}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextStage();
            }
          }}
        />
        <div
          className={cn(
            "text-3xl font-bold bg-RichGray rounded-xl p-5 transition-all",
            isFocused && "border-2 border-DimGray "
          )}
          onClick={handleLabelClick}
        >
          {formData.amount}
          <span className=" text-3xl">₪</span>
        </div>
        <div className=" p-1 px-4  bg-RichGray  text-sm  font-bold rounded-full mt-4">
          ILS ₪
        </div>
      </div>
    </StageWraper>
  );
};

export default Satge2;
