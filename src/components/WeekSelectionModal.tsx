import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AnimatedModal from './AnimatedModal';

type WeekSelectionModalProps = {
  visible: boolean;
  selectedWeeks: string[];
  onToggleWeek: (week: string) => void;
  onClose: () => void;
};

export default function WeekSelectionModal({ visible, selectedWeeks, onToggleWeek, onClose }: WeekSelectionModalProps) {
  const weeks = ['第１週', '第２週', '第３週', '第４週', '第５週'];

  return (
    <AnimatedModal
      visible={visible}
      onClose={onClose}
      title="週を選択"
    >
      <View style={styles.weeksWrapper}>
        {weeks.map((week) => (
          <TouchableOpacity
            key={week}
            style={[
              styles.weekButton,
              selectedWeeks.includes(week) && styles.weekButtonSelected
            ]}
            onPress={() => onToggleWeek(week)}
          >
            <Text style={[
              styles.weekText,
              selectedWeeks.includes(week) && styles.weekTextSelected
            ]}>
              {week}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </AnimatedModal>
  );
}

const styles = StyleSheet.create({
  weeksWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  weekButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFC800',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    minWidth: 80,
  },
  weekButtonSelected: {
    backgroundColor: '#FFC800',
  },
  weekText: {
    fontFamily: 'NicoMoji',
    fontSize: 16,
    color: '#333',
  },
  weekTextSelected: {
    color: '#fff',
  },
});