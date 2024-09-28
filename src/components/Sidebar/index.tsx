import UserInfo from "@/components/Sidebar/UserInfo";
import TeamsList from "@/components/Sidebar/TeamsList";

import UsersIcon from "@assets/pics/users.svg";
import Logo from "@assets/pics/logoTechDep.svg";
import cls from "./sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={cls.main}>
      <p>
        <UserInfo />
        <div className={cls.teamsHeader}>
          <img src={UsersIcon} width={10} height={10} />
          Teams
        </div>
        <TeamsList />
      </p>

      <div className={cls.footer}>
        <hr className={cls.footerLine} color="rgba(41, 48, 61, 1)" />
        <img
          src={Logo}
          width={126}
          height={126}
          alt="Logo of tech department SPbSUT"
        />
      </div>
    </div>
  );
};

export default Sidebar;
