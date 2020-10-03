import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import {
  Button,
  Switch,
  Paragraph,
  TouchableRipple,
  Text,
  TextInput,
} from "react-native-paper";
import { useAuthContext } from "../contexts/AuthContext";
import { useNewChallengeContext } from "../contexts/NewChallengeContext";
import { createChallenge } from "../services/ChallengeService";
import { ChallengeParams } from "../api/models/Challenge";

const activityMap = {
  run: "Running",
  bike: "Biking",
  swim: "Swimming",
};

function generateName(params: ChallengeParams) {
  const { activityType } = params;
  if (!activityType) {
    return "Challenge";
  }

  return `${activityMap[activityType]} Challenge`;
}

export default function ChallengeDetailsScreen() {
  const navigation = useNavigation();
  const { params, setName } = useNewChallengeContext();
  const { name } = params;
  const { auth } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [isPrivate, setPrivate] = React.useState(false);

  const defaultName = generateName(params);

  function togglePrivate() {
    setPrivate(!isPrivate);
  }

  async function submit() {
    setLoading(true);

    if (!name) {
      params.name = defaultName;
    }

    try {
      const newChallenge = await createChallenge(params, {
        authToken: auth.token,
      });
      navigation.navigate("ChallengeShowScreen", { id: newChallenge.id });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <TextInput
        style={[BaseStyles.mb2]}
        label="Challenge Name"
        value={name || defaultName}
        onChangeText={setName}
        mode="outlined"
      />

      <TouchableRipple
        style={[BaseStyles.py2, BaseStyles.mb5]}
        onPress={togglePrivate}
      >
        <View style={[styles.row]}>
          <Paragraph>Make Challenge Private?</Paragraph>
          <View pointerEvents="none">
            <Switch value={isPrivate} />
          </View>
        </View>
      </TouchableRipple>

      <Button
        loading={loading}
        style={[BaseStyles.mb3]}
        mode="contained"
        onPress={submit}
      >
        Create Challenge
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
