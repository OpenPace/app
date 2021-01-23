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

export default function UserAvatar(props: Props) {
  const { scheme } = useThemeContext();
  const colors = Colors[scheme];
  const { user, onPress, size, style } = props;
  const iconSize = size || 50;
  const bgColors = [colors.primary, colors.info, colors.danger, colors.warning];

  let icon;

  if (user.avatar) {
    icon = (
      <PaperAvatar.Image
        size={iconSize}
        source={{ uri: user.avatar }}
        style={[{ borderColor: colors.secondary }, style]}
      />
    );
  } else {
    const initials = userInitials(user);
    const bgColor =
      bgColors[
        (initials.charCodeAt(0) + initials.charCodeAt(1)) % bgColors.length
      ];

    icon = (
      <PaperAvatar.Text
        size={iconSize}
        label={userInitials(user)}
        style={[
          { backgroundColor: bgColor, borderColor: colors.secondary },
          style,
        ]}
      />
    );
  }

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
  }

  return icon;
}
