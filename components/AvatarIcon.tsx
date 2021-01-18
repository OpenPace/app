import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import { Avatar as PaperAvatar } from "react-native-paper";
import { useThemeContext } from "../contexts/ThemeContext";
import Colors from "../constants/Colors";

interface Props {
  icon: string;
  bgColor: "primary" | "info" | "success" | "secondary" | "danger" | "warning";
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export default function AvatarIcon({ icon, size, bgColor, style }: Props) {
  const { scheme } = useThemeContext();
  const colors = Colors[scheme];

  return (
    <PaperAvatar.Icon
      icon={icon}
      size={size}
      color={colors.white}
      style={[{ backgroundColor: colors[bgColor] }, style]}
    />
  );
}
