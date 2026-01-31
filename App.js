import React from 'react';
import {StyleSheet, View} from 'react-native';
import KnightScreen from './src/screens/KnightScreen';

export default function App() {
  return (
    <View style={styles.root}>
      <KnightScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
});
