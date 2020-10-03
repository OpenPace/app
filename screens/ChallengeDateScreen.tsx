import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { DateTime } from "luxon";
import { Avatar, Button, Card } from "react-native-paper";
import Screen from "../components/Screen";
import DatePickerButton from "../components/DatePickerButton";
import BaseStyles from "../utils/BaseStyles";
import { useAuthContext } from "../contexts/AuthContext";
import { useNewChallengeContext } from "../contexts/NewChallengeContext";
import { createChallenge } from "../services/ChallengeService";

export default function ChallengeDateScreen() {
  const navigation = useNavigation();
  const { auth } = useAuthContext();
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

  async function submit() {
    try {
      const newChallenge = await createChallenge(params, {
        authToken: auth.token,
      });
      navigation.navigate("ChallengeShowScreen", { id: newChallenge.id });
    } catch (e) {}
  }

  // Start today
  // Start tomorrow
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
      </Screen>
    );
  }

  // Start this week
  // Start on Monday
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
  const disabled = !startAt && !endAt;

  return (
    <Screen style={[BaseStyles.p4]}>
      <DatePickerButton date={startAt || today} onChange={setStartDate}>
        <Card.Title
          title={
            startAt ? `Start: ${startAt.toLocaleString()}` : "Pick Start Date"
          }
          left={(props) => <Avatar.Text {...props} label="1" />}
        />
      </DatePickerButton>

      <DatePickerButton date={endAt || today} onChange={setInclusiveEndDate}>
        <Card.Title
          title={endAt ? `End: ${endAt.toLocaleString()}` : "Pick End Date"}
          left={(props) => <Avatar.Text {...props} label="2" />}
        />
      </DatePickerButton>

      <Button
        disabled={disabled}
        style={[BaseStyles.mb3]}
        mode="contained"
        onPress={submit}
      >
        Continue
      </Button>
    </Screen>
  );
}
