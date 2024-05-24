import { Card } from "@/types";
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import dayjs from "dayjs";

const CreditCard = ({ card }: { card: Card }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger className="relative h-44 w-full  text-FadedGray ">
          {" "}
          <div className="w-full z-10 rounded-xl flex flex-col justify-between items-start  hover:border-FadedGray transition-all hover:border-[2px] h-full shadow-lg bg-gradient-to-bl from-[#8B4EB5] to-[#4744A7] overflow-hidden relative">
            <img
              src="/Credit-Card-illustration.svg"
              className="absolute w-full h-full opacity-20  object-cover"
            />{" "}
            <div className=" text-left">
              {" "}
              <div className="font-bold mt-4 ml-6 text-lg ">{card.name}</div>
              <div className="font-bold mt-1 ml-6  text-xl tracking-widest text-FadedGray">
                •••• •••• •••• 1234
              </div>
            </div>
            <div className=" w-full flex-col flex justify-center items-center mb-5">
              <div className="w-[80%] flex justify-between items-center font-bold  text-lg mb-1">
                <div>
                  {dayjs().isBefore(dayjs().set("date", card.resetDay))
                    ? dayjs().set("date", card.resetDay).subtract(1, "month").format("DD/MM")
                    : dayjs().set("date", card.resetDay).format("DD/MM")}
                </div>
                <div>
                  {" "}
                  {dayjs().isBefore(dayjs().set("date", card.resetDay))
                    ? dayjs().set("date", card.resetDay).format("DD/MM")
                    : dayjs().set("date", card.resetDay).add(1, "month").format("DD/MM")}
                </div>
              </div>
              <div className="flex w-[80%] justify-center items-center">
                <div className=" w-full bg-White/20 h-2 rounded-full">
                  <div
                    style={{
                      width: `${(card.amountUsed / card.limit) * 100}%`,
                    }}
                    className=" h-2 rounded-full bg-White"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute z-[-10] w-[90%] h-full rounded-xl bg-RichGray top-4 left-1/2 -translate-x-1/2"></div>
        </TooltipTrigger>
        <TooltipContent className=" font-semibold text-xl ">
          {card.amountUsed}₪/ {card.limit}₪
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CreditCard;
