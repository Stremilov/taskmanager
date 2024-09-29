import { FC, Fragment } from "react";
import { useAppSelector } from "@/redux/utils/hooks";
import { selectChosenProjectsTasksByType } from "@/redux/slices/teams/selectors";
import Heading from "./Heading";
import cls from "./tasksList.module.scss";
import AddNewTaskBtn from "./AddNewTaskBtn";
import Task from "./Task";

export type TasksListsTypes =
  | "NOT_ACTIVE"
  | "ACTIVE"
  | "CHECKING"
  | "COMPLETED";

const listsNames = {
  NOT_ACTIVE: "Не начато",
  ACTIVE: "В работе",
  CHECKING: "На проверке",
  COMPLETED: "Завершено",
};

const TasksList: FC<{ type: TasksListsTypes }> = ({ type }) => {
  const tasks = useAppSelector(selectChosenProjectsTasksByType(type));

  return (
    <div className={cls.main}>
      <Heading text={listsNames[type]} />
      <div className={cls.body}>
        {tasks.map((task) => (
          <Fragment key={task.id}>
            <Task {...task} />
          </Fragment>
        ))}
      </div>
      <AddNewTaskBtn />
    </div>
  );
};

export default TasksList;
