import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { EventProvider } from './src/services/EventContext';
import { APP_START_TIME } from './src/utils/time';

// Initialize start time
const _ = APP_START_TIME;

SplashScreen.preventAutoHideAsync();
import StartScreen from './src/screens/start';
import Title_host from './src/screens/Title_host';
import Title_guest from './src/screens/Title_guest';
import Visitor from './src/screens/Visitor';
import Event_create from './src/screens/Event_create';
import Event_send from './src/screens/Event_send';
import Event_all from './src/screens/Event_all';
import Event_answer_home from './src/screens/Event_answer_home';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateEventScreen from './src/screens/CreateEventScreen';

const Stack = createStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFC800',
    text: '#ffffff',
  },
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'NicoMoji': require('./assets/fonts/NicoMoji.ttf'),
  });
  const [showLongLoading, setShowLongLoading] = useState(false);

  useEffect(() => {
    if (fontError) {
      console.error('Font loading error:', fontError);
    }
  }, [fontError]);

  // Hide native splash screen immediately to show our custom splash
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  // Check for long loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!fontsLoaded && !fontError) {
        setShowLongLoading(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.splashContainer}>
        <ImageBackground
          source={require('./assets/start.png')}
          style={styles.splashImage}
          resizeMode="cover"
        >
          {showLongLoading && (
            <View style={styles.loadingTextContainer}>
              <Text style={styles.loadingText}>ロード中です...しばらくお待ちください</Text>
            </View>
          )}
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <EventProvider>
          <NavigationContainer theme={AppTheme}>
            <Stack.Navigator 
              initialRouteName="Start"
              screenOptions={{
                headerTitleStyle: {
                  fontFamily: 'NicoMoji',
                },
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                  open: TransitionSpecs.TransitionIOSSpec,
                  close: TransitionSpecs.TransitionIOSSpec,
                },
                gestureEnabled: true,
                gestureDirection: 'horizontal',
              }}
            >
              <Stack.Screen 
                name="Start" 
                component={StartScreen} 
                options={{ headerShown: false }} 
              />
              <Stack.Screen 
                name="Title_host" 
                component={Title_host} 
                options={{ 
                  headerShown: false,
                  cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                }} 
              />
              <Stack.Screen 
                name="Title_guest" 
                component={Title_guest} 
                options={{ headerShown: false }} 
              />
              <Stack.Screen 
                name="Visitor" 
                component={Visitor} 
                options={{ headerShown: false }} 
              />
              <Stack.Screen 
                name="Event_create" 
                component={Event_create} 
                options={{ headerShown: false }} 
              />
              <Stack.Screen 
                name="Event_send" 
                component={Event_send} 
                options={{ headerShown: false }} 
              />
              <Stack.Screen 
                name="Event_all" 
                component={Event_all} 
                options={{ headerShown: false }} 
              />
              <Stack.Screen 
                name="Event_answer_home" 
                component={Event_answer_home} 
                options={{ headerShown: false }} 
              />
              <Stack.Screen 
                name="SignIn" 
                component={SignInScreen} 
                options={{ headerShown: false }} 
              />
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ headerShown: false }} 
              />
              <Stack.Screen 
                name="CreateEvent" 
                component={CreateEventScreen} 
                options={{ title: '予定作成' }} 
              />
            </Stack.Navigator>
          </NavigationContainer>
        </EventProvider>
      </SafeAreaProvider>
    </View>
  );
}   

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#FFC800',
  },
  splashImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTextContainer: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
