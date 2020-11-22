import React from "react";
import { ViewStyle, StyleProp, TouchableOpacity } from "react-native";
import { Avatar as PaperAvatar } from "react-native-paper";
import Score from "../api/models/Score";
import User from "../api/models/User";
import { useThemeContext } from "../contexts/ThemeContext";
import Colors from "../constants/Colors";

interface Props {
  user: User | Score;
  size?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

function userInitials(user: User | Score) {
  return user.firstName[0] + user.lastName[0];
}

export default function Avatar(props: Props) {
  const { scheme } = useThemeContext();
  const colors = Colors[scheme];
  const { user, onPress, size, style } = props;
  const iconSize = size || 50;

  let icon;

  if (user.avatar) {
    icon = (
      <PaperAvatar.Image
        size={iconSize}
        source={{ uri: user.avatar }}
        style={[{ borderColor: colors["accent"] }, style]}
      />
    );
  } else {
    icon = (
      <PaperAvatar.Text
        size={iconSize}
        label={userInitials(user)}
        style={[{ borderColor: colors["accent"] }, style]}
      />
    );
  }

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
  }

  return icon;
}
