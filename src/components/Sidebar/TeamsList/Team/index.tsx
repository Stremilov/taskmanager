import { FC, useState } from "react";

import ProjectsList from "@components/Sidebar/TeamsList/ProjectsList";

import arrowDownPic from "@assets/pics/arrowDown.svg";

import cls from "./team.module.scss";

type Props = {
  teamName: string;
};

const Team: FC<Props> = ({ teamName }) => {
  const [showProjects, setShowProjects] = useState<boolean>(false);

  return (
    <>
      <p className={cls.heading}>
        <button
          id="hideProjectBtn"
          className={cls.hideProjectBtn}
          onClick={() => setShowProjects((prev) => !prev)}
        >
          <img
            src={arrowDownPic}
            className={cls.arrow}
            style={{ transform: showProjects ? "" : "rotate(270deg)" }}
          />
          <span className={cls.teamName}>{teamName}</span>
        </button>
        <button className={cls.createTeamBtn}>+</button>
      </p>
      {showProjects && <ProjectsList teamName={teamName} />}
    </>
  );
};

export default Team;
