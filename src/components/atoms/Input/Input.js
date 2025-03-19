import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../contexts/ThemeContext';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  leftIcon,
  rightIcon,
  errorText,
  onRightIconPress,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const inputStyles = [
    styles.input,
    {
      borderColor: isFocused ? theme.colors.primary : errorText ? theme.colors.error : theme.colors.border,
      borderWidth: 1,
      paddingLeft: leftIcon ? 40 : 16,
      paddingRight: rightIcon || secureTextEntry ? 40 : 16,
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
    },
    style
  ];

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label}
        </Text>
      )}
      <View style={styles.inputContainer}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            <Icon
              name={leftIcon}
              size={20}
              color={isFocused ? theme.colors.primary : theme.colors.text}
            />
          </View>
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text + '80'}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          style={inputStyles}
          autoCapitalize="none"
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={togglePasswordVisibility}
          >
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
        {rightIcon && !secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
          >
            <Icon
              name={rightIcon}
              size={20}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorText && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  input: {
    height: 50,
    borderRadius: 8,
    fontSize: 16,
  },
  leftIconContainer: {
    position: 'absolute',
    left: 12,
    top: 15,
    zIndex: 1,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 12,
    top: 15,
    zIndex: 1,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
});

export default Input; 