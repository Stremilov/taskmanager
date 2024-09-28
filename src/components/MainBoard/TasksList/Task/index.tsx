import { FC } from "react";

import Avatar from "@/components/User/Avatar";

import ClockIcon from "@assets/pics/clock.svg";

import cls from "./task.module.scss";
import { ITask } from "@/redux/types/types";

const Task: FC<ITask> = ({ id, name, description, authorId }) => {
  const date = new Date().toLocaleDateString("ru-RU");

  const taskLink = `http://github.com/${"someUri"}/task/${id}`;

  const copyTaskLink = () => {
    navigator.clipboard.writeText(taskLink);
    alert("Ссылка на задачу скопирована в буффер обмена");
  };

  return (
    <div className={cls.main}>
      <div className={cls.info}>
        <button onClick={copyTaskLink} className={cls.taskId}>
          {"#" + id}
        </button>
        <span className={cls.time}>
          <img src={ClockIcon} alt="" />
          {date}
        </span>
      </div>
      <h1 className={cls.heading}>{name}</h1>
      <p className={cls.description}>{description}</p>
      <div className={cls.author}>
        <Avatar size={24} />
        <span>{"Имя пользователя"}</span>
      </div>
    </div>
  );
};

export default Task;
