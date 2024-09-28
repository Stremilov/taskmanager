import UserInfo from "@/components/Sidebar/UserInfo";
import TeamsList from "@/components/Sidebar/TeamsList";

import UsersIcon from "@assets/pics/users.svg";
import Logo from "@assets/pics/logoTechDep.svg";
import cls from "./sidebar.module.scss";
import AddTeamBtn from "./AddTeamBtn";

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
        <AddTeamBtn />
      </p>

      <div className={cls.footer}>
        <hr className={cls.footerLine} color="#29303d" />
        <img
          src={Logo}
          width={106}
          height={42}
          alt="Logo of tech department SPbSUT"
        />
      </div>
    </div>
  );
};

export default Sidebar;
