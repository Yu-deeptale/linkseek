import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEventService } from '../services/EventContext';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function CreateEventScreen() {
  const navigation = useNavigation();
  const { addEvent } = useEventService();

  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date(new Date().getTime() + 60 * 60 * 1000));
  
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');

  // Helper to handle date/time picking logic
  const onStartChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) {
      if (mode === 'date') {
        // Keep time, change date
        const newDate = new Date(selectedDate);
        newDate.setHours(start.getHours());
        newDate.setMinutes(start.getMinutes());
        setStart(newDate);
        setMode('time'); // Next pick time
        if (Platform.OS !== 'ios') setShowStartPicker(true); // Re-open for time on Android
      } else {
        // Change time
        const newDate = new Date(start);
        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());
        setStart(newDate);
        setShowStartPicker(false);
        setMode('date'); // Reset
      }
    } else {
      setShowStartPicker(false);
      setMode('date');
    }
  };

  // Simplified picker for demo: just pick date and time separately or use native behavior
  // For simplicity in this port, let's just use a simple flow: Pick Date -> Pick Time
  
  const showPicker = (isStart: boolean) => {
    if (isStart) setShowStartPicker(true);
    else setShowEndPicker(true);
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('タイトルを入力してください');
      return;
    }
    const id = uuidv4();
    addEvent({
      id,
      title,
      start,
      end,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>タイトル</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="予定のタイトル"
        />

        <View style={styles.row}>
          <Text style={styles.rowText}>開始: {start.toLocaleString()}</Text>
          <Button title="変更" onPress={() => showPicker(true)} />
        </View>
        {showStartPicker && (
          <DateTimePicker
            value={start}
            mode="datetime"
            display="default"
            onChange={(e, d) => {
              setShowStartPicker(false);
              if (d) setStart(d);
            }}
          />
        )}

        <View style={styles.row}>
          <Text style={styles.rowText}>終了: {end.toLocaleString()}</Text>
          <Button title="変更" onPress={() => showPicker(false)} />
        </View>
        {showEndPicker && (
          <DateTimePicker
            value={end}
            mode="datetime"
            display="default"
            onChange={(e, d) => {
              setShowEndPicker(false);
              if (d) setEnd(d);
            }}
          />
        )}

        <View style={styles.saveButton}>
          <Button title="保存" onPress={handleSave} />
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
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'NicoMoji',
    color: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffffff',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
    fontFamily: 'NicoMoji',
    color: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rowText: {
    fontFamily: 'NicoMoji',
    color: '#ffffff',
  },
  saveButton: {
    marginTop: 24,
  },
});
