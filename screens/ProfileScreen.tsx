import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import BaseStyles from '../utils/BaseStyles';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={[BaseStyles.bgWhite, BaseStyles.p4, {flex: 1}]}>
      <View style={[BaseStyles.row, BaseStyles.pb4]}>
        <View>
          <Image source={{ uri: 'http://www.fillmurray.com/200/200' }} style={[styles.profileImg, BaseStyles.rounded]} />
        </View>

        <View style={{flexGrow: 1, marginLeft: 8}}>
          <Text style={[styles.name]}>Evan Dancer</Text>
          <Text style={[BaseStyles.textMuted]}>Traverse City, MI</Text>
        </View>

        <FontAwesome name="gear" size={24} color="black" />
      </View>

      <View style={[BaseStyles.row, BaseStyles.card, BaseStyles.p3]}>
        <View style={[BaseStyles.col]}>
          <TouchableOpacity onPress={() => alert('Hello, world!')}>
            <Text style={[BaseStyles.text, BaseStyles.textCenter]}>Run</Text>
          </TouchableOpacity>
        </View>
        <View style={[BaseStyles.col]}>
          <TouchableOpacity onPress={() => alert('Hello, world!')}>
            <Text style={[BaseStyles.text, BaseStyles.textCenter]}>Ride</Text>
          </TouchableOpacity>
        </View>
        <View style={[BaseStyles.col]}>
          <TouchableOpacity onPress={() => alert('Hello, world!')}>
            <Text style={[BaseStyles.text, BaseStyles.textCenter]}>Swim</Text>
          </TouchableOpacity>
        </View>
        <View style={[BaseStyles.col]}>
          <TouchableOpacity onPress={() => alert('Hello, world!')}>
            <Text style={[BaseStyles.text, BaseStyles.textCenter]}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileImg: {
    height: 50,
    width: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
