import { FC } from "react";

import cls from "./heading.module.scss";

const Heading: FC<{ text: string }> = ({ text }) => {
  return <div className={cls.main}>{text}</div>;
};

export default Heading;
