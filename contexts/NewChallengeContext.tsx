import React, { createContext, useContext, useState } from "react";
import {
  ActivityType,
  ChallengeType,
  ChallengeTimeline,
} from "../api/models/Challenge";

interface Params {
  name?: string;
  activityType?: ActivityType;
  challengeType?: ChallengeType;
  timeline?: ChallengeTimeline;
  startAt?: Date;
  endAt?: Date;
}

type ContextType = {
  params: Params;
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
  const [params, setParams] = useState<Params>({} as Params);

  const value: ContextType = {
    params,
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
