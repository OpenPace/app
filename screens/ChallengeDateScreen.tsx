import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { DateTime } from "luxon";
import { Avatar, Button, Card } from "react-native-paper";
import Screen from "../components/Screen";
import DatePickerButton from "../components/DatePickerButton";
import BaseStyles from "../utils/BaseStyles";
import { useNewChallengeContext } from "../contexts/NewChallengeContext";

export default function ChallengeDateScreen() {
  const navigation = useNavigation();
  const { params, setDates } = useNewChallengeContext();
  const { timeline } = params;
  const { startAt, endAt } = params;

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

    submit();
  }

  function setStartDate(startDate: DateTime) {
    const date = startDate.startOf("day");

    // Don't allow start dates after the end date
    if (endAt && date < endAt) {
      setDates(date, endAt);
    } else {
      setDates(date, date.plus({ days: 1 }));
    }
  }

  // When picking an end date, the user wants to include that date
  function setInclusiveEndDate(endDate: DateTime) {
    const date = endDate.startOf("day");

    if (startAt && startAt < date) {
      setDates(startAt, date);
    } else {
      setDates(date.minus({ days: 1 }), date);
    }
  }

  function submit() {
    navigation.navigate("ChallengeDetailsScreen");
  }

  // Start today
  // Start tomorrow
  if (timeline === "day") {
    return (
      <Screen style={[BaseStyles.p4]}>
        <Card onPress={() => setDate(today)} style={[BaseStyles.mb3]}>
          <Card.Title
            left={(props) => <Avatar.Text {...props} label="1" />}
            title="Start Today"
          />
        </Card>

        <Card onPress={() => setDate(tomorrow)} style={[BaseStyles.mb3]}>
          <Card.Title
            left={(props) => <Avatar.Text {...props} label="2" />}
            title="Start Tomorrow"
          />
        </Card>
      </Screen>
    );
  }

  // Start this week
  // Start on Monday
  if (timeline === "week") {
    return (
      <Screen style={[BaseStyles.p4]}>
        <Card onPress={() => setDate(startOfWeek)} style={[BaseStyles.mb3]}>
          <Card.Title
            left={(props) => <Avatar.Text {...props} label="1" />}
            title="Start This Week"
          />
        </Card>

        <Card onPress={() => setDate(startOfNextWeek)} style={[BaseStyles.mb3]}>
          <Card.Title
            left={(props) => <Avatar.Text {...props} label="2" />}
            title="Start Next Monday"
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
        <Card onPress={() => setDate(startOfWeekend)} style={[BaseStyles.mb3]}>
          <Card.Title
            left={(props) => <Avatar.Text {...props} label="1" />}
            title="Start This Weekend"
          />
        </Card>

        <Card
          onPress={() => setDate(startOfNextWeekend)}
          style={[BaseStyles.mb3]}
        >
          <Card.Title
            left={(props) => <Avatar.Text {...props} label="2" />}
            title="Start Next Weekend"
          />
        </Card>
      </Screen>
    );
  }

  // Custom Date Range
  // Start date
  // End date
  const disabled = !startAt && !endAt;

  return (
    <Screen style={[BaseStyles.p4]}>
      <DatePickerButton date={startAt || today} onChange={setStartDate}>
        <Card.Title
          left={(props) => <Avatar.Text {...props} label="1" />}
          title={
            startAt ? `Start: ${startAt.toLocaleString()}` : "Pick Start Date"
          }
        />
      </DatePickerButton>

      <DatePickerButton date={endAt || today} onChange={setInclusiveEndDate}>
        <Card.Title
          left={(props) => <Avatar.Text {...props} label="2" />}
          title={endAt ? `End: ${endAt.toLocaleString()}` : "Pick End Date"}
        />
      </DatePickerButton>

      <Button
        disabled={disabled}
        mode="contained"
        onPress={submit}
        style={[BaseStyles.mb3]}
      >
        Continue
      </Button>
    </Screen>
  );
}
