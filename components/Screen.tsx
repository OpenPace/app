import * as React from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { View } from "react-native";

type ViewProps = View["props"];

export default function Screen(props: ViewProps) {
  const { style, ...otherProps } = props;
  const theme = useColorScheme();
  const backgroundColor = Colors[theme]["background"];

  return <View style={[{ backgroundColor, flex: 1 }, style]} {...otherProps} />;
}
