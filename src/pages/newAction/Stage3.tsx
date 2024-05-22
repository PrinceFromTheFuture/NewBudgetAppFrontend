import { useAppSelector } from "@/hooks";
import StageWraper from "./StageWraper";
import { actionInteface } from "@/types";
import { getAllSourcesSelector } from "@/redux/userDataSlice";
import { allCardsSelector } from "@/redux/cardsSlice";

interface stage3PropsInterface {
  stage: number;
  updateFormFiled: (
    field: keyof actionInteface, // Use keyof to ensure field matches keys of newActionFormInteface
    value: string | number
  ) => void;
}

const Satge3 = ({ stage, updateFormFiled }: stage3PropsInterface) => {
  const sources = useAppSelector(getAllSourcesSelector);
  const cards = useAppSelector(allCardsSelector);

  return (
    <StageWraper stage={3} currentStage={stage}>
      <div className="flex flex-col justify-normal items-center w-full">
        {" "}
        <div className="text-3xl mb-5 ml-5 font-extrabold">
          Finnaly, What Source Did You Use
        </div>
        <div className="flex flex-wrap w-full justify-between min-h-[420px] max-h-[450px] overflow-auto">
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
          <div className="w-full text-2xl mb-5 ml-5 font-extrabold mt-4">
            Cards
          </div>
          <div className="w-full ">
            {cards.map((card) => {
              return (
                <div className="relative h-44 w-full  ">
                  {" "}
                  <div className="w-full z-10 rounded-xl flex flex-col justify-between  hover:border-FadedGray transition-all hover:border-[2px] h-full shadow-lg bg-gradient-to-bl from-[#8B4EB5] to-[#4744A7] overflow-hidden relative">
                    <img
                      src="/Credit-Card-illustration.svg"
                      className="absolute w-full h-full opacity-20"
                    />
                    <div>
                      {" "}
                      <div className="font-bold m-5 text-lg ">{card.name}</div>
                      <div className="font-bold m-5 text-lg text-FadedGray">
                        •••• •••• •••• 1234
                      </div>
                    </div>
                    <div className="flex justify-center items-center my-5">
                      <div className=" w-[80%] bg-White/20 h-2 rounded-full">
                        <div
                          style={{
                            width: `${(card.amountUsed / card.limit) * 100}%`,
                          }}
                          className=" h-2 rounded-full bg-White"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute z-[-10] w-[90%] h-full rounded-xl bg-RichGray top-4 left-1/2 -translate-x-1/2"></div>
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
