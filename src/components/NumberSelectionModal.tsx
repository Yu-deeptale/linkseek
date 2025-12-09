import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AnimatedModal from './AnimatedModal';

type NumberSelectionModalProps = {
  visible: boolean;
  selectedValue: number;
  onConfirm: (value: number) => void;
  onClose: () => void;
  onReset?: () => void;
};

export default function NumberSelectionModal({
  visible,
  selectedValue,
  onConfirm,
  onClose,
  onReset,
}: NumberSelectionModalProps) {
  const [tempValue, setTempValue] = useState(selectedValue || 1);

  useEffect(() => {
    if (visible) {
      setTempValue(selectedValue || 1);
    }
  }, [visible, selectedValue]);

  const handleConfirm = () => {
    onConfirm(tempValue);
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
      title="募集人数"
      buttonText="決定"
      onReset={onReset ? handleReset : undefined}
    >
      <View style={styles.container}>
        <Picker
          selectedValue={tempValue}
          onValueChange={(itemValue) => setTempValue(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
            <Picker.Item key={num} label={`${num}人`} value={num} />
          ))}
        </Picker>
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
  picker: {
    width: 200,
    height: 200,
  },
  pickerItem: {
    fontSize: 20,
    height: 200,
    color: '#000000',
  },
});
