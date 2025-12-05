import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
};

type TitleHostScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function Title_host() {
  const navigation = useNavigation<TitleHostScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Linkseek</Text>
      </View>
      
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('SignIn')}
        >
          <Image 
            source={require('../../assets/create.png')} 
            style={styles.buttonImage} 
            resizeMode="contain" 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('SignIn')}
        >
          <Image 
            source={require('../../assets/answer.png')} 
            style={styles.buttonImage} 
            resizeMode="contain" 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC800',
  },
  topSection: {
    flex: 1, // 1/3 of the screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'NicoMoji',
    fontSize: 50,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 5,
  },
  bottomSection: {
    flex: 2, // 2/3 of the screen
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    gap: 50,
  },
  button: {
    width: 250,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
});
