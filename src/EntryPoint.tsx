import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./hooks";
import { getAllBudgets, getAllSources, login } from "./redux/userDataSlice";
import { getAllTransactions } from "./redux/transactionsSlice";
import axios from "axios";

import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { getAllCards } from "./redux/cardsSlice";

dayjs.extend(utc);

const EntryPoint = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCards());
    dispatch(getAllSources());
    dispatch(getAllTransactions());
    dispatch(getAllBudgets());
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API}/auth/verifyToken`,
        {
          withCredentials: true,
        }
      );
      if (!response.data.username) {
        navigate("/login");

        return;
      }

      dispatch(login(response.data.username as string));
    };
    verifyToken();
  }, []);

  return <Outlet />;
};

export default EntryPoint;
