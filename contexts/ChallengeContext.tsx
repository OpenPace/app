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

  function addToChallenges(challenge: Challenge) {
    const idx = challenges.findIndex((x) => x.slug === challenge.slug);
    if (idx !== -1) {
      challenges.splice(idx, 1, challenge); // Delete the existing challenge
    } else {
      challenges.unshift(challenge);
    }
    setChallenges(challenges);
  }

  async function loadChallenges() {
    setLoading(true);
    const allChallenges = await getChallengesByUser({ authToken: authToken });
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
    let challenge = challenges.find((x) => x.slug === slug);
    if (!challenge) {
      challenge = await apiGetChallenge(slug, { authToken });
      addToChallenges(challenge);
    }

    setChallenge(challenge);
    return Promise.resolve(challenge);
  }

  async function fetchChallenge(slug: slug) {
    const challenge = await apiGetChallenge(slug, { authToken });
    addToChallenges(challenge);
    setChallenge(challenge);
    return Promise.resolve(challenge);
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
