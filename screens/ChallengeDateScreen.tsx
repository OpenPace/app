import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { DateTime } from "luxon";
import { Avatar, Button, Card } from "react-native-paper";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { useNewChallengeContext } from "../contexts/NewChallengeContext";
import { Calendar, DateObject } from "react-native-calendars";
import { useThemeContext } from "../contexts/ThemeContext";
import Colors from "../constants/Colors";
import { StringKeyable } from "../utils";

export default function ChallengeDateScreen() {
  const navigation = useNavigation();
  const { scheme } = useThemeContext();
  const colors = Colors[scheme];
  const { params, setDates } = useNewChallengeContext();
  const { timeline } = params;
  const [calendarStart, setCalendarStart] = useState<DateTime | undefined>(
    undefined,
  );
  const [calendarEnd, setCalendarEnd] = useState<DateTime | undefined>(
    undefined,
  );

  const today = DateTime.local().startOf("day");
  const tomorrow = today.plus({ days: 1 });
  const startOfWeek = today.startOf("week");
  const startOfNextWeek = startOfWeek.plus({ days: 7 });
  // 1 is Monday and 7 is Sunday
  const startOfWeekend = today.set({ weekday: 6 });
  const startOfNextWeekend = startOfWeekend.plus({ days: 7 });

  function setDate(startDate: DateTime) {
    if (timeline === "day") {
      setDates(startDate, startDate);
    }

    if (timeline === "week") {
      setDates(startDate, startDate.plus({ days: 6 }));
    }

    // Saturday and Sunday
    if (timeline === "weekend") {
      setDates(startDate, startDate.plus({ days: 1 }));
    }

    submit();
  }

  function customSubmit() {
    if (calendarStart && calendarEnd) {
      setDates(calendarStart, calendarEnd);
      submit();
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
  const disabled = !calendarStart || !calendarEnd;

  const markedDates: StringKeyable = {};
  const markerColor = colors.accent;

  if (calendarStart) {
    markedDates[calendarStart.toISODate()] = {
      startingDay: true,
      color: markerColor,
    };

    if (calendarEnd) {
      const days = calendarEnd.diff(calendarStart).as("days");

      for (let i = 1; i < days; i++) {
        markedDates[calendarStart.plus({ days: i }).toISODate()] = {
          color: markerColor,
        };
      }

      markedDates[calendarEnd.toISODate()] = {
        endingDay: true,
        color: markerColor,
      };
    }
  }

  function onDayPress(day: DateObject) {
    const date = DateTime.fromISO(day.dateString);

    if (calendarStart && calendarEnd) {
      setCalendarStart(date);
      setCalendarEnd(undefined);
    } else if (calendarStart && calendarStart < date) {
      setCalendarEnd(date);
    } else if (calendarStart) {
      setCalendarStart(date);
      setCalendarEnd(calendarStart);
    } else {
      setCalendarStart(date);
    }
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <Calendar
        enableSwipeMonths
        markingType={"period"}
        markedDates={markedDates}
        onDayPress={onDayPress}
        style={BaseStyles.rounded}
        theme={{
          backgroundColor: colors.surface,
          calendarBackground: colors.surface,
          dayTextColor: colors.text,
          todayTextColor: colors.gray[600],
          arrowColor: colors.primary,
          monthTextColor: colors.text,
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />

      <Button
        disabled={disabled}
        mode="contained"
        onPress={customSubmit}
        style={[BaseStyles.mt4, BaseStyles.mb3]}
      >
        Continue
      </Button>
    </Screen>
  );
}
