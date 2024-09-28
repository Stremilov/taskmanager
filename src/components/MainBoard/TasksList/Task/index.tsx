import { FC } from "react";

import cls from "./task.module.scss";
import Avatar from "@/components/User/Avatar";

interface Props {
  id: string;
  heading: string;
  description: string;
  authorId: string;
}

const Task: FC<Props> = ({ id, heading, description, authorId }) => {
  return (
    <div className={cls.main}>
      <p className={cls.taskId}>{"#" + id}</p>
      <h1 className={cls.heading}>{heading}</h1>
      <p className={cls.description}>{description}</p>
      <div className={cls.author}>
        <Avatar size={24} />
        <span>{"Имя пользователя"}</span>
      </div>
    </div>
  );
};

export default Task;
