import Avatar from "@components/User/Avatar";

import cls from "./userInfo.module.scss";

const UserInfo = () => {
  const userName = "Petya";
  const email = "petya@pochta.ru";
  return (
    <div className={cls.main}>
      <Avatar />
      <div>
        <div className={cls.userName}>{userName}</div>
        <div className={cls.email}>{email}</div>
      </div>
    </div>
  );
};

export default UserInfo;
