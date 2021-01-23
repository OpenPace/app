import React, { useState } from "react";
import { View, Platform } from "react-native";
import { Card } from "react-native-paper";
import { DateTime } from "luxon";
import DateTimePicker from "@react-native-community/datetimepicker";
import BaseStyles from "../utils/BaseStyles";

interface Props {
  children: React.ReactNode;
  date: DateTime;
  onChange?: (date: DateTime) => void;
}

export default function DatePickerButton(props: Props) {
  const { children, date, onChange } = props;
  const [show, setShow] = useState(false);

  function handleChange(_event: any, selectedDate: any) {
    const currentDate = selectedDate ? DateTime.fromJSDate(selectedDate) : date;
    setShow(Platform.OS === "ios");
    if (onChange) {
      onChange(currentDate);
    }
  }

  function showDatepicker() {
    setShow(true);
  }

  return (
    <View>
      <Card onPress={showDatepicker} style={[BaseStyles.mb3]}>
        {children}
      </Card>

      {show && (
        <DateTimePicker
          display="default"
          is24Hour
          mode="date"
          onChange={handleChange}
          testID="dateTimePicker"
          value={date.toJSDate()}
        />
      )}
    </View>
  );
}
