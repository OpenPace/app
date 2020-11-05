import React from "react";
import { StatusBar as DefaultStatusBar } from "expo-status-bar";
import { useThemeContext } from "../contexts/ThemeContext";

export default function StatusBar() {
  const { scheme } = useThemeContext();

  const style = scheme === "light" ? "dark" : "light";
  return <DefaultStatusBar style={style} />;
}
