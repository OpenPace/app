import React, { useState } from "react";
import { Picker } from "@react-native-community/picker";
import { Dialog, Button } from "react-native-paper";
import UserPrefs from "../../api/models/UserPrefs";
import { timezoneList } from "../../utils";

interface Props {
  userPrefs: UserPrefs;
  visible: boolean;
  close: () => void;
}

export default function TimezoneDialog(props: Props) {
  const { userPrefs } = props;
  const [timezone, setTimezone] = useState(userPrefs.timezone);
  const [loading, setLoading] = useState(false);

  function close() {
    setTimezone(userPrefs.timezone);
    props.close();
  }

  async function save() {
    setLoading(true);
  }

  const options = timezoneList.map((x) => <Picker.Item label={x} value={x} />);

  return (
    <Dialog visible={props.visible} onDismiss={close}>
      <Dialog.Title>Choose Timezone</Dialog.Title>

      <Dialog.Content>
        <Picker selectedValue={timezone}>{options}</Picker>
      </Dialog.Content>
      <Dialog.Actions>
        <Button mode="outlined" onPress={close}>
          Cancel
        </Button>
        <Button mode="contained" onPress={save} loading={loading}>
          Save
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}
