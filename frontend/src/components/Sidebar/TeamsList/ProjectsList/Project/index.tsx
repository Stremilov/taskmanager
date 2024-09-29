import { FC, FocusEventHandler, useState } from "react";
import { selectChosenProject } from "@/redux/slices/teams/selectors";
import { chooseProject } from "@/redux/slices/teams/teamsSlice";
import { IProject } from "@/redux/types/types";
import { useAppDispatch, useAppSelector } from "@/redux/utils/hooks";

import PencilIcon from "@assets/pics/PencilIcon";
import GithubLogo from "@/assets/pics/GithubLogo";

import cls from "./project.module.scss";

const RenamingBtn: FC<{ onClickFunc: () => void }> = ({ onClickFunc }) => {
  return (
    <button className={cls.renamingBtn} onClick={onClickFunc}>
      <PencilIcon />
    </button>
  );
};

const Project: FC<IProject> = (project) => {
  const [isRenamingActive, setIsRenamingActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const currentProject = useAppSelector(selectChosenProject);

  const isProjectActive = currentProject.id === project.id;

  const handleChooseProject = (id: string): void => {
    dispatch(chooseProject(id));
  };

  const handleNameChange: FocusEventHandler<HTMLInputElement> = (e): void => {
    const newProjectName = e.target.value;

    if (newProjectName !== project.name) {
      console.log("Имя поменялось");
    }

    setIsRenamingActive(false);
  };

  return (
    <button
      className={`${cls.main} ${isProjectActive ? cls.active : ""}`}
      key={project.id}
      onClick={() => handleChooseProject(project.id)}
    >
      {isRenamingActive ? (
        <input
          autoFocus
          type="text"
          defaultValue={project.name}
          className={cls.renamingInput}
          onBlur={handleNameChange}
        />
      ) : (
        project.name
      )}
      {isProjectActive ? (
        <p className={cls.subBttns}>
          <RenamingBtn onClickFunc={() => setIsRenamingActive(true)} />
          <a
            href={`https://github.com/${"someUrl"}/${project.name}`}
            target="_blank"
          >
            <GithubLogo />
          </a>
        </p>
      ) : null}
    </button>
  );
};

export default Project;
