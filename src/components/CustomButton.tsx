import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, ViewStyle, TextStyle } from 'react-native';

const { width, height } = Dimensions.get('window');

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function CustomButton({ title, onPress, style, textStyle }: CustomButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
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
  buttonText: {
    fontFamily: 'NicoMoji',
    fontSize: width * 0.06,
    color: '#cfeeff',
  },
});
