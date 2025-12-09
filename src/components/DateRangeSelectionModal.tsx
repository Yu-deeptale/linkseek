import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AnimatedModal from './AnimatedModal';

type DateRangeSelectionModalProps = {
  visible: boolean;
  startDate: Date;
  endDate: Date;
  onConfirm: (start: Date, end: Date) => void;
  onClose: () => void;
  onReset?: () => void;
};

export default function DateRangeSelectionModal({
  visible,
  startDate,
  endDate,
  onConfirm,
  onClose,
  onReset,
}: DateRangeSelectionModalProps) {
  const [tempStart, setTempStart] = useState(startDate);
  const [tempEnd, setTempEnd] = useState(endDate);
  const [activeTab, setActiveTab] = useState<'start' | 'end'>('start');

  useEffect(() => {
    if (visible) {
      setTempStart(startDate);
      setTempEnd(endDate);
      setActiveTab('start');
    }
  }, [visible, startDate, endDate]);

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

  const onChange = (event: any, selectedDate?: Date) => {
    if (!selectedDate) return;

    if (activeTab === 'start') {
      setTempStart(selectedDate);
    } else {
      setTempEnd(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}`;
  };

  return (
    <AnimatedModal
      visible={visible}
      onClose={handleConfirm}
      title="日指定"
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
            <Text style={[styles.tabLabel, activeTab === 'start' && styles.activeTabLabel]}>開始</Text>
            <Text style={[styles.dateDisplay, activeTab === 'start' && styles.activeDateDisplay]}>
              {formatDate(tempStart)}
            </Text>
          </TouchableOpacity>

          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>→</Text>
          </View>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'end' && styles.activeTab]}
            onPress={() => setActiveTab('end')}
          >
            <Text style={[styles.tabLabel, activeTab === 'end' && styles.activeTabLabel]}>終了</Text>
            <Text style={[styles.dateDisplay, activeTab === 'end' && styles.activeDateDisplay]}>
              {formatDate(tempEnd)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ピッカー */}
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={activeTab === 'start' ? tempStart : tempEnd}
            mode="date"
            display="spinner"
            onChange={onChange}
            textColor="#000000"
            locale="ja-JP"
            style={styles.picker}
          />
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
    paddingHorizontal: 10,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    minWidth: 100,
  },
  activeTab: {
    backgroundColor: '#FFC800',
  },
  tabLabel: {
    fontFamily: 'NicoMoji',
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  activeTabLabel: {
    color: '#fff',
  },
  dateDisplay: {
    fontFamily: 'NicoMoji',
    fontSize: 24,
    color: '#333',
  },
  activeDateDisplay: {
    color: '#fff',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontFamily: 'NicoMoji',
    fontSize: 24,
    color: '#999',
  },
  pickerContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: '100%',
    height: 200,
  },
});
