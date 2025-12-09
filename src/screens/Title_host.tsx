import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomButton from '../components/CustomButton';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  Event_create: undefined;
  Visitor: undefined;
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
        <CustomButton 
          title="イベントをつくる" 
          onPress={() => navigation.navigate('Event_create')} 
        />
        <CustomButton 
          title="かいとうをかえる" 
          onPress={() => navigation.navigate('Visitor')} 
        />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'NicoMoji',
    fontSize: width * 0.13,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: width * 0.01, height: width * 0.01 },
    textShadowRadius: 5,
  },
  bottomSection: {
    flex: 1.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: height * 0.15,
    gap: height * 0.05,
  },
});
