import { FC } from "react";

import Avatar from "@/components/User/Avatar";

import ClockIcon from "@assets/pics/clock.svg";

import cls from "./task.module.scss";
import { ITask } from "@/redux/types/types";
import GithubLogo from "@/assets/pics/GithubLogo";
import DifficultyEclipse from "@/assets/pics/difficultyEclipse.svg";

const difficulties = [null, "Easy", "Middle", "Hard"];

const Difficulty: FC<{ taskDifficulty: number }> = ({ taskDifficulty }) => {
  // 1-2-3
  const dots = [];
  for (let i = 0; i < taskDifficulty; i++) {
    dots[i] = (
      <img
        key={i}
        width={6}
        height={6}
        src={DifficultyEclipse}
        alt="difficulty eclipse for scaling"
      />
    );
  }

  return (
    <div className={cls.difficulty}>
      <p className={cls.dots}>{dots.map((dot) => dot)}</p>
      {difficulties[taskDifficulty]}
    </div>
  );
};

const Task: FC<ITask> = ({
  id,
  name,
  description,
  difficulty = 1,
  authorId,
}) => {
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
      <p className={cls.heading}>
        <h1 className={cls.title}>{name}</h1>
        <Difficulty taskDifficulty={difficulty} />
      </p>
      <p className={cls.description}>{description}</p>
      <div className={cls.bottom}>
        <div className={cls.author}>
          <Avatar size={24} />
          <span>{"Имя пользователя"}</span>
        </div>
        <a href={taskLink} className={cls.link} target="_blank">
          <GithubLogo fill="var(--default-500)" />
        </a>
      </div>
    </div>
  );
};

export default Task;
