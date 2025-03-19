import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Typography from '../../components/atoms/Typography';

const MapScreen = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Typography variant="h2" style={styles.title}>
          Harita
        </Typography>
        
        <Typography variant="body1" style={styles.subtitle}>
          Bu ekran henüz geliştirme aşamasında. İlerleyen güncellemelerde rotalarınızı harita üzerinde görebileceksiniz.
        </Typography>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    flex: 1,
  },
  title: {
    marginBottom: 16,
  },
  subtitle: {
    marginBottom: 24,
  },
});

export default MapScreen; 