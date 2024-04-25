import StageWraper from "./StageWraper";
import { newActionFormInteface } from "@/types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface stage1PropsInterface {
  stage: number;
  updateFormFiled: (
    field: keyof newActionFormInteface, // Use keyof to ensure field matches keys of newActionFormInteface
    value: string | number
  ) => void;
  nextStage: () => void;
}

const Satge1 = ({
  stage,
  nextStage,
  updateFormFiled,
}: stage1PropsInterface) => {
  const budgets = [
    { name: "test", color: "#FFA26F" },
    { name: "test", color: "#FFA26F" },
    { name: "test", color: "#FFA26F" },
    { name: "test", color: "#FFA26F" },
    { name: "test", color: "#FFA26F" },
    { name: "test", color: "#FFA26F" },
    { name: "test", color: "#FFA26F" },
    { name: "test", color: "#FFA26F" },
  ];
  return (
    <StageWraper stage={1} currentStage={stage}>
      <div className="flex flex-col justify-normal items-center w-full">
        <label className="text-3xl mb-5 ml-5 font-extrabold text-White">
          Tell us About your transaction type
        </label>
        <div
          onClick={() => {
            updateFormFiled("type", "income");
            nextStage();
          }}
          className="p-4 sm:w-96 w-full bg-RichGray rounded-xl hover:border-2 border-DimGray flex justify-start items-center mb-4 "
        >
          <img
            src="income.svg"
            alt=""
            className="p-2.5 bg-[#65AD82]  rounded-xl w-11 "
          />
          <div className="text-start ml-3">
            <div className=" text-lg text-White  font-bold">income</div>
            <div className=" text-md font-semibold text-FadedGray">
              choose if this is a revenu
            </div>
          </div>
        </div>
        <Drawer>
          <DrawerTrigger
            onClick={() => {
              updateFormFiled("type", "outcome");
            }}
            className="p-4 sm:w-96 w-full bg-RichGray rounded-xl hover:border-2 border-DimGray flex justify-start items-center  "
          >
            <img
              src="outcome.svg"
              alt=""
              className="p-2.5 bg-[#D27979]  rounded-xl w-11 "
            />
            <div className="text-start ml-3">
              <div className="   text-lg  text-White font-bold">outcome</div>
              <div className="text-md font-semibold text-FadedGray">
                choose if this is an expenss
              </div>
            </div>
          </DrawerTrigger>
          <DrawerContent className=" w-full p-3">
            <div className="text-3xl mb-5 ml-5 font-extrabold text-RichGray mt-5">
              Choose Your Outcome budget
            </div>
            <div className="mt-4  flex justify-between flex-wrap w-full gap-y-5 ">
              {budgets.map((budget) => {
                return (
                  <DrawerClose
                    onClick={() => {
                      updateFormFiled("budget", budget.name);
                      nextStage();
                    }}
                    className="p-2.5 w-[48%] bg-RichGray hover:bg-DeepGray rounded-lg flex justify-center items-center gap-2 hover:border  transition-all "
                  >
                    <div
                      className=" w-3 h-3 rounded-full"
                      style={{ backgroundColor: budget.color }}
                    ></div>
                    <div className=" text-lg text-White font-semibold ">
                      {budget.name}
                    </div>
                  </DrawerClose>
                );
              })}
            </div>
            <DrawerClose className="p-4 w-full bg-DeepGray rounded-xl mt-6 flex justify-center items-center gap-2 hover:border  transition-all text-lg font-semibold text-White ">
              Close
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>
    </StageWraper>
  );
};

export default Satge1;
