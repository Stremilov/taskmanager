import { useContext, useEffect } from "react";
import cls from "./auth.module.scss";
import { SessionContext } from "@/layouts/RootLayout";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const { user, setUser } = useContext(SessionContext);
  const navigate = useNavigate();
  console.log(user);

  const authorize = () => {
    setUser({
      name: "Pasha",
      email: "PashaCrut@mail.ru",
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <div className={cls.main}>
      <h1>Авторизуйтесь с помощью GitHub</h1>
      <button onClick={authorize} className={cls.loginBtn}>
        Войти
      </button>
    </div>
  );
};

export default Auth;
