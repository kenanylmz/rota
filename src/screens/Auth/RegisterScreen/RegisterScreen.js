import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import Typography from '../../../components/atoms/Typography';
import Input from '../../../components/atoms/Input';
import Button from '../../../components/atoms/Button';
import SocialLoginButton from '../../../components/molecules/SocialLoginButton';

const RegisterScreen = () => {
  const { theme } = useTheme();
  const { register } = useAuth();
  const navigation = useNavigation();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!fullName) {
      newErrors.fullName = 'Ad ve soyad gerekli';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'E-posta adresi gerekli';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Şifre gerekli';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalı';
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      setLoading(true);
      // Simülasyon: API çağrısı
      setTimeout(() => {
        register({
          email,
          id: 'user123',
          name: fullName,
        });
        setLoading(false);
      }, 1500);
    }
  };

  const handleGoogleRegister = () => {
    // Google ile kayıt için gerekli kod
    alert('Google ile kayıt henüz uygulanmadı');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Typography variant="h2" style={styles.title}>
            Hesap Oluştur
          </Typography>
          <Typography variant="body1" style={styles.subtitle}>
            Seyahat anılarını kaydetmek ve paylaşmak için
          </Typography>
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Ad ve Soyad"
            placeholder="Ad ve soyadınızı girin"
            value={fullName}
            onChangeText={setFullName}
            leftIcon="account-outline"
            errorText={errors.fullName}
          />

          <Input
            label="E-posta"
            placeholder="E-posta adresinizi girin"
            value={email}
            onChangeText={setEmail}
            leftIcon="email-outline"
            errorText={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Şifre"
            placeholder="Şifrenizi girin"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon="lock-outline"
            errorText={errors.password}
          />

          <Input
            label="Şifreyi Tekrarla"
            placeholder="Şifrenizi tekrar girin"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            leftIcon="lock-outline"
            errorText={errors.confirmPassword}
          />

          <Button
            title="Kayıt Ol"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />

          <View style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
            <Typography variant="body2" style={styles.dividerText}>
              veya
            </Typography>
            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
          </View>

          <SocialLoginButton
            type="google"
            title="Google ile Kayıt Ol"
            onPress={handleGoogleRegister}
          />
        </View>

        <View style={styles.footerContainer}>
          <Typography variant="body2">
            Zaten bir hesabınız var mı?{' '}
            <Typography
              variant="body2"
              style={{ color: theme.colors.primary }}
              onPress={navigateToLogin}
            >
              Giriş Yap
            </Typography>
          </Typography>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  headerContainer: {
    marginTop: 40,
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
  },
  registerButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    opacity: 0.7,
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
});

export default RegisterScreen; 