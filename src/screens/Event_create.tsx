import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Event_create() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Event</Text>
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
