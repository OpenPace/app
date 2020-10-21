import React, { createContext, useContext, useState } from "react";
import User, { UserParams } from "../api/models/User";
import { saveMe } from "../services/UserService";

type ContextType = {
  user: User;
  saveUser: (params: UserParams) => Promise<void>;
};

type Props = {
  authToken: string;
  user: User;
  children: React.ReactNode;
};

export const UserContext = createContext<ContextType>({} as any);

function UserProvider(props: Props) {
  const [user, setUser] = useState<User>(props.user);
  const { authToken } = props;

  async function saveUser(params: UserParams) {
    await saveMe(params, { authToken });
    setUser({
      ...user,
      ...params,
    } as User);
  }

  const value: ContextType = {
    user,
    saveUser,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

function useUserContext() {
  return useContext(UserContext);
}

export { UserProvider, useUserContext };
