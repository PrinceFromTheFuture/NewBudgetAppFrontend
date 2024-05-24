import { useAppSelector } from "@/hooks";
import StageWraper from "./StageWraper";
import { actionInteface } from "@/types";
import { getAllSourcesSelector } from "@/redux/userDataSlice";
import { allCardsSelector } from "@/redux/cardsSlice";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import dayjs from "dayjs";
import CreditCard from "@/components/CreditCard";

interface stage3PropsInterface {
  stage: number;
  updateFormFiled: (
    field: keyof actionInteface, // Use keyof to ensure field matches keys of newActionFormInteface
    value: string | number | undefined
  ) => void;
}

const Satge3 = ({ stage, updateFormFiled }: stage3PropsInterface) => {
  const sources = useAppSelector(getAllSourcesSelector);
  const cards = useAppSelector(allCardsSelector);

  return (
    <StageWraper stage={3} currentStage={stage}>
      <div className="flex flex-col justify-normal items-center w-full">
        {" "}
        <div className="text-3xl mb-5 ml-5 font-extrabold">Finnaly, What Source Did You Use</div>
        <div className="flex flex-wrap w-full justify-between min-h-[420px] max-h-[450px] overflow-auto">
          {sources.map((source) => {
            return (
              <div
                onClick={() => {
                  updateFormFiled("source", source._id);
                }}
                className="bg-RichGray w-[48%] flex p-4 text-center items-center flex-col h-28 justify-between rounded-xl mb-3 hover:border-2 border-DimGray transition-all"
              >
                <div className="text-2xl text-White font-semibold">
                  {source.balance}₪<div className="text-FadedGray font-bold text-sm">balance</div>
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
          <div className="w-full text-2xl mb-5 ml-5 font-extrabold mt-4">Cards</div>
          <div className="w-full ">
            {cards.map((card) => {
              return (
                <div className="" onClick={() => updateFormFiled("card", card._id)}>
                  <CreditCard card={card} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </StageWraper>
  );
};

export default Satge3;
