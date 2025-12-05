import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Event_answer_home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Answer Method</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'NicoMoji',
    fontSize: 30,
    color: '#ffffff',
  },
});
