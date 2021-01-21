import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Surface, Text } from "react-native-paper";
import { DateTime } from "luxon";

import Activity from "../api/models/Activity";
import { useAuthContext } from "../contexts/AuthContext";
import { getActivitiesByDates } from "../services/ActivityService";
import { StringKeyable } from "../utils";
import BaseStyles from "../utils/BaseStyles";

interface ItemProps {
  date: DateTime;
}

const weekLabels = ["M", "T", "W", "T", "F", "S", "S"];

function Label({ text }: { text: string }) {
  return (
    <View style={[BaseStyles.col, BaseStyles.alignCenter]}>
      <Text>{text}</Text>
    </View>
  );
}

export default function DotCalendar() {
  const { auth } = useAuthContext();
  const startDate = DateTime.local().startOf("month").startOf("week");
  const endDate = DateTime.local().endOf("month").endOf("week").startOf("day");
  const today = DateTime.local();
  const days = endDate.diff(startDate).as("days");
  const offsets = Array.from(Array(days + 1).keys()); // [0, 1, ..days]
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    getActivitiesByDates(startDate, endDate, { authToken: auth.token }).then(
      setActivities,
    );
  }, []);

  const activityMap: StringKeyable<Activity[]> = {};
  activities.forEach((activity) => {
    const isoDate = activity.startAt.toISODate();
    if (activityMap[isoDate]) {
      activityMap[isoDate].push(activity);
    } else {
      activityMap[isoDate] = [activity];
    }
  });

  function Item({ date }: ItemProps) {
    const isoDate = date.toISODate();
    const daysActivities = activityMap[isoDate] || [];
    const isToday = today.toISODate() === isoDate;
    const bgColor = daysActivities.length === 0 ? "white" : "#5e72e4";

    return (
      <View style={[BaseStyles.alignCenter, styles.dotCol]}>
        <Avatar.Text
          style={[{ backgroundColor: bgColor }, BaseStyles.mb2, BaseStyles.mt2]}
          size={30}
          label={date.day}
        />

        {isToday && <View style={styles.todayDot} />}
      </View>
    );
  }

  const items = offsets.map((offset) => {
    const date = startDate.plus({ days: offset });
    return <Item key={date.toISODate()} date={date} />;
  });

  const labels = weekLabels.map((label) => <Label key={label} text={label} />);

  return (
    <Surface style={[BaseStyles.p3, BaseStyles.rounded]}>
      <View style={[BaseStyles.row]}>{labels}</View>

      <View style={[BaseStyles.row]}>{items}</View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  dotCol: { flex: 1, flexGrow: 1, minWidth: "14%", position: "relative" },
  dot: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "red",
    position: "absolute",
    bottom: 0,
  },
});
