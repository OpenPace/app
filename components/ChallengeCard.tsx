import React from "react";
import BaseStyles from "../utils/BaseStyles";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Challenge from "../api/models/Challenge";

interface Props {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: Props) {
  const navigation = useNavigation();

  return (
    <Card
      style={[BaseStyles.mb4]}
      onPress={() =>
        navigation.navigate("ChallengeShowScreen", { id: challenge.id })
      }
    >
      <Card.Title
        title={challenge.name}
        subtitle="5 Days Remaining"
        left={(props) => <LeftIcon {...props} challenge={challenge} />}
      />
      <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
    </Card>
  );
}

interface LeftIconProps {
  challenge: Challenge;
  size: number;
}

function LeftIcon({ challenge, size }: LeftIconProps) {
  const icon = challenge.activityType;

  return <Avatar.Icon size={size} icon={icon} />;
}
