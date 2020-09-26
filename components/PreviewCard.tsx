import React from "react";
import BaseStyles from "../utils/BaseStyles";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Title, Surface } from "react-native-paper";
import Challenge from "../api/models/Challenge";
import { cloudinaryImg } from "../utils";

interface Props {
  challenge: Challenge;
}

const images = {
  distance: [""],
  time: [""],
  altitude: [cloudinaryImg("altitude-1.jpg"), cloudinaryImg("altitude-2.jpg")],
  segment: [""],
};

function imageSrc(challenge: Challenge): string {
  return images[challenge.challengeType][0];
}

export default function PreviewCard({ challenge }: Props) {
  return (
    <TouchableOpacity>
      <Surface style={[BaseStyles.rounded, styles.card]}>
        <Image
          source={{
            uri: imageSrc(challenge),
          }}
          style={styles.img}
        />
        <View style={[BaseStyles.py2, styles.details]}>
          <Title>{challenge.name}</Title>
        </View>
      </Surface>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
  },
  details: {
    flexGrow: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  card: {
    width: 300,
    height: 100,
    marginRight: 16,
    overflow: "hidden",
    flex: 0,
    flexBasis: "auto",
    flexDirection: "row",
  },
});
