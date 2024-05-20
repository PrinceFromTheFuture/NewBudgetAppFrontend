import React, { useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/hooks";
import { getAllSourcesSelector } from "@/redux/userDataSlice";
import { getAllTransactionsSelector } from "@/redux/transactionsSlice";
import dayjs from "dayjs";

const SourcesAndCards = () => {
  const sources = useAppSelector(getAllSourcesSelector);

  const allTransactions = useAppSelector(getAllTransactionsSelector);
  const todayTransactions = allTransactions.filter((transaction) =>
    dayjs(transaction.date).isSame(dayjs(), "day")
  );

  if (sources.length === 0) {
    return <div>loading...</div>;
  }
  return (
    <>
      <h1 className="  text-White text-4xl font-bold ">Sources and cards</h1>
      <section className=" mt-5">
        <h2 className="text-White text-2xl font-semibold ml-3 mb-2 ">
          Sources
        </h2>
        <Carousel
          opts={{
            loop: true,
            align: "start",
            watchDrag: false,
          }}
          className="w-full max-w-[95%]"
        >
          <CarouselContent>
            {sources.map((source, index) => {
              const relatedTransactions = todayTransactions.filter(
                (transaction) => transaction.source === source.name
              );

              let todaysSourceBalance = 0;
              if (relatedTransactions.length > 0) {
                todaysSourceBalance = relatedTransactions
                  .map((transaction) => transaction.amount)
                  .reduce((amount, icn) => (amount += icn));
              }
              return (
                <CarouselItem key={source._id} className="basis-1/4">
                  <Card className="w-full  bg-RichGray ">
                    <CardHeader className="mb-0">
                      <div>
                        <div className="tracking-tight text-FadedGray text-xl font-semibold flex justify-start gap-3 items-center">
                          <div
                            className="w-10 h-10 rounded-lg p-3"
                            style={{ backgroundColor: source.color }}
                          >
                            <img src={source.icon}></img>
                          </div>
                          <div> {source.name}</div>
                        </div>
                        <div className="font-bold text-4xl text-White mt-3">
                          {source.balance.toFixed(2)}₪
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="text-White text-lg font-medium">
                      {todaysSourceBalance}₪{" "}
                      {todaysSourceBalance > 0 ? "spent" : "profit"} today
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {sources.length > 4 && (
            <CarouselNext className="bg-RichGray border-none hover:bg-DimGray transition-all rounded-lg h-[80%]" />
          )}
        </Carousel>
      </section>
    </>
  );
};

export default SourcesAndCards;
