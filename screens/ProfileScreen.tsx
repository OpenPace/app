import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import UserAvatar from "../components/UserAvatar";
import { useUserContext } from "../contexts/UserContext";

import { StringKeyable } from "../utils";
import BaseStyles from "../utils/BaseStyles";
import { Calendar, DateObject } from "react-native-calendars";
import { useThemeContext } from "../contexts/ThemeContext";
import Colors from "../constants/Colors";
import { getActivitiesByDates } from "../services/ActivityService";
import { DateTime } from "luxon";
import { useAuthContext } from "../contexts/AuthContext";
import Activity from "../api/models/Activity";

export default function ProfileScreen() {
  const { navigate } = useNavigation();
  const { auth } = useAuthContext();
  const { user } = useUserContext();
  const { scheme } = useThemeContext();
  const [activities, setActivities] = useState<Activity[]>([]);
  const colors = Colors[scheme];

  function getActivitiesByMonth(day: DateObject) {
    const date = DateTime.fromISO(day.dateString);
    getActivitiesAroundDate(date);
  }

  function getActivitiesAroundDate(date: DateTime) {
    const startDate = date.minus({ month: 1 }).startOf("month").startOf("week");
    const endDate = date
      .plus({ month: 1 })
      .endOf("month")
      .endOf("week")
      .startOf("day");

    getActivitiesByDates(startDate, endDate, { authToken: auth.token }).then(
      setActivities,
    );
  }

  useEffect(() => {
    getActivitiesAroundDate(DateTime.local());
  }, []);

  const markedDates: StringKeyable = {};
  const markerColor = colors.accent;

  activities.forEach((activity) => {
    markedDates[activity.startAt.toISODate()] = {
      customStyles: {
        container: {
          backgroundColor: markerColor,
        },
      },
    };
  });

  return (
    <Screen>
      <View style={[BaseStyles.row, BaseStyles.p4, BaseStyles.alignCenter]}>
        <View>
          <UserAvatar user={user} size={50} />
        </View>

        <View style={{ flexGrow: 1, marginLeft: 8 }}>
          <Text style={[styles.name]}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={[BaseStyles.textMuted]}>
            {user.city} {user.state}
          </Text>
        </View>

        <IconButton
          icon="cog"
          size={24}
          onPress={() => navigate("SettingsScreen")}
        />
      </View>

      <View style={[BaseStyles.p4]}>
        <Card style={{ height: 370 }}>
          <Calendar
            enableSwipeMonths
            markingType={"custom"}
            markedDates={markedDates}
            style={BaseStyles.rounded}
            firstDay={1}
            onMonthChange={getActivitiesByMonth}
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
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileImg: {
    height: 50,
    width: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
