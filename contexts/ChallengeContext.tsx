import React, { createContext, useContext, useState } from "react";
import Challenge, { ChallengeParams } from "../api/models/Challenge";
import {
  createChallenge as apiCreateChallenge,
  getChallengesByUser,
  getChallenge as apiGetChallenge,
} from "../services/ChallengeService";

type ContextType = {
  challenge: Challenge | undefined;
  challenges: Challenge[];
  setChallenge: (value: Challenge | undefined) => void;
  createChallenge: (params: ChallengeParams) => Promise<Challenge>;
  getChallenge: (slug: string) => Promise<Challenge>;
  fetchChallenge: (slug: string) => Promise<Challenge>;
  loadChallenges: () => Promise<void>;
  loading: boolean;
};

type Props = {
  authToken: string;
  children: React.ReactNode;
};

export const ChallengeContext = createContext<ContextType>({} as any);

function ChallengeProvider({ authToken, children }: Props) {
  const [challenge, setChallenge] = useState<Challenge | undefined>(undefined);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(false);

  function addToChallenges(challengeToAdd: Challenge) {
    const idx = challenges.findIndex((x) => x.slug === challengeToAdd.slug);
    if (idx !== -1) {
      challenges.splice(idx, 1, challengeToAdd); // Delete the existing challenge
    } else {
      challenges.unshift(challengeToAdd);
    }
    setChallenges(challenges);
  }

  async function loadChallenges() {
    setLoading(true);
    const allChallenges = await getChallengesByUser({ authToken });
    setChallenges(allChallenges);
    setLoading(false);
  }

  async function createChallenge(params: ChallengeParams) {
    setLoading(true);
    const newChallenge = await apiCreateChallenge(params, { authToken });
    addToChallenges(newChallenge);
    setLoading(false);
    return newChallenge;
  }

  async function getChallenge(slug: string) {
    let c = challenges.find((x) => x.slug === slug);
    if (!c) {
      c = await apiGetChallenge(slug, { authToken });
      addToChallenges(c);
    }

    setChallenge(c);
    return Promise.resolve(c);
  }

  async function fetchChallenge(slug: slug) {
    const c = await apiGetChallenge(slug, { authToken });
    addToChallenges(c);
    setChallenge(c);
    return Promise.resolve(c);
  }

  const value: ContextType = {
    challenge,
    challenges,
    setChallenge,
    createChallenge,
    getChallenge,
    fetchChallenge,
    loadChallenges,
    loading,
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
}

function useChallengeContext() {
  return useContext(ChallengeContext);
}

export { ChallengeProvider, useChallengeContext };
