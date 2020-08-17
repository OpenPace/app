import * as React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import BaseStyles from '../utils/BaseStyles';
import Card from '../components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

export default function TabBar() {
  const theme = useColorScheme();
  const color = Colors[theme]['text'];

  return (
    <Card style={[BaseStyles.row, styles.container]}>
      <View style={[BaseStyles.col]}>
        <TouchableOpacity onPress={() => alert('Hello, world!')}>
          <MaterialIcons name="home" style={[BaseStyles.textCenter]} size={24} color={color} />
        </TouchableOpacity>
      </View>
      <View style={[BaseStyles.col]}>
        <TouchableOpacity onPress={() => alert('Hello, world!')}>
          <MaterialIcons name="terrain" style={[BaseStyles.textCenter]} size={24} color={color} />
        </TouchableOpacity>
      </View>
      <View style={[BaseStyles.col]}>
        <TouchableOpacity onPress={() => alert('Hello, world!')}>
          <MaterialIcons name="notifications" style={[BaseStyles.textCenter]} size={24} color={color} />
        </TouchableOpacity>
      </View>
      <View style={[BaseStyles.col]}>
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <MaterialIcons name="person" style={[BaseStyles.textCenter]} size={24} color={color} />
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 24,
    left: 24,
    bottom: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
});
