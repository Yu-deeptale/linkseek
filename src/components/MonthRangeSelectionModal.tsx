import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AnimatedModal from './AnimatedModal';

type MonthRangeSelectionModalProps = {
  visible: boolean;
  startMonth: number;
  endMonth: number;
  onConfirm: (start: number, end: number) => void;
  onClose: () => void;
  onReset?: () => void;
};

export default function MonthRangeSelectionModal({
  visible,
  startMonth,
  endMonth,
  onConfirm,
  onClose,
  onReset,
}: MonthRangeSelectionModalProps) {
  const [tempStart, setTempStart] = useState(startMonth || 1);
  const [tempEnd, setTempEnd] = useState(endMonth || 1);
  const [activeTab, setActiveTab] = useState<'start' | 'end'>('start');

  useEffect(() => {
    if (visible) {
      setTempStart(startMonth || 1);
      setTempEnd(endMonth || 1);
      setActiveTab('start');
    }
  }, [visible, startMonth, endMonth]);

  const handleConfirm = () => {
    onConfirm(tempStart, tempEnd);
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
      title="募集期間"
      buttonText="決定"
      onReset={onReset ? handleReset : undefined}
    >
      <View style={styles.container}>
        {/* タブ切り替え */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'start' && styles.activeTab]}
            onPress={() => setActiveTab('start')}
          >
            <Text style={[styles.tabLabel, activeTab === 'start' && styles.activeTabLabel]}>開始月</Text>
            <Text style={[styles.dateDisplay, activeTab === 'start' && styles.activeDateDisplay]}>
              {tempStart}月
            </Text>
          </TouchableOpacity>

          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>→</Text>
          </View>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'end' && styles.activeTab]}
            onPress={() => setActiveTab('end')}
          >
            <Text style={[styles.tabLabel, activeTab === 'end' && styles.activeTabLabel]}>終了月</Text>
            <Text style={[styles.dateDisplay, activeTab === 'end' && styles.activeDateDisplay]}>
              {tempEnd}月
            </Text>
          </TouchableOpacity>
        </View>

        {/* ピッカー */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={activeTab === 'start' ? tempStart : tempEnd}
            onValueChange={(itemValue) => {
              if (activeTab === 'start') {
                setTempStart(itemValue);
              } else {
                setTempEnd(itemValue);
              }
            }}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
              <Picker.Item key={num} label={`${num}月`} value={num} />
            ))}
          </Picker>
        </View>
      </View>
    </AnimatedModal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  tab: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    width: '40%',
  },
  activeTab: {
    backgroundColor: '#FFC800',
  },
  tabLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontFamily: 'NicoMoji',
  },
  activeTabLabel: {
    color: '#fff',
  },
  dateDisplay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'NicoMoji',
  },
  activeDateDisplay: {
    color: '#fff',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    color: '#666',
    fontFamily: 'NicoMoji',
  },
  pickerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  picker: {
    width: 200,
    height: 200,
  },
  pickerItem: {
    fontSize: 24,
    height: 200,
    color: '#000000',
  },
});
