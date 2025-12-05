import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Title_guest() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Linkseek Guest</Text>
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
    fontSize: 40,
    color: '#ffffff',
  },
});
