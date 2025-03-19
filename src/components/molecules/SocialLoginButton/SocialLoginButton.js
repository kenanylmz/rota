import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';

const SocialLoginButton = ({
  type,
  title,
  onPress,
  style,
}) => {
  const { theme } = useTheme();
  
  const getIcon = () => {
    switch (type) {
      case 'google':
        return require('../../../assets/images/google.png');
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Image source={getIcon()} style={styles.icon} />
        <Text style={[styles.text, { color: theme.colors.text }]}>
          {title || `Continue with ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SocialLoginButton; 