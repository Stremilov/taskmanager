import { useAppSelector } from "@/redux/utils/hooks";
import cls from "./mainBoard.module.scss";
import TasksList, { TasksListsTypes } from "./TasksList";
import { selectChosenTeam } from "@/redux/slices/teams/selectors";

const tasksListsTypes: TasksListsTypes[] = [
  "notDone",
  "inProgress",
  "checking",
  "done",
];

const MainBoard = () => {
  const selectedTeam = useAppSelector(selectChosenTeam);
  const { id, name } = selectedTeam;

  return (
    <div className={cls.layout}>
      <h1 className={cls.heading}>{name ? name : "Team Name"}</h1>
      <div className={cls.main}>
        {tasksListsTypes.map((type) => (
          <TasksList type={type} key={type} />
        ))}
      </div>
    </div>
  );
};

export default MainBoard;
