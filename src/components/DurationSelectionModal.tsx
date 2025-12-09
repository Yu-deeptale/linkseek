import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AnimatedModal from './AnimatedModal';

type DurationSelectionModalProps = {
  visible: boolean;
  hours: number;
  minutes: number;
  onConfirm: (hours: number, minutes: number) => void;
  onClose: () => void;
  onReset?: () => void;
};

export default function DurationSelectionModal({
  visible,
  hours,
  minutes,
  onConfirm,
  onClose,
  onReset,
}: DurationSelectionModalProps) {
  const [tempHours, setTempHours] = useState(hours || 0);
  const [tempMinutes, setTempMinutes] = useState(minutes || 0);

  useEffect(() => {
    if (visible) {
      setTempHours(hours || 0);
      setTempMinutes(minutes || 0);
    }
  }, [visible, hours, minutes]);

  const handleConfirm = () => {
    onConfirm(tempHours, tempMinutes);
    onClose();
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
    onClose();
  };

  return (
    <AnimatedModal
      visible={visible}
      onClose={handleConfirm}
      title="イベント所要時間"
      buttonText="決定"
      onReset={onReset ? handleReset : undefined}
    >
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          {/* Hours Picker */}
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={tempHours}
              onValueChange={(itemValue) => setTempHours(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {Array.from({ length: 24 }, (_, i) => i).map((num) => (
                <Picker.Item key={num} label={`${num}`} value={num} />
              ))}
            </Picker>
            <Text style={styles.unitLabel}>時間</Text>
          </View>

          {/* Minutes Picker */}
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={tempMinutes}
              onValueChange={(itemValue) => setTempMinutes(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {Array.from({ length: 60 }, (_, i) => i).map((num) => (
                <Picker.Item key={num} label={`${num.toString().padStart(2, '0')}`} value={num} />
              ))}
            </Picker>
            <Text style={styles.unitLabel}>分</Text>
          </View>
        </View>
      </View>
    </AnimatedModal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  picker: {
    width: 100,
    height: 200,
  },
  pickerItem: {
    fontSize: 24,
    height: 200,
    color: '#000000',
  },
  unitLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#333',
    fontFamily: 'NicoMoji',
    position: 'relative',
    left: -10,
  },
});
