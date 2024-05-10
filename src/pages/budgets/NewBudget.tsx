import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAppDispatch } from "@/hooks";
import { getAllBudgets, submitNewBudget } from "@/redux/userDataSlice";
import { BudgetCategory } from "@/types";
import { PopoverClose } from "@radix-ui/react-popover";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";

const NewBudget = () => {
  const colors = [
    "#A8B0FB",
    "#CAD09A",
    "#D87BA5",
    "#B69AD0",
    "#9AD0A3",
    "#9AD0CE",
    "#CA8181",
    "#8AC379",
    "#7C87D1",
    "#F7A175",
    "#B7C8B5",
    "#7CC2EB",
  ];
  const [newBudgetTimeFrame, setNewBudgetTimeFrame] = useState<{
    start: string;
    end: string;
  }>({ start: dayjs().format("YYYY-MM-DD"), end: dayjs().add(1, "month").format("YYYY-MM-DD") });

  interface budgetCategory {
    id: number;
    name: string;
    scheduled: number;
    color: string;
  }
  const [categories, setCategories] = useState<budgetCategory[]>([]);

  const dispatch = useAppDispatch();
  const handleSubmitNewBudget = async () => {
    dispatch(
      submitNewBudget({
        categories: categories.map(({ id, ...rest }) => rest),
        end: dayjs(newBudgetTimeFrame.end, "YYYY-MM-DD").toString(),
        start: dayjs(newBudgetTimeFrame.start, "YYYY-MM-DD").toString(),
      })
    );
  };
  const handleNewCategory = () => {
    if (categories.length > 10) {
      return;
    }
    setCategories(
      categories.concat({
        color: "",
        id: categories.length,
        name: "new category",
        scheduled: 0,
      })
    );
  };
  const handleDeleteCategory = (id: number) => {
    setCategories(
      categories.filter((category) => {
        if (category.id !== id) {
          return category;
        }
      })
    );
  };

  const handleFiledChange = (
    categoryId: number,
    filed: "name" | "color" | "scheduled",
    value: string | number
  ) => {
    const newCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          [filed]: value,
        };
      } else {
        return category;
      }
    });
    setCategories(newCategories);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className=" bg-RichGray p-2 px-4 text-White font-semibold text-lg rounded-lg cursor-pointer hover:bg-DimGray transition-all">
        {" "}
        create new budget
      </AlertDialogTrigger>
      <AlertDialogContent className="select-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-center">
            <div>Create New Budget</div>
            <AlertDialogCancel className="bg-RichGray text-White">X</AlertDialogCancel>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className=" text-DeepGray font-semibold mt-2 text-xl">
          Select The Time Frame For Your Budget
        </div>
        <div className="w-full flex justify-between gap-2 items-center">
          <div className="w-full ">
            <div className="text-md font-semibold text-DeepGray ml-2 mb-2">From</div>
            <input
              type="date"
              value={newBudgetTimeFrame.start}
              onChange={(e) =>
                setNewBudgetTimeFrame({
                  ...newBudgetTimeFrame,
                  start: e.target.value,
                })
              }
              className="w-full bg-RichGray hover:bg-DeepGray transition-all font-bold cursor-pointer text-White rounded text-center p-3"
            />
          </div>
          <div className="w-full ">
            <div className="text-md font-semibold text-DeepGray ml-2 mb-2">To</div>
            <input
              type="date"
              value={newBudgetTimeFrame.end}
              onChange={(e) => {
                console.log(newBudgetTimeFrame.end);
                setNewBudgetTimeFrame({
                  ...newBudgetTimeFrame,
                  end: e.target.value,
                });
              }}
              className="w-full bg-RichGray hover:bg-DeepGray transition-all font-bold cursor-pointer text-White rounded text-center p-3"
            />
          </div>
        </div>
        <div className=" text-DeepGray font-semibold mt-2 text-xl">
          Create And Edit Your Budget Categories
        </div>
        {categories.map((category) => {
          return (
            <div className="w-full flex justify-between items-center gap-4">
              {" "}
              <Popover>
                <PopoverTrigger
                  key={category.id}
                  className="w-full text-White  flex justify-center items-center p-3 py-2 text-lg  font-semibold rounded-lg cursor-pointer"
                  style={{ backgroundColor: category.color || "gray" }}
                >
                  {category.name}
                </PopoverTrigger>
                <PopoverContent
                  className="text-White "
                  align="start"
                  sideOffset={-20}
                  alignOffset={-10}
                >
                  <div className=" flex justify-between items-center w-full gap-10">
                    <div className="text-lg font-medium">name</div>
                    <input
                      onChange={(e) => {
                        handleFiledChange(category.id, "name", e.target.value);
                      }}
                      type="text"
                      value={category.name}
                      className="outline-DimGray text-DeepGray rounded-md p-1 px-3"
                    />
                  </div>
                  <div className=" flex justify-between items-center w-full gap-10 mt-6">
                    <div className="text-lg font-medium">Scheduled Amount ₪</div>
                    <input
                      min={0}
                      onChange={(e) => {
                        handleFiledChange(category.id, "scheduled", e.target.value);
                      }}
                      type="number"
                      value={category.scheduled}
                      className="outline-DimGray text-DeepGray rounded-md p-1 px-3"
                    />
                  </div>
                  <div className=" flex justify-between items-center w-full gap-10 mt-6">
                    <div className="text-lg font-medium">Color</div>
                    <Popover>
                      <PopoverTrigger
                        className=" w-52 h-7 rounded-md hover:outline hover:outline-2 outline-FadedGray "
                        style={{ backgroundColor: category.color || "#ffffff" }}
                      ></PopoverTrigger>
                      <PopoverContent className="bg-White flex justify-start flex-wrap gap-3  w-[200px]">
                        {colors.map((color) => {
                          return (
                            <PopoverClose
                              key={color}
                              className=" w-8 h-8 cursor-pointer rounded-md hover:outline hover:outline-2 outline-RichGray transition-all"
                              style={{ backgroundColor: color }}
                              onClick={() => {
                                handleFiledChange(category.id, "color", color);
                              }}
                            ></PopoverClose>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </div>
                </PopoverContent>
              </Popover>
              <div
                className=" h-full w-[20%] bg-RichGray rounded-lg flex justify-center items-center text-White font-bold cursor-pointer"
                onClick={() => {
                  handleDeleteCategory(category.id);
                }}
              >
                del
              </div>
            </div>
          );
        })}
        <div
          onClick={handleNewCategory}
          className="w-full bg-FadedGray/50  flex justify-center items-center p-3 text-lg  font-semibold rounded-lg cursor-pointer"
        >
          New Category...
        </div>
        <AlertDialogAction
          onClick={() => {
            handleSubmitNewBudget();
          }}
          className="w-full bg-RichGray hover:bg-DeepGray transition-all font-bold cursor-pointer text-White rounded text-center p-3"
        >
          Create
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewBudget;
