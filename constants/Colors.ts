import color from "color";

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";
const primary = "#5e72e4";
const red = "#f5365c";
const orange = "#fb6340";
const yellow = "#ffd600";
const blue = "#11cdef";
const green = "#2dce89";
const black = "#12263F";
const white = "#FFFFFF";
const gray = {
  100: "#f6f9fc",
  200: "#e9ecef",
  300: "#dee2e6",
  400: "#ced4da",
  500: "#adb5bd",
  600: "#8898aa",
  700: "#525f7f",
  800: "#32325d",
  900: "#212529",
};

export default {
  light: {
    text: black,
    background: "#f3f5f5",
    foreground: white,
    surface: white,
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    default: "#172b4d",
    secondary: "#f4f5f7",
    primary,
    accent: blue,
    info: blue,
    success: green,
    danger: red,
    warning: orange,
    yellow,
    gray,
    white,
    black,
  },
  dark: {
    text: white,
    background: "#363644",
    foreground: "#444454",
    surface: "#444454",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    default: "#172b4d",
    primary: "#5e72e4",
    secondary: "#f4f5f7",
    accent: blue,
    info: blue,
    success: green,
    danger: red,
    warning: orange,
    yellow,
    gray,
    white,
    black,
    error: "#CF6679",
    onBackground: "#FFFFFF",
    onSurface: "#FFFFFF",
    disabled: color(white).alpha(0.38).rgb().string(),
    placeholder: color(white).alpha(0.54).rgb().string(),
    backdrop: color("#363644").alpha(0.5).rgb().string(),
    notification: primary,
  },
};
