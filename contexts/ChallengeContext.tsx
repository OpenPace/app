import React, { createContext, useContext, useState } from "react";
import Challenge from "../api/models/Challenge";

type ContextType = {
  challenge: Challenge;
  setChallenge: (value: Challenge) => void;
};

type Props = {
  children: React.ReactNode;
};

export const ChallengeContext = createContext<ContextType>({} as any);

function ChallengeProvider({ children }: Props) {
  const [challenge, setChallenge] = useState({} as Challenge);

  return (
    <ChallengeContext.Provider value={{ challenge, setChallenge }}>
      {children}
    </ChallengeContext.Provider>
  );
}

function useChallengeContext() {
  return useContext(ChallengeContext);
}

export { ChallengeProvider, useChallengeContext };
