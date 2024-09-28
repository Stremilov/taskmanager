import { FC } from "react";
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

const tasks = [
  {
    id: "1",
    heading: "Задача 1",
    description: "Описание задачи 1",
    authorId: "1",
  },
  {
    id: "2",
    heading: "Задача 2",
    description: "Описание задачи 2",
    authorId: "2",
  },
];

const TasksList: FC<{ type: TasksListsTypes }> = ({ type }) => {
  return (
    <div className={cls.main}>
      <Heading text={listsNames[type]} />
      <div className={cls.body}>
        {tasks.map((task) => (
          <Task
            id={task.id}
            key={task.id}
            heading={task.heading}
            description={task.description}
            authorId={task.authorId}
          />
        ))}
      </div>
      <AddNewTaskBtn />
    </div>
  );
};

export default TasksList;
