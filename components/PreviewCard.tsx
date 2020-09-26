import React from "react";
import BaseStyles from "../utils/BaseStyles";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Title, Surface } from "react-native-paper";
import Challenge from "../api/models/Challenge";

interface Props {
  challenge: Challenge;
}

export default function PreviewCard({ challenge }: Props) {
  return (
    <TouchableOpacity>
      <Surface style={[BaseStyles.rounded, styles.card]}>
        <Image
          source={{
            uri:
              "https://images.unsplash.com/photo-1480497490787-505ec076689f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
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
