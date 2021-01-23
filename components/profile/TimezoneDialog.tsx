import React, { useState } from "react";
import { Picker } from "@react-native-community/picker";
import { Dialog, Button } from "react-native-paper";
import UserPrefs, { UserPrefsParams } from "../../api/models/UserPrefs";
import { timezoneList } from "../../utils/Timezone";

interface Props {
  userPrefs: UserPrefs;
  visible: boolean;
  savePrefs: (params: UserPrefsParams) => Promise<void>;
  close: () => void;
}

export default function TimezoneDialog(props: Props) {
  const { userPrefs, visible } = props;
  const [timezone, setTimezone] = useState(userPrefs.timezone);
  const [loading, setLoading] = useState(false);

  function close() {
    setTimezone(userPrefs.timezone);
    props.close();
  }

  async function save() {
    setLoading(true);
    try {
      await props.savePrefs({
        timezone,
      });
      setLoading(false);
      props.close();
    } catch (e) {
      setLoading(false);
      props.close();
    }
  }

  const options = timezoneList.map((x) => (
    <Picker.Item key={x} label={x.replace(/_/, " ")} value={x} />
  ));

  return (
    <Dialog onDismiss={close} visible={visible}>
      <Dialog.Title>Choose Timezone</Dialog.Title>

      <Dialog.Content>
        <Picker
          onValueChange={(itemValue) => setTimezone(itemValue as string)}
          selectedValue={timezone}
        >
          {options}
        </Picker>
      </Dialog.Content>
      <Dialog.Actions>
        <Button mode="outlined" onPress={close}>
          Cancel
        </Button>
        <Button loading={loading} mode="contained" onPress={save}>
          Save
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}
