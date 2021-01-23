import { DarkTheme } from "@react-navigation/native";
import Colors from "../constants/Colors";

const theme = Colors.dark;

export default {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: theme.primary,
    background: theme.background,
    card: theme.foreground,
    text: theme.text,
    border: theme.primary,
    notification: "rgb(255, 59, 48)",
  },
};
