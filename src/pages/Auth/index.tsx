import { useContext, useEffect } from "react";
import cls from "./auth.module.scss";
import { SessionContext } from "@/layouts/RootLayout";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const { user, setUser } = useContext(SessionContext);

  const navigate = useNavigate();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  console.log(window.location);

  console.log(user);

  if (codeParam && localStorage.getItem("accessToken") === null) {
    async function getAccessToken() {
      await fetch(`${window.location.origin}/access_token`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // localStorage.setItem("accessToken", data);
        });
    }
    getAccessToken();
  }

  const authorize = async () => {
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
