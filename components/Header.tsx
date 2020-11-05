import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Headline, Subheading } from "react-native-paper";
import BaseStyles from "../utils/BaseStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeContext } from "../contexts/ThemeContext";
import Colors from "../constants/Colors";
import User from "../api/models/User";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { BottomTabParamList } from "../types";

type NavigationProp = StackNavigationProp<BottomTabParamList>;

interface Props {
  headline: string;
  subheading: string;
  user: User;
}

export default function Header(props: Props) {
  const { headline, subheading, user } = props;
  const { scheme } = useThemeContext();
  const colors = Colors[scheme];
  const { navigate } = useNavigation<NavigationProp>();

  return (
    <SafeAreaView
      style={[
        { backgroundColor: colors["foreground"] },
        BaseStyles.row,
        BaseStyles.p4,
        BaseStyles.pt5,
      ]}
    >
      <View style={{ flexGrow: 1 }}>
        <Headline style={styles.headline}>{headline}</Headline>
        <Subheading>{subheading}</Subheading>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigate("Profile")}>
          <Image
            source={{ uri: user.avatar }}
            style={[{ borderColor: colors["accent"] }, styles.profileImg]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    borderWidth: 2,
  },
  headline: {
    fontWeight: "bold",
  },
});
