import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';

const Typography = ({
  variant = 'body1',
  children,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getTextStyle = () => {
    const textStyles = [{ color: theme.colors.text }];

    switch (variant) {
      case 'h1':
        textStyles.push({
          fontSize: theme.typography.fontSize.xxxl,
          fontWeight: 'bold',
          lineHeight: theme.typography.lineHeight.xxxl,
        });
        break;
      case 'h2':
        textStyles.push({
          fontSize: theme.typography.fontSize.xxl,
          fontWeight: 'bold',
          lineHeight: theme.typography.lineHeight.xxl,
        });
        break;
      case 'h3':
        textStyles.push({
          fontSize: theme.typography.fontSize.xl,
          fontWeight: 'bold',
          lineHeight: theme.typography.lineHeight.xl,
        });
        break;
      case 'subtitle1':
        textStyles.push({
          fontSize: theme.typography.fontSize.lg,
          fontWeight: '500',
          lineHeight: theme.typography.lineHeight.lg,
        });
        break;
      case 'subtitle2':
        textStyles.push({
          fontSize: theme.typography.fontSize.md,
          fontWeight: '500',
          lineHeight: theme.typography.lineHeight.md,
        });
        break;
      case 'body1':
        textStyles.push({
          fontSize: theme.typography.fontSize.md,
          lineHeight: theme.typography.lineHeight.md,
        });
        break;
      case 'body2':
        textStyles.push({
          fontSize: theme.typography.fontSize.sm,
          lineHeight: theme.typography.lineHeight.sm,
        });
        break;
      case 'caption':
        textStyles.push({
          fontSize: theme.typography.fontSize.xs,
          lineHeight: theme.typography.lineHeight.xs,
        });
        break;
      default:
        textStyles.push({
          fontSize: theme.typography.fontSize.md,
          lineHeight: theme.typography.lineHeight.md,
        });
        break;
    }

    return textStyles;
  };

  return (
    <Text style={[...getTextStyle(), style]} {...props}>
      {children}
    </Text>
  );
};

export default Typography; 