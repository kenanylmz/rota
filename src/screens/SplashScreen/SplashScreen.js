import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Typography from '../../components/atoms/Typography';

const SplashScreen = () => {
  const { theme } = useTheme();
  const { isLoggedIn, hasOnboarded } = useAuth();
  const navigation = useNavigation();
  
  // Animation values
  const logoOpacity = new Animated.Value(0);
  const logoScale = new Animated.Value(0.3);
  const textOpacity = new Animated.Value(0);

  useEffect(() => {
    // Start animations
    Animated.sequence([
      // Fade in logo
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Scale logo
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      // Fade in text
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after a delay
    const timer = setTimeout(() => {
      if (!hasOnboarded) {
        navigation.replace('Onboarding');
      } else if (isLoggedIn) {
        navigation.replace('MainApp');
      } else {
        navigation.replace('Auth');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, isLoggedIn, hasOnboarded]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View style={{ opacity: logoOpacity, transform: [{ scale: logoScale }] }}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </Animated.View>
      
      <Animated.View style={{ opacity: textOpacity }}>
        <Typography variant="h1" style={styles.title}>Rota</Typography>
        <Typography variant="subtitle2" style={styles.subtitle}>Seyahatlerini Keşfet</Typography>
      </Animated.View>
      
      <View style={styles.footer}>
        <Typography variant="caption" style={styles.footerText}>
          Rota Team © 2023
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
  },
  footerText: {
    opacity: 0.6,
  },
});

export default SplashScreen; 