import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AnimatedModal from './AnimatedModal';

type TimeRangeSelectionModalProps = {
  visible: boolean;
  startTime: Date;
  endTime: Date;
  onConfirm: (start: Date, end: Date) => void;
  onClose: () => void;
  onReset?: () => void;
};

export default function TimeRangeSelectionModal({
  visible,
  startTime,
  endTime,
  onConfirm,
  onClose,
  onReset,
}: TimeRangeSelectionModalProps) {
  const [tempStart, setTempStart] = useState(startTime);
  const [tempEnd, setTempEnd] = useState(endTime);
  const [activeTab, setActiveTab] = useState<'start' | 'end'>('start');

  // モーダルが開くたびに初期値をリセットしたい場合はuseEffectを使うが、
  // ここでは親から渡されるstartTime/endTimeが変われば再レンダリングされる前提。
  // ただし、編集中にキャンセルした場合はリセットされないので、
  // visibleが変わったタイミングでstateを更新する処理を入れるのがベター。
  React.useEffect(() => {
    if (visible) {
      setTempStart(startTime);
      setTempEnd(endTime);
      setActiveTab('start');
    }
  }, [visible, startTime, endTime]);

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

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <AnimatedModal
      visible={visible}
      onClose={handleConfirm}
      title="時間指定"
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
            <Text style={[styles.timeDisplay, activeTab === 'start' && styles.activeTimeDisplay]}>
              {formatTime(tempStart)}
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
            <Text style={[styles.timeDisplay, activeTab === 'end' && styles.activeTimeDisplay]}>
              {formatTime(tempEnd)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ピッカー */}
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={activeTab === 'start' ? tempStart : tempEnd}
            mode="time"
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
  timeDisplay: {
    fontFamily: 'NicoMoji',
    fontSize: 24,
    color: '#333',
  },
  activeTimeDisplay: {
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
