import { Fragment } from "react/jsx-runtime";
import Heading from "./Heading";
import cls from "./mainBoard.module.scss";
import TasksList, { TasksListsTypes } from "./TasksList";

const tasksListsTypes: TasksListsTypes[] = [
  "NOT_ACTIVE",
  "ACTIVE",
  "CHECKING",
  "COMPLETED",
];

const MainBoard = () => {
  return (
    <div className={cls.layout}>
      <Heading />
      <div className={cls.main}>
        {tasksListsTypes.map((type) => (
          <Fragment key={type}>
            <TasksList type={type} key={type} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default MainBoard;
