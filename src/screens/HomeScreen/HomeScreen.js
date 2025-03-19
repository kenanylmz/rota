import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Typography variant="h2" style={styles.title}>
          Hoş Geldin, {user?.name || 'Gezgin'}!
        </Typography>
        
        <Typography variant="body1" style={styles.subtitle}>
          Bu ekran henüz geliştirme aşamasında. İlerleyen güncellemelerde seyahat anılarınızı burada görebileceksiniz.
        </Typography>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Çıkış Yap"
            onPress={logout}
            type="outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
  },
  title: {
    marginBottom: 16,
  },
  subtitle: {
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
});

export default HomeScreen; 