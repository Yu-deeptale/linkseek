import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEventService } from '../services/EventContext';
import { Event } from '../models/Event';

type RootStackParamList = {
  CreateEvent: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateEvent'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { getEventsForDay, removeEvent } = useEventService();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const events = getEventsForDay(selectedDate);

  const onDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const renderEventItem = ({ item }: { item: Event }) => {
    const startStr = `${item.start.getHours()}:${item.start.getMinutes().toString().padStart(2, '0')}`;
    const endStr = `${item.end.getHours()}:${item.end.getMinutes().toString().padStart(2, '0')}`;

    return (
      <View style={styles.eventItem}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventTime}>{startStr} - {endStr}</Text>
        </View>
        <Button title="削除" onPress={() => removeEvent(item.id)} color="red" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>linkseek - ホーム</Text>
        <Button title="+" onPress={() => navigation.navigate('CreateEvent')} />
      </View>

      <View style={styles.dateSelector}>
        <Text style={styles.dateText}>選択日: {selectedDate.toISOString().split('T')[0]}</Text>
        <Button title="日付選択" onPress={() => setShowDatePicker(true)} />
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <View style={styles.listContainer}>
        {events.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>この日の予定はありません</Text>
          </View>
        ) : (
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={renderEventItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'NicoMoji',
    color: '#ffffff',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dateText: {
    marginRight: 12,
    fontSize: 16,
    fontFamily: 'NicoMoji',
    color: '#ffffff',
  },
  listContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'NicoMoji',
    color: '#ffffff',
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'NicoMoji',
    color: '#ffffff',
  },
  eventTime: {
    color: '#ffffff',
    fontFamily: 'NicoMoji',
  },
});
