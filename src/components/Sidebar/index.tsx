import UserInfo from "@/components/Sidebar/UserInfo";
import TeamsList from "@/components/Sidebar/TeamsList";
import cls from "./sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={cls.main}>
      <UserInfo />
      <TeamsList />
    </div>
  );
};

export default Sidebar;
