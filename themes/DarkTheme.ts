import color from "color";
import DefaultTheme from "./DefaultTheme";
import Colors from "../constants/Colors";

const { dark } = Colors;

export default {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: dark.primary,
    accent: "#03dac6",
    background: "#363644",
    surface: "#444454",
    error: "#CF6679",
    onBackground: "#FFFFFF",
    onSurface: "#FFFFFF",
    text: "#FFFFFF",
    disabled: color(dark.text).alpha(0.38).rgb().string(),
    placeholder: color(dark.text).alpha(0.54).rgb().string(),
    backdrop: color(dark.background).alpha(0.5).rgb().string(),
    notification: dark.primary,
  },
};
