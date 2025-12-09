import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import DaySelectionModal from '../components/DaySelectionModal';
import WeekSelectionModal from '../components/WeekSelectionModal';
import TimeRangeSelectionModal from '../components/TimeRangeSelectionModal';
import DateRangeSelectionModal from '../components/DateRangeSelectionModal';
import NumberSelectionModal from '../components/NumberSelectionModal';
import MonthRangeSelectionModal from '../components/MonthRangeSelectionModal';
import DurationSelectionModal from '../components/DurationSelectionModal';

const { width, height } = Dimensions.get('window');

export default function Event_create() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [weekModalVisible, setWeekModalVisible] = useState(false);
  const [selectedWeeks, setSelectedWeeks] = useState<string[]>([]);
  const [timeRangeModalVisible, setTimeRangeModalVisible] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isTimeSet, setIsTimeSet] = useState(false);
  const [dateRangeModalVisible, setDateRangeModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDateSet, setIsDateSet] = useState(false);
  const [capacityModalVisible, setCapacityModalVisible] = useState(false);
  const [capacity, setCapacity] = useState(1);
  const [isCapacitySet, setIsCapacitySet] = useState(false);
  const [monthRangeModalVisible, setMonthRangeModalVisible] = useState(false);
  const [startMonth, setStartMonth] = useState(1);
  const [endMonth, setEndMonth] = useState(1);
  const [isMonthSet, setIsMonthSet] = useState(false);
  const [durationModalVisible, setDurationModalVisible] = useState(false);
  const [durationHours, setDurationHours] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [isDurationSet, setIsDurationSet] = useState(false);

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const toggleWeek = (week: string) => {
    if (selectedWeeks.includes(week)) {
      setSelectedWeeks(selectedWeeks.filter(w => w !== week));
    } else {
      setSelectedWeeks([...selectedWeeks, week]);
    }
  };

  const handleTimeConfirm = (start: Date, end: Date) => {
    setStartTime(start);
    setEndTime(end);
    setIsTimeSet(true);
  };

  const handleTimeReset = () => {
    setIsTimeSet(false);
    setStartTime(new Date());
    setEndTime(new Date());
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleDateConfirm = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    setIsDateSet(true);
  };

  const handleDateReset = () => {
    setIsDateSet(false);
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const formatDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}`;
  };

  const handleCapacityConfirm = (val: number) => {
    setCapacity(val);
    setIsCapacitySet(true);
  };

  const handleCapacityReset = () => {
    setIsCapacitySet(false);
    setCapacity(1);
  };

  const handleMonthConfirm = (start: number, end: number) => {
    setStartMonth(start);
    setEndMonth(end);
    setIsMonthSet(true);
  };

  const handleMonthReset = () => {
    setIsMonthSet(false);
    setStartMonth(1);
    setEndMonth(1);
  };

  const handleDurationConfirm = (hours: number, minutes: number) => {
    setDurationHours(hours);
    setDurationMinutes(minutes);
    setIsDurationSet(true);
  };

  const handleDurationReset = () => {
    setIsDurationSet(false);
    setDurationHours(0);
    setDurationMinutes(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ヘッダー部分 */}
        <View style={styles.header}>
          <Text style={styles.title}>イベントを作成する</Text>
          <View style={styles.borderLine} />
        </View>

        {/* 入力フォーム部分 */}
        <View style={styles.formContainer}>
          {/* イベント名入力（横長） */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>イベント名</Text>
            <TextInput
              style={styles.longInput}
              placeholder="イベント名"
              placeholderTextColor="#999"
            />
          </View>

          {/* 2列4行の入力欄（計8つ） */}
          <View style={styles.gridContainer}>
            {[
              { label: 'イベント所要時間', placeholder: '00:00' },
              { label: '場所', placeholder: '場所' },
              { label: '募集期間', placeholder: '0月～0月' },
              { label: '募集人数', placeholder: '0人' },
              { label: '時間指定', placeholder: '00:00～00:00' },
              { label: '日指定', placeholder: '00日～00日' },
              { label: '週指定', placeholder: '第0週' },
              { label: '曜日指定', placeholder: '曜日を選択' },
            ].map((item, index) => (
              <React.Fragment key={index}>
                <View style={styles.gridItemWrapper}>
                  <Text style={styles.label}>{item.label}</Text>
                  {item.label === '曜日指定' ? (
                    <TouchableOpacity
                      style={[styles.gridInput, { justifyContent: 'center' }]}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={{ color: selectedDays.length > 0 ? '#000' : '#999', fontSize: 16, fontFamily: 'NicoMoji' }}>
                        {selectedDays.length > 0 ? selectedDays.join('・') : item.placeholder}
                      </Text>
                    </TouchableOpacity>
                  ) : item.label === 'イベント所要時間' ? (
                    <TouchableOpacity
                      style={[styles.gridInput, { justifyContent: 'center' }]}
                      onPress={() => setDurationModalVisible(true)}
                    >
                      <Text style={{ color: isDurationSet ? '#000' : '#999', fontSize: 16, fontFamily: 'NicoMoji' }}>
                        {isDurationSet ? `${durationHours}時間${durationMinutes.toString().padStart(2, '0')}分` : item.placeholder}
                      </Text>
                    </TouchableOpacity>
                  ) : item.label === '週指定' ? (
                    <TouchableOpacity
                      style={[styles.gridInput, { justifyContent: 'center' }]}
                      onPress={() => setWeekModalVisible(true)}
                    >
                      <Text style={{ color: selectedWeeks.length > 0 ? '#000' : '#999', fontSize: 16, fontFamily: 'NicoMoji' }}>
                        {selectedWeeks.length > 0 ? selectedWeeks.join('・') : item.placeholder}
                      </Text>
                    </TouchableOpacity>
                  ) : item.label === '募集期間' ? (
                    <TouchableOpacity
                      style={[styles.gridInput, { justifyContent: 'center' }]}
                      onPress={() => setMonthRangeModalVisible(true)}
                    >
                      <Text style={{ color: isMonthSet ? '#000' : '#999', fontSize: 16, fontFamily: 'NicoMoji' }}>
                        {isMonthSet ? `${startMonth}月～${endMonth}月` : item.placeholder}
                      </Text>
                    </TouchableOpacity>
                  ) : item.label === '募集人数' ? (
                    <TouchableOpacity
                      style={[styles.gridInput, { justifyContent: 'center' }]}
                      onPress={() => setCapacityModalVisible(true)}
                    >
                      <Text style={{ color: isCapacitySet ? '#000' : '#999', fontSize: 16, fontFamily: 'NicoMoji' }}>
                        {isCapacitySet ? `${capacity}人` : item.placeholder}
                      </Text>
                    </TouchableOpacity>
                  ) : item.label === '時間指定' ? (
                    <TouchableOpacity
                      style={[styles.gridInput, { justifyContent: 'center' }]}
                      onPress={() => setTimeRangeModalVisible(true)}
                    >
                      <Text style={{ color: isTimeSet ? '#000' : '#999', fontSize: 16, fontFamily: 'NicoMoji' }}>
                        {isTimeSet ? `${formatTime(startTime)}～${formatTime(endTime)}` : item.placeholder}
                      </Text>
                    </TouchableOpacity>
                  ) : item.label === '日指定' ? (
                    <TouchableOpacity
                      style={[styles.gridInput, { justifyContent: 'center' }]}
                      onPress={() => setDateRangeModalVisible(true)}
                    >
                      <Text style={{ color: isDateSet ? '#000' : '#999', fontSize: 16, fontFamily: 'NicoMoji' }}>
                        {isDateSet ? `${formatDate(startDate)}～${formatDate(endDate)}` : item.placeholder}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TextInput
                      style={styles.gridInput}
                      placeholder={item.placeholder}
                      placeholderTextColor="#999"
                    />
                  )}
                </View>
                {index === 3 && <View style={styles.separator} />}
              </React.Fragment>
            ))}
          </View>

          {/* 作成ボタン */}
          <View style={styles.buttonContainer}>
            <CustomButton title="この条件で作成" onPress={() => {}} />
          </View>
        </View>
      </ScrollView>

      {/* 曜日選択モーダル */}
      <DaySelectionModal
        visible={modalVisible}
        selectedDays={selectedDays}
        onToggleDay={toggleDay}
        onClose={() => setModalVisible(false)}
      />

      {/* 週選択モーダル */}
      <WeekSelectionModal
        visible={weekModalVisible}
        selectedWeeks={selectedWeeks}
        onToggleWeek={toggleWeek}
        onClose={() => setWeekModalVisible(false)}
      />

      {/* 時間指定モーダル */}
      <TimeRangeSelectionModal
        visible={timeRangeModalVisible}
        startTime={startTime}
        endTime={endTime}
        onConfirm={handleTimeConfirm}
        onClose={() => setTimeRangeModalVisible(false)}
        onReset={handleTimeReset}
      />

      {/* 日指定モーダル */}
      <DateRangeSelectionModal
        visible={dateRangeModalVisible}
        startDate={startDate}
        endDate={endDate}
        onConfirm={handleDateConfirm}
        onClose={() => setDateRangeModalVisible(false)}
        onReset={handleDateReset}
      />

      {/* 募集人数モーダル */}
      <NumberSelectionModal
        visible={capacityModalVisible}
        selectedValue={capacity}
        onConfirm={handleCapacityConfirm}
        onClose={() => setCapacityModalVisible(false)}
        onReset={handleCapacityReset}
      />

      {/* 募集期間モーダル */}
      <MonthRangeSelectionModal
        visible={monthRangeModalVisible}
        startMonth={startMonth}
        endMonth={endMonth}
        onConfirm={handleMonthConfirm}
        onClose={() => setMonthRangeModalVisible(false)}
        onReset={handleMonthReset}
      />

      {/* イベント所要時間モーダル */}
      <DurationSelectionModal
        visible={durationModalVisible}
        hours={durationHours}
        minutes={durationMinutes}
        onConfirm={handleDurationConfirm}
        onClose={() => setDurationModalVisible(false)}
        onReset={handleDurationReset}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC800',
  },
  scrollContent: {
    padding: width * 0.05,
  },
  header: {
    marginBottom: height * 0.03,
  },
  title: {
    fontFamily: 'NicoMoji',
    fontSize: width * 0.06,
    color: '#ffffff',
    marginBottom: 5,
  },
  borderLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#ffffff',
  },
  separator: {
    width: '100%',
    height: 2,
    backgroundColor: '#ffffff',
    marginVertical: height * 0.02,
  },
  formContainer: {
    gap: height * 0.02,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: height * 0.01,
  },
  longInput: {
    width: '100%',
    height: height * 0.06,
    backgroundColor: '#ffffff',
    borderRadius: (height * 0.06) / 2,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'NicoMoji',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItemWrapper: {
    width: '48%',
    marginBottom: height * 0.02,
  },
  gridInput: {
    width: '100%',
    height: height * 0.06,
    backgroundColor: '#ffffff',
    borderRadius: (height * 0.06) / 2,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'NicoMoji',
  },
  label: {
    fontFamily: 'NicoMoji',
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 8,
    marginLeft: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.05,
  },
});
