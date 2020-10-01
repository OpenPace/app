import React, { createContext, useContext, useState } from "react";
import {
  ActivityType,
  ChallengeType,
  ChallengeTimeline,
  ChallengeParams
} from "../api/models/Challenge";

type ContextType = {
  params: ChallengeParams;
  reset: () => void;
  setName: (name: string) => void;
  setActivityType: (activityType: ActivityType) => void;
  setChallengeType: (challengeType: ChallengeType) => void;
  setTimeline: (timeline: ChallengeTimeline) => void;
};

type Props = {
  children: React.ReactNode;
};

export const NewChallengeContext = createContext<ContextType>({} as any);

function NewChallengeProvider({ children }: Props) {
  const [params, setParams] = useState<ChallengeParams>({} as ChallengeParams);

  const value: ContextType = {
    params,
    reset: () => setParams({} as ChallengeParams),
    setName: (name) => setParams({ ...params, name }),
    setActivityType: (activityType) => setParams({ ...params, activityType }),
    setChallengeType: (challengeType) =>
      setParams({ ...params, challengeType }),
    setTimeline: (timeline) => setParams({ ...params, timeline }),
  };

  return (
    <NewChallengeContext.Provider value={value}>
      {children}
    </NewChallengeContext.Provider>
  );
}

function useNewChallengeContext() {
  return useContext(NewChallengeContext);
}

export { NewChallengeProvider, useNewChallengeContext };
