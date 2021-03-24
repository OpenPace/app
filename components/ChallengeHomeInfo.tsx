import React, { useEffect, useState } from "react";
import { Dimensions, Share, View } from "react-native";
import { Button, Card, Title } from "react-native-paper";

import Podium from "../components/Podium";
import SegmentStaticMap from "../components/SegmentStaticMap";
import { shareLink } from "../utils";
import BaseStyles, { SPACER_4 } from "../utils/BaseStyles";
import Challenge from "../api/models/Challenge";
import ChallengeMeta from "./ChallengeMeta";
import {
  userHasJoinedChallenge,
  joinChallenge,
} from "../services/ChallengeService";
import { useAuthContext } from "../contexts/AuthContext";
import { staticMapUrl } from "../utils/StaticMap";

interface Props {
  challenge: Challenge;
}

function buildShareMessage(challenge: Challenge) {
  return shareLink(challenge.slug);
}

export default function ChallengeHomeInfo({ challenge }: Props) {
  const { polyline } = challenge;
  const width = Dimensions.get("window").width - SPACER_4 * 2;
  const height = width * 0.6;
  const [loading, setLoading] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(false);
  const [errorMessage, setErrorMesssage] = useState<string | undefined>(
    undefined,
  );
  const { auth } = useAuthContext();
  const options = { authToken: auth.token };

  useEffect(() => {
    userHasJoinedChallenge(challenge.slug, options).then(setJoined);
  }, [challenge]);

  async function inviteFriends() {
    try {
      const result = await Share.share({
        message: buildShareMessage(challenge),
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      setErrorMesssage(error.message);
    }
  }

  async function join() {
    setLoading(true);

    try {
      await joinChallenge(challenge.slug, options);
      setJoined(true);
    } catch (error) {
      setErrorMesssage(error.message);
    }
    setLoading(false);
  }

  let url;

  if (polyline) {
    url = staticMapUrl(polyline, {
      height,
      width,
      showPins: true,
    });
  }

  let actionButtons;

  if (joined) {
    actionButtons = (
      <Button mode="contained" onPress={inviteFriends} style={[BaseStyles.mb2]}>
        Invite Friends
      </Button>
    );
  } else {
    actionButtons = (
      <Button
        loading={loading}
        mode="contained"
        onPress={() => join()}
        style={[BaseStyles.mb2]}
      >
        Join
      </Button>
    );
  }

  return (
    <Card>
      {polyline && (
        <Card.Cover style={{ width, height }} source={{ uri: url }} />
      )}

      <Card.Content>
        <View style={[BaseStyles.py3]}>
          <Podium challenge={challenge} />

          <Title style={[BaseStyles.mb4]}>{challenge.name}</Title>

          <ChallengeMeta challenge={challenge} />

          {actionButtons}

          {errorMessage && <Text>{errorMessage}</Text>}
        </View>
      </Card.Content>
    </Card>
  );
}
