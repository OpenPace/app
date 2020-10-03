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

  function _onChange(_event: any, selectedDate: any) {
    const currentDate = selectedDate ? DateTime.fromJSDate(selectedDate) : date;
    setShow(Platform.OS === "ios");
    onChange && onChange(currentDate);
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
          testID="dateTimePicker"
          value={date.toJSDate()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={_onChange}
        />
      )}
    </View>
  );
}
