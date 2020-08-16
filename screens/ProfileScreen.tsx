import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import BaseStyles from '../utils/BaseStyles';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={[BaseStyles.bgWhite, BaseStyles.p4, {flexWrap: 'wrap', minHeight: '100%'}]}>
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
            <Text style={[BaseStyles.text]}>Run</Text>
          </TouchableOpacity>
        </View>
        <View style={[BaseStyles.col]}>
          <TouchableOpacity onPress={() => alert('Hello, world!')}>
            <Text style={[BaseStyles.text]}>Ride</Text>
          </TouchableOpacity>
        </View>
        <View style={[BaseStyles.col]}>
          <TouchableOpacity onPress={() => alert('Hello, world!')}>
            <Text style={[BaseStyles.text]}>Swim</Text>
          </TouchableOpacity>
        </View>
        <View style={[BaseStyles.col]}>
          <TouchableOpacity onPress={() => alert('Hello, world!')}>
            <Text style={[BaseStyles.text]}>Other</Text>
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
  textMuted: {
    color: 'gray',
  },
  bgWhite: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  titleBar: {
    flex: 1,
    flexBasis: 'auto',
    flexDirection: 'row',
    marginBottom: 20,
  },
  flex: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  city: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
