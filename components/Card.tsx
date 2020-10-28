import * as React from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { StyleSheet, View } from "react-native";

type ViewProps = View["props"];

export default function Card(props: ViewProps) {
  const { style, ...otherProps } = props;
  const theme = useColorScheme();
  const backgroundColor = Colors[theme]["foreground"];

  return (
    <View style={[{ backgroundColor }, styles.card, style]} {...otherProps} />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
