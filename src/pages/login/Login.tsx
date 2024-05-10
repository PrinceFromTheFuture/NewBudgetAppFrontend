import { useAppDispatch } from "@/hooks";
import { login } from "@/redux/userDataSlice";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erorr, setErorr] = useState("");
  const handleSubmit = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API}/auth/signin`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    if (response.data.username) {
      dispatch(login(response.data.username));
      navigate("/");
    } else {
      setErorr("invalid username or password");
    }
  };
  return (
    <div className=" fixed right-0 left-0 top-0 bottom-0 flex justify-center items-center flex-col bg-DeepGray select-none">
      <div className="w-[70%]">
        <h1 className=" font-semibold text-3xl mb-6 text-left text-White">
          Login To Your Budget
        </h1>
      </div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        className="w-[80%]   bg-RichGray text-White p-3 rounded-full pl-5 text-left outline-DimGray "
      />
      <input
        type="password"
        placeholder="password"
        className="w-[80%]   bg-RichGray text-White p-3 rounded-full pl-5 mt-4 outline-DimGray "
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div
        className=" w-[80%] bg-Purple rounded-full p-4 flex justify-center items-center mt-8 text-xl font-semibold text-DeepGray cursor-pointer"
        onClick={handleSubmit}
      >
        Login
      </div>
      {erorr && (
        <div className="w-[80%] mt-8 bg-Orange/15 rounded-lg p-4 text-white font-medium text-White">
          erorr: {erorr}
        </div>
      )}
    </div>
  );
};

export default Login;
