import { cn } from "@/lib/utils";
import React from "react";

const StageWraper = ({
  children,
  stage,
  currentStage,
}: {
  children: React.ReactNode;
  stage: number;
  currentStage: number;
}) => {
  return (
    <div
      className={cn(
        "w-[100%]   h-full  transition-all duration-200  select-none flex justify-center items-center",
        stage === currentStage ? "opacity-100" : "opacity-0"
      )}
    >
      {children}
    </div>
  );
};

export default StageWraper;
