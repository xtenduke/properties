import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const IconButton = ({ style, icon, onPress }) => {
  const Icon = icon;
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Icon />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    // Default styling for the button, can be overridden by passing 'style' prop
    justifyContent: 'center',
    alignItems: 'center',
    // Add other default styles if necessary
  },
});

export default IconButton;
