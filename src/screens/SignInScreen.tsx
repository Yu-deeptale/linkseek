import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
};

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function SignInScreen() {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>linkseek - サインイン</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="サンプルでログイン（匿名）"
            onPress={() => navigation.replace('Home')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'NicoMoji',
    color: '#ffffff',
  },
  buttonContainer: {
    width: '80%',
  },
});
