import Sidebar from "@components/Sidebar";

import cls from "./dashboard.module.scss";

const DashBoard = () => {
  return (
    <div className={cls.main}>
      <Sidebar />
    </div>
  );
};

export default DashBoard;
