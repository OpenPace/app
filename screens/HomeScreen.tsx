import React, { useState } from "react";
import { Provider, Portal, FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";

export default function HomeScreen() {
  return (
    <Screen>
      <ActionButton />
    </Screen>
  );
}

function ActionButton() {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? "close" : "plus"}
          actions={[
            {
              icon: "plus",
              label: "New Challenge",
              onPress: () => navigation.navigate("NewChallengeScreen"),
            },
          ]}
          onStateChange={({ open }) => setOpen(open)}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
}
