import color from "color";
import DefaultTheme from "./DefaultTheme";
import Colors from "../constants/Colors";

const { dark } = Colors;

export default {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    ...dark,
  },
};
