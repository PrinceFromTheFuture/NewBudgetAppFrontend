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
import { allCardsSelector, getAllCards } from "@/redux/cardsSlice";
import CreditCard from "@/components/CreditCard";

const SourcesAndCards = () => {
  const allSources = useAppSelector(getAllSourcesSelector);

  const allTransactions = useAppSelector(getAllTransactionsSelector);
  const todayTransactions = allTransactions.filter((transaction) =>
    dayjs(transaction.date).isSame(dayjs(), "day")
  );
  const allCards = useAppSelector(allCardsSelector);

  function formatCurrency(amount: number) {
    // Ensure the amount is a number with two decimal places
    let formattedAmount = amount.toFixed(2);
    // Use regex to add commas as thousand separators
    formattedAmount = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Append the dollar sign at the end
    return `${formattedAmount}₪`;
  }

  if (allSources.length === 0 || allCards.length === 0) {
    return <div>loading...</div>;
  }

  const totalFunds =
    allSources.map((source) => source.balance).reduce((a, b) => a + b) -
    allCards.map((card) => card.amountUsed).reduce((a, b) => a + b);

  return (
    <>
      <h1 className="  text-White text-4xl font-bold ">Sources and cards</h1>
      <h2 className="text-White text-2xl font-semibold ml-3 mt-5 ">Total Funds</h2>
      <h1 className="   text-5xl font-extrabold text-White mt-4 ml-4 p-4 transition-all hover:bg-RichGray rounded-xl">
        {formatCurrency(totalFunds)}
      </h1>

      <section className=" mt-5">
        <h2 className="text-White text-2xl font-semibold ml-3 mb-4 ">Sources</h2>
        <Carousel
          opts={{
            loop: true,
            align: "start",
            watchDrag: false,
          }}
          className="w-full max-w-[95%]"
        >
          <CarouselContent>
            <CarouselPrevious className=" invisible" hidden />
            {allSources.map((source, index) => {
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
                <CarouselItem key={source._id} className="basis-1/5">
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
                      {todaysSourceBalance}₪ {todaysSourceBalance > 0 ? "spent" : "profit"} today
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {allSources.length > 5 && (
            <CarouselNext className="bg-RichGray border-none hover:bg-DimGray transition-all rounded-lg h-[80%]" />
          )}
        </Carousel>
        <Carousel
          opts={{
            loop: false,
            align: "start",
            watchDrag: false,
          }}
          className="w-full max-w-[95%]"
        >
          <CarouselContent className="mt-12">
            {allCards.map((card, index) => {
              return (
                <CarouselItem key={card._id} className="basis-1/4">
                  <CreditCard card={card} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {allCards.length > 4 && (
            <CarouselNext className="bg-RichGray border-none hover:bg-DimGray transition-all rounded-lg h-[80%]" />
          )}
        </Carousel>
      </section>
    </>
  );
};

export default SourcesAndCards;
