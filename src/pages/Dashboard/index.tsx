import Sidebar from "@components/Sidebar";

import cls from "./dashboard.module.scss";
import MainBoard from "@/components/MainBoard/intex";
import { SessionContext } from "@/layouts/RootLayout";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const { user } = useContext(SessionContext);
  const navigate = useNavigate();
  console.log(user);
  if (user) {
    return (
      <div className={cls.main}>
        <Sidebar />
        <MainBoard />
      </div>
    );
  } else {
    navigate("/");
    return (
      <div className={cls.unauthorized}>
        Вы не авторизованы
        <a className={cls.authLink} href="/auth">
          Перейти на страницу авторизации
        </a>
      </div>
    );
  }
};

export default DashBoard;
