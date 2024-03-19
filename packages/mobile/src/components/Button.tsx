import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import constants from "../config/constants";

export interface ButtonProps {
  onPress: () => void;
  title: string;
  color: string;
  backgroundColor: string;
  style?: any;
}

const Button: React.FC<ButtonProps> = ({ onPress, title, color, backgroundColor, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: backgroundColor, ...style}]}
    >
      <Text style={[styles.text, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: constants.fonts.extraBold,
    marginVertical: 10
  },
});

export default Button