const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";
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
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    default: "#172b4d",
    primary: "#5e72e4",
    secondary: "#f4f5f7",
    accent: blue,
    info: blue,
    success: green,
    danger: red,
    warning: orange,
    yellow: yellow,
    gray: gray,
  },
  dark: {
    text: white,
    background: "#363644",
    foreground: "#444454",
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
    yellow: yellow,
    gray: gray,
  },
};
