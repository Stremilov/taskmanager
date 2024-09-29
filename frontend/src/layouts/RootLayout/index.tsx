import { Outlet } from "react-router-dom";
import { createContext, useMemo, useState } from "react";

type SessionContextType = {
  user: null | object;
  setUser: (user: null | object) => void;
};

export const SessionContext = createContext<SessionContextType>({
  user: null,
  setUser: () => {
    return;
  },
});

const RootLayout = () => {
  const [userInfo, setUserInfo] = useState<null | object>(null);
  const contextValue = useMemo(
    () => ({ user: userInfo, setUser: setUserInfo }),
    [userInfo]
  );
  return (
    <SessionContext.Provider value={contextValue}>
      <Outlet />
    </SessionContext.Provider>
  );
};

export default RootLayout;
