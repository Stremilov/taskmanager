import { useAppSelector } from "@/redux/utils/hooks";
import cls from "./mainBoard.module.scss";
import TasksList, { TasksListsTypes } from "./TasksList";
import { selectChosenProject } from "@/redux/slices/teams/selectors";

const tasksListsTypes: TasksListsTypes[] = [
  "notDone",
  "inProgress",
  "checking",
  "done",
];

const MainBoard = () => {
  const selectedProject = useAppSelector(selectChosenProject);
  const { name } = selectedProject;

  return (
    <div className={cls.layout}>
      <h1 className={cls.heading}>{name ? name : "Название проекта"}</h1>
      <div className={cls.main}>
        {tasksListsTypes.map((type) => (
          <TasksList type={type} key={type} />
        ))}
      </div>
    </div>
  );
};

export default MainBoard;
