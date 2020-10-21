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
    <Dialog visible={props.visible} onDismiss={close}>
      <Dialog.Title>Edit Information</Dialog.Title>

      <Dialog.Content>
        <TextInput
          style={[BaseStyles.mb2]}
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          mode="outlined"
        />
        <TextInput
          style={[BaseStyles.mb2]}
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          mode="outlined"
        />
        <TextInput
          style={[BaseStyles.mb2]}
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
        />
        <TextInput
          style={[BaseStyles.mb2]}
          label="City"
          value={city}
          onChangeText={setCity}
          mode="outlined"
        />
        <TextInput
          style={[BaseStyles.mb2]}
          label="state"
          value={state}
          onChangeText={setState}
          mode="outlined"
        />
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
