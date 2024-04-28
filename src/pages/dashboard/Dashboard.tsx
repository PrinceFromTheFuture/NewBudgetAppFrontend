import BalanceCard from "./components/BalanceCard";
import LastActions from "./lastActions/LastActions";
import Chart from "./components/Chart";

const Dashboard = () => {
  return (
    <>
      <h1 className="  text-White text-4xl font-bold ">Dashboard</h1>
      <div className=" mt-10 overflow-auto ">
        <BalanceCard />
        <div className=" flex justify-between items-center gap-12  mt-10">
          <LastActions />
          <Chart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
