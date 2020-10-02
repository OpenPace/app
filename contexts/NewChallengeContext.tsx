import React, { createContext, useContext, useState } from "react";
import { DateTime } from "luxon";
import {
  ActivityType,
  ChallengeType,
  ChallengeTimeline,
  ChallengeParams,
} from "../api/models/Challenge";

type ContextType = {
  params: ChallengeParams;
  reset: () => void;
  setName: (name: string) => void;
  setActivityType: (activityType: ActivityType) => void;
  setChallengeType: (challengeType: ChallengeType) => void;
  setTimeline: (timeline: ChallengeTimeline) => void;
  setDates: (startAt: DateTime, endAt: DateTime) => void;
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
    setDates: (startAt, endAt) => {
      console.log("start: ", startAt.toISO());
      console.log("end: ", endAt.toISO());
      setParams({ ...params, startAt, endAt });
    },
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
