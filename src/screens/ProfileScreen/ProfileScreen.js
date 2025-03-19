import React from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';

const ProfileScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.profileHeader}>
          <Image
            source={require('../../assets/images/avatar.png')}
            style={styles.avatar}
          />
          <Typography variant="h2" style={styles.name}>
            {user?.name || 'Gezgin'}
          </Typography>
          <Typography variant="body1" style={styles.email}>
            {user?.email || 'kullanici@ornek.com'}
          </Typography>
        </View>
        
        <View style={styles.settingsList}>
          <Button
            title={`${theme.isDark ? 'Açık' : 'Koyu'} Tema'ya Geç`}
            onPress={toggleTheme}
            type="outline"
            style={styles.settingButton}
          />
          
          <Button
            title="Çıkış Yap"
            onPress={logout}
            style={[styles.settingButton, styles.logoutButton]}
          />
        </View>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 48,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    marginBottom: 8,
  },
  email: {
    opacity: 0.7,
  },
  settingsList: {
    marginTop: 24,
  },
  settingButton: {
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 24,
  },
});

export default ProfileScreen; 