import Sidebar from "@components/Sidebar";

import cls from "./dashboard.module.scss";
import MainBoard from "@/components/MainBoard/intex";

const DashBoard = () => {
  return (
    <div className={cls.main}>
      <Sidebar />
      <MainBoard />
    </div>
  );
};

export default DashBoard;
