import {
  selectChosenProjectName,
  selectChosenProjectTasksAmount,
} from "@/redux/slices/teams/selectors";
import { useAppSelector } from "@/redux/utils/hooks";

import GalochkaIcon from "@assets/pics/galochka.svg";
import BoardSettingIcon from "@assets/pics/boardSetting.svg";
import CalendarIcon from "@assets/pics/calendar.svg";

import cls from "./heading.module.scss";

const validateNumeral = (num: number) => {
  const numEnding = num % 10;

  if (num === 1 || (num > 20 && numEnding === 1)) {
    return "задача";
  }

  if (numEnding === 0 || numEnding > 4) {
    return "задач";
  }

  return "задачи";
};

const Heading = () => {
  const name = useAppSelector(selectChosenProjectName);
  const tasksAmount = useAppSelector(selectChosenProjectTasksAmount);

  const lastChangedBy = "Петр Ильич";
  const lastUpdated =
    "" + new Date(Date.now() - 3600 * 1000 * 72).toLocaleDateString("ru-RU");

  return (
    <>
      <h1 className={cls.heading}>{name ? name : "Название проекта"}</h1>
      <p className={cls.subHeading}>
        <span className={cls.tasksAmount}>
          <img src={GalochkaIcon} alt="galochka" />
          {tasksAmount + " " + validateNumeral(tasksAmount)}
        </span>
        <span>{"⚬"}</span>
        <span>
          {lastChangedBy} обновил(а) {lastUpdated}
        </span>
      </p>
      <p>
        <p className={cls.settings}>
          <span className={cls.setting + " " + cls.activeSetting}>
            <img src={BoardSettingIcon} alt="board option" />
            Board
          </span>
          <span className={cls.setting}>
            <img src={CalendarIcon} alt="board option" />
            Calendar
          </span>
        </p>
        {/*  #e9eaeb === var(--default-100); */}
        <hr color="#e9eaeb" className={cls.settingLine} />
      </p>
    </>
  );
};

export default Heading;
