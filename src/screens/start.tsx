import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { APP_START_TIME } from '../utils/time';

type RootStackParamList = {
  Title_host: undefined;
};

type StartScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function StartScreen() {
  const navigation = useNavigation<StartScreenNavigationProp>();

  useEffect(() => {
    const elapsed = Date.now() - APP_START_TIME;
    const minTime = 2500;
    const delay = Math.max(0, minTime - elapsed);

    const timer = setTimeout(() => {
      navigation.replace('Title_host');
    }, delay);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/start.png')}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC800',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
