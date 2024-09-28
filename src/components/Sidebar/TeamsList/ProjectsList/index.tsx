import { FC } from "react";

import cls from "./projectsList.module.scss";
import { IProject } from "@/redux/types/types";
import Project from "./Project";

interface ProjectsListProps {
  projects: IProject[];
}

const ProjectsList: FC<ProjectsListProps> = ({ projects }) => {
  return (
    <ul className={cls.list}>
      {projects.map((project) => {
        return (
          <li key={project.id}>
            <Project {...project} />
          </li>
        );
      })}
    </ul>
  );
};

export default ProjectsList;
