import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AnimatedModal from './AnimatedModal';

type DaySelectionModalProps = {
  visible: boolean;
  selectedDays: string[];
  onToggleDay: (day: string) => void;
  onClose: () => void;
};

export default function DaySelectionModal({ visible, selectedDays, onToggleDay, onClose }: DaySelectionModalProps) {
  const daysOfWeek = ['月', '火', '水', '木', '金', '土', '日'];

  return (
    <AnimatedModal
      visible={visible}
      onClose={onClose}
      title="曜日を選択"
    >
      <View style={styles.daysWrapper}>
        {/* 1行目: 月～金 (5つ) */}
        <View style={styles.daysRow}>
          {daysOfWeek.slice(0, 5).map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDays.includes(day) && styles.dayButtonSelected
              ]}
              onPress={() => onToggleDay(day)}
            >
              <Text style={[
                styles.dayText,
                selectedDays.includes(day) && styles.dayTextSelected
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 2行目: 土・日 (2つ) */}
        <View style={styles.daysRow}>
          {daysOfWeek.slice(5).map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDays.includes(day) && styles.dayButtonSelected
              ]}
              onPress={() => onToggleDay(day)}
            >
              <Text style={[
                styles.dayText,
                selectedDays.includes(day) && styles.dayTextSelected
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </AnimatedModal>
  );
}

const styles = StyleSheet.create({
  daysWrapper: {
    gap: 10,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFC800',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dayButtonSelected: {
    backgroundColor: '#FFC800',
  },
  dayText: {
    fontFamily: 'NicoMoji',
    fontSize: 16,
    color: '#333',
  },
  dayTextSelected: {
    color: '#fff',
  },
});