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
  TextInput,
} from "react-native-paper";
import { useChallengeContext } from "../contexts/ChallengeContext";
import { useNewChallengeContext } from "../contexts/NewChallengeContext";
import { generateChallengeName } from "../utils";

export default function ChallengeDetailsScreen() {
  const navigation = useNavigation();
  const { params } = useNewChallengeContext();
  const { createChallenge, loading } = useChallengeContext();
  const [isPrivate, setPrivate] = React.useState(false);
  const [name, setName] = useState<string>(generateChallengeName(params))

  function togglePrivate() {
    setPrivate(!isPrivate);
  }

  async function submit() {
    try {
      params.name = name;
      const newChallenge = await createChallenge(params);
      navigation.navigate("ChallengeShowScreen", { slug: newChallenge.slug });
    } catch (e) {
      console.log("error");
    }
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <TextInput
        label="Challenge Name"
        mode="outlined"
        onChangeText={setName}
        style={[BaseStyles.mb2]}
        value={name}
      />

      <TouchableRipple
        onPress={togglePrivate}
        style={[BaseStyles.py2, BaseStyles.mb5]}
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
        mode="contained"
        onPress={submit}
        style={[BaseStyles.mb3]}
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
