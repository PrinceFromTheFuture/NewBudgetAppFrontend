import { useAppSelector } from "@/hooks";
import StageWraper from "./StageWraper";
import { actionInteface } from "@/types";
import { getAllSourcesSelector } from "@/redux/userDataSlice";

interface stage3PropsInterface {
  stage: number;
  updateFormFiled: (
    field: keyof actionInteface, // Use keyof to ensure field matches keys of newActionFormInteface
    value: string | number
  ) => void;
}

const Satge5 = ({ stage, updateFormFiled }: stage3PropsInterface) => {
  const sources = useAppSelector(getAllSourcesSelector);

  return (
    <StageWraper stage={5} currentStage={stage}>
      <div className="flex flex-col justify-normal items-center w-full">
        {" "}
        <div className="text-3xl mb-5 ml-5 font-extrabold">
          Finnaly, What Source Did You Use
        </div>
        <div className="flex flex-wrap w-full justify-between max-h-[280px] overflow-auto">
          {sources.map((source) => {
            return (
              <div
                onClick={() => updateFormFiled("source", source.name)}
                className="bg-RichGray w-[48%] flex p-4 text-center items-center flex-col h-28 justify-between rounded-xl mb-3 hover:border-2 border-DimGray transition-all"
              >
                <div className="text-2xl text-White font-semibold">
                  {source.balance}₪
                  <div className="text-FadedGray font-bold text-sm">
                    balance
                  </div>
                </div>
                <div
                  className=" w-[80%] rounded font-bold text-sm p-0.5 text-DeepGray flex justify-center items-center"
                  style={{ backgroundColor: source.color }}
                >
                  {source.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StageWraper>
  );
};

export default Satge5;
