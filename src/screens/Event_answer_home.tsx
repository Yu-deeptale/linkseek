import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Event } from '../models/Event';

type EventAnswerRouteParams = {
  eventId: string;
};

export default function Event_answer_home() {
  const route = useRoute<RouteProp<{ params: EventAnswerRouteParams }, 'params'>>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const eventId = route.params?.eventId;

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) {
        Alert.alert('エラー', 'イベントIDが見つかりません');
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'events', eventId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Convert Firestore Timestamps to Dates if necessary
          // Note: In simplified case we cast, but be careful with Dates
          setEvent({ id: docSnap.id, ...data } as Event);
        } else {
          Alert.alert('エラー', 'イベントが見つかりません');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        Alert.alert('エラー', 'イベント情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>イベント情報を読み込み中...</Text>
      </SafeAreaView>
    );
  }

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>イベント情報を表示できません</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>イベント名:</Text>
        <Text style={styles.title}>{event.title}</Text>

        <Text style={styles.label}>場所:</Text>
        <Text style={styles.text}>{event.location}</Text>

        <Text style={styles.label}>所要時間:</Text>
        <Text style={styles.text}>{event.duration.hours}時間 {event.duration.minutes}分</Text>
      </View>
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
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 10,
    width: '85%',
  },
  loadingText: {
    marginTop: 10,
    color: '#ffffff',
    fontFamily: 'NicoMoji',
  },
  errorText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'NicoMoji',
  },
  label: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 15,
    fontFamily: 'NicoMoji',
  },
  title: {
    fontFamily: 'NicoMoji',
    fontSize: 28,
    color: '#ffffff',
    marginBottom: 5,
  },
  text: {
    fontFamily: 'NicoMoji',
    fontSize: 20,
    color: '#ffffff',
  },
});
