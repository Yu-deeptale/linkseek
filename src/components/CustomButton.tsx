import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, ViewStyle, TextStyle } from 'react-native';

const { width, height } = Dimensions.get('window');

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

export default function CustomButton({ title, onPress, style, textStyle, disabled = false }: CustomButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.button, style, disabled && styles.disabledButton]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle, disabled && styles.disabledButtonText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: width * 0.55,
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00A3E3',
    borderRadius: (height * 0.1) / 2,
    // 影をつける場合
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontFamily: 'NicoMoji',
    fontSize: width * 0.06,
    color: '#cfeeff',
  },
  disabledButtonText: {
    color: '#cfeeff',
  },
});
