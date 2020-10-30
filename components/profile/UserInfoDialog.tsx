import React, { useState } from "react";
import { Dialog, TextInput, Button } from "react-native-paper";
import BaseStyles from "../../utils/BaseStyles";
import User, { UserParams } from "../../api/models/User";

interface Props {
  user: User;
  visible: boolean;
  saveUser: (params: UserParams) => Promise<void>;
  close: () => void;
}

export default function UserInfoDialog(props: Props) {
  const { user } = props;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [loading, setLoading] = useState(false);

  function close() {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    props.close();
  }

  async function save() {
    setLoading(true);
    try {
      await props.saveUser({
        email,
        firstName,
        lastName,
        city,
        state,
      });
      setLoading(false);
      props.close();
    } catch (e) {
      setLoading(false);
      props.close();
    }
  }

  return (
    <Dialog onDismiss={close} visible={props.visible}>
      <Dialog.Title>Edit Information</Dialog.Title>

      <Dialog.Content>
        <TextInput
          label="First Name"
          mode="outlined"
          onChangeText={setFirstName}
          style={[BaseStyles.mb2]}
          value={firstName}
        />
        <TextInput
          label="Last Name"
          mode="outlined"
          onChangeText={setLastName}
          style={[BaseStyles.mb2]}
          value={lastName}
        />
        <TextInput
          label="Email"
          mode="outlined"
          onChangeText={setEmail}
          style={[BaseStyles.mb2]}
          value={email}
        />
        <TextInput
          label="City"
          mode="outlined"
          onChangeText={setCity}
          style={[BaseStyles.mb2]}
          value={city}
        />
        <TextInput
          label="state"
          mode="outlined"
          onChangeText={setState}
          style={[BaseStyles.mb2]}
          value={state}
        />
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
