import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type EventSendRouteParams = {
  eventId: string;
};

export default function Event_send() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: EventSendRouteParams } , 'params'>>();
  // If eventId is missing (e.g. direct navigation during dev), fallback or handle error
  const eventId = route.params?.eventId || 'test-event-id';
  
  const shareUrl = `linkseek://event/answer/${eventId}`;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(shareUrl);
    Alert.alert('コピーしました', 'URLをクリップボードにコピーしました');
  };

  const handleUrlPress = () => {
    // Navigate to Event_answer_home with the eventId
    navigation.navigate('Event_answer_home', { eventId } as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>イベントを作りました！</Text>
      
      <View style={styles.urlContainer}>
        <TouchableOpacity onPress={handleUrlPress}>
          <Text style={styles.urlText}>{shareUrl}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
        <Text style={styles.copyButtonText}>URLをコピー</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC800',

  },
  title: {
    fontFamily: 'NicoMoji',
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 80,
  },
  urlContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 50,
    width: '80%',
    alignItems: 'center',
  },
  urlText: {
    fontSize: 16,
    color: '#00A3E3',
    textDecorationLine: 'underline',
  },
  copyButton: {
    backgroundColor: '#00A3E3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  copyButtonText: {
    fontFamily: 'NicoMoji',
    fontSize: 18,
    color: '#FFF',
  },
});
