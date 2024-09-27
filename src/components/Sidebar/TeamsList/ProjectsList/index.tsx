import { FC } from "react";

import cls from "./projectsList.module.scss";

interface ProjectsListProps {
  teamName: string;
}

const ProjectsList: FC<ProjectsListProps> = ({ teamName }) => {
  console.log("Ща покажу проекты команды", teamName);
  const availableProject = [
    {
      id: 333,
      name: "Личный кабинет СПбГУТ",
    },
    {
      id: 555,
      name: "Телеграм бот для Проекта ИСТ",
    },
  ];

  return (
    <ul className={cls.list}>
      {availableProject.map((project) => {
        return (
          <li className={cls.project} key={project.id}>
            {project.name}
          </li>
        );
      })}
    </ul>
  );
};

export default ProjectsList;
