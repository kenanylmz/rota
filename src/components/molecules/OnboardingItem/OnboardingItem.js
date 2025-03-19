import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Typography from '../../atoms/Typography';
import { useTheme } from '../../../contexts/ThemeContext';

const OnboardingItem = ({ item }) => {
  const { width } = Dimensions.get('window');
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { width }]}>
      <Image 
        source={item.image} 
        style={[styles.image, { width: width * 0.8, resizeMode: 'contain' }]} 
      />
      <View style={{ width: width * 0.8 }}>
        <Typography variant="h2" style={styles.title}>
          {item.title}
        </Typography>
        <Typography variant="body1" style={styles.description}>
          {item.description}
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
    padding: 20,
  },
  image: {
    height: 300,
    marginBottom: 30,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default OnboardingItem; 