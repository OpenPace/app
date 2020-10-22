import React, { createContext, useContext, useState } from "react";
import UserPrefs, { UserPrefsParams } from "../api/models/UserPrefs";
import { savePrefs as saveUserPrefs } from "../services/UserService";

type ContextType = {
  userPrefs: UserPrefs;
  savePrefs: (params: UserPrefsParams) => Promise<void>;
};

type Props = {
  authToken: string;
  userPrefs: UserPrefs;
  children: React.ReactNode;
};

export const UserPrefsContext = createContext<ContextType>({} as any);

function UserPrefsProvider(props: Props) {
  const [userPrefs, setUserPrefs] = useState<UserPrefs>(props.userPrefs);
  const { authToken } = props;

  async function savePrefs(params: UserPrefsParams) {
    await saveUserPrefs(params, { authToken });
    setUserPrefs({
      ...userPrefs,
      ...params,
    } as UserPrefs);
  }

  const value: ContextType = {
    userPrefs,
    savePrefs,
  };

  return (
    <UserPrefsContext.Provider value={value}>
      {props.children}
    </UserPrefsContext.Provider>
  );
}

function useUserPrefsContext() {
  return useContext(UserPrefsContext);
}

export { UserPrefsProvider, useUserPrefsContext };
