import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';

const Button = ({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = () => {
    const buttonStyles = [styles.button];

    if (type === 'primary') {
      buttonStyles.push({
        backgroundColor: theme.colors.primary,
      });
    } else if (type === 'secondary') {
      buttonStyles.push({
        backgroundColor: theme.colors.secondary,
      });
    } else if (type === 'outline') {
      buttonStyles.push({
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
      });
    }

    if (size === 'small') {
      buttonStyles.push({
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
      });
    } else if (size === 'medium') {
      buttonStyles.push({
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
      });
    } else if (size === 'large') {
      buttonStyles.push({
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
      });
    }

    if (disabled) {
      buttonStyles.push({
        opacity: 0.5,
      });
    }

    return buttonStyles;
  };

  const getTextStyle = () => {
    const textStyles = [
      styles.text,
      {
        color: type === 'outline' ? theme.colors.primary : 'white',
        fontSize: size === 'small' ? theme.typography.fontSize.sm :
                 size === 'medium' ? theme.typography.fontSize.md :
                 theme.typography.fontSize.lg,
      }
    ];

    return textStyles;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Button; 