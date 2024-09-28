import { FC, useState } from "react";

import ProjectsList from "@/components/Sidebar/TeamsList/ProjectsList";

import arrowDownPic from "@assets/pics/arrowDown.svg";

import cls from "./team.module.scss";
import { useAppDispatch } from "@/redux/utils/hooks";
import { chooseTeam } from "@/redux/slices/teams/teamsSlice";
import { ITeam } from "@/redux/types/types";

const Team: FC<ITeam> = ({ id, name, projects }) => {
  const dispatch = useAppDispatch();

  const [showProjects, setShowProjects] = useState<boolean>(false);

  const clickHandler = () => {
    setShowProjects((prev) => !prev);
    dispatch(chooseTeam(id));
  };

  return (
    <>
      <p className={cls.heading}>
        <button
          id="hideProjectBtn"
          className={cls.hideProjectBtn}
          onClick={clickHandler}
        >
          <img
            src={arrowDownPic}
            className={cls.arrow}
            style={{ transform: showProjects ? "" : "rotate(270deg)" }}
          />
          <span className={cls.teamName}>{name}</span>
        </button>
        <button className={cls.createTeamBtn}>+</button>
      </p>
      {showProjects && <ProjectsList projects={projects} />}
    </>
  );
};

export default Team;
