import { FC } from "react";
import { useAppSelector } from "@/redux/utils/hooks";
import { selectChosenProjectsTasks } from "@/redux/slices/teams/selectors";
import Heading from "./Heading";
import cls from "./tasksList.module.scss";
import AddNewTaskBtn from "./AddNewTaskBtn";
import Task from "./Task";

export type TasksListsTypes = "notDone" | "inProgress" | "checking" | "done";

const listsNames = {
  notDone: "Не начато",
  inProgress: "В работе",
  checking: "На проверке",
  done: "Завершено",
};

const TasksList: FC<{ type: TasksListsTypes }> = ({ type }) => {
  const tasks = useAppSelector(selectChosenProjectsTasks);

  return (
    <div className={cls.main}>
      <Heading text={listsNames[type]} />
      <div className={cls.body}>
        {tasks.map((task) => (
          <Task {...task} />
        ))}
      </div>
      <AddNewTaskBtn />
    </div>
  );
};

export default TasksList;
