import React from "react";
import BaseStyles from "../utils/BaseStyles";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Caption, Title, Surface } from "react-native-paper";
import Challenge from "../api/models/Challenge";
import { cloudinaryImg } from "../utils";

interface Props {
  challenge: Challenge;
}

const images = {
  distance: [cloudinaryImg("altitude-1.jpg"), cloudinaryImg("altitude-2.jpg")],
  time: [cloudinaryImg("altitude-1.jpg"), cloudinaryImg("altitude-2.jpg")],
  altitude: [cloudinaryImg("altitude-1.jpg"), cloudinaryImg("altitude-2.jpg")],
  segment: [cloudinaryImg("altitude-1.jpg"), cloudinaryImg("altitude-2.jpg")],
};

function imageSrc(challenge: Challenge): string {
  return images[challenge.challengeType][0];
}

export default function PreviewCard({ challenge }: Props) {
  return (
    <TouchableOpacity>
      <Surface style={[BaseStyles.mb4, BaseStyles.rounded, styles.card]}>
        <Image
          source={{
            uri: imageSrc(challenge),
          }}
          style={styles.img}
        />
        <View style={[BaseStyles.py2, styles.details]}>
          <Title>{challenge.name}</Title>
          <Caption>X days remaining</Caption>
          <Caption>Photos of participants</Caption>
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
    height: 100,
    overflow: "hidden",
    flex: 0,
    flexBasis: "auto",
    flexDirection: "row",
  },
});
