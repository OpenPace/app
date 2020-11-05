import * as React from "react";
import Colors from "../constants/Colors";
import { useThemeContext } from "../contexts/ThemeContext";
import { View } from "react-native";

type ViewProps = View["props"];

export default function Screen(props: ViewProps) {
  const { style, ...otherProps } = props;
  const { scheme } = useThemeContext();
  const backgroundColor = Colors[scheme]["background"];

  return <View style={[{ backgroundColor, flex: 1 }, style]} {...otherProps} />;
}
