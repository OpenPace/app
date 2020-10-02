import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { DateTime } from "luxon";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Avatar, Card } from "react-native-paper";
import { useNewChallengeContext } from "../contexts/NewChallengeContext";

export default function ChallengeDateScreen() {
  const navigation = useNavigation();
  const { params, setDates } = useNewChallengeContext();
  const { timeline } = params;

  const today = DateTime.local().startOf("day");
  const tomorrow = today.plus({ days: 1 });
  const startOfWeek = today.startOf("week");
  const startOfNextWeek = startOfWeek.plus({ days: 7 });
  // 1 is Monday and 7 is Sunday
  const startOfWeekend = today.set({ weekday: 6 });
  const startOfNextWeekend = startOfWeekend.plus({ days: 7 });

  function setDate(startDate: DateTime) {
    if (timeline === "day") {
      setDates(startDate, startDate.plus({ days: 1 }));
    }

    if (timeline === "week") {
      setDates(startDate, startDate.plus({ days: 7 }));
    }

    // Saturday and Sunday
    if (timeline === "weekend") {
      setDates(startDate, startDate.plus({ days: 2 }));
    }
  }

  // Start today
  // Start tomorrow
  // Pick a custom date
  if (timeline === "day") {
    return (
      <Screen style={[BaseStyles.p4]}>
        <Card style={[BaseStyles.mb3]} onPress={() => setDate(today)}>
          <Card.Title
            title="Start Today"
            left={(props) => <Avatar.Text {...props} label="1" />}
          />
        </Card>

        <Card style={[BaseStyles.mb3]} onPress={() => setDate(tomorrow)}>
          <Card.Title
            title="Start Tomorrow"
            left={(props) => <Avatar.Text {...props} label="2" />}
          />
        </Card>

        <Card style={[BaseStyles.mb3]}>
          <Card.Title
            title="Pick a Custom Start Date"
            left={(props) => <Avatar.Text {...props} label="3" />}
          />
        </Card>
      </Screen>
    );
  }

  // Start this week
  // Start on Monday
  // Pick a custom date
  if (timeline === "week") {
    return (
      <Screen style={[BaseStyles.p4]}>
        <Card style={[BaseStyles.mb3]} onPress={() => setDate(startOfWeek)}>
          <Card.Title
            title="Start This Week"
            left={(props) => <Avatar.Text {...props} label="1" />}
          />
        </Card>

        <Card style={[BaseStyles.mb3]} onPress={() => setDate(startOfNextWeek)}>
          <Card.Title
            title="Start Next Monday"
            left={(props) => <Avatar.Text {...props} label="2" />}
          />
        </Card>

        <Card style={[BaseStyles.mb3]}>
          <Card.Title
            title="Pick a Custom Start Date"
            left={(props) => <Avatar.Text {...props} label="3" />}
          />
        </Card>
      </Screen>
    );
  }

  // Start this weekend
  // Start next weekend
  if (timeline === "weekend") {
    return (
      <Screen style={[BaseStyles.p4]}>
        <Card style={[BaseStyles.mb3]} onPress={() => setDate(startOfWeekend)}>
          <Card.Title
            title="Start This Weekend"
            left={(props) => <Avatar.Text {...props} label="1" />}
          />
        </Card>

        <Card
          style={[BaseStyles.mb3]}
          onPress={() => setDate(startOfNextWeekend)}
        >
          <Card.Title
            title="Start Next Weekend"
            left={(props) => <Avatar.Text {...props} label="2" />}
          />
        </Card>
      </Screen>
    );
  }

  // Custom Date Range
  // Start date
  // End date
  return (
    <Screen style={[BaseStyles.p4]}>
      <Card style={[BaseStyles.mb3]}>
        <Card.Title
          title="Pick Start Date"
          left={(props) => <Avatar.Text {...props} label="1" />}
        />
      </Card>

      <Card style={[BaseStyles.mb3]}>
        <Card.Title
          title="Pick End Date"
          left={(props) => <Avatar.Text {...props} label="2" />}
        />
      </Card>
    </Screen>
  );
}
