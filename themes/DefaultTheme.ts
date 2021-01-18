import { DefaultTheme } from "react-native-paper";
import Colors from "../constants/Colors";

const { light } = Colors;

export default {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    ...light,
  }
};
