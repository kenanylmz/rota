import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import Typography from '../../../components/atoms/Typography';
import Input from '../../../components/atoms/Input';
import Button from '../../../components/atoms/Button';
import SocialLoginButton from '../../../components/molecules/SocialLoginButton';

const LoginScreen = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const navigation = useNavigation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

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

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      setLoading(true);
      // Simülasyon: API çağrısı
      setTimeout(() => {
        login({
          email,
          id: 'user123',
          name: 'Demo Kullanıcı',
        });
        setLoading(false);
      }, 1500);
    }
  };

  const handleGoogleLogin = () => {
    // Google ile giriş için gerekli kod
    alert('Google ile giriş henüz uygulanmadı');
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const navigateToForgotPassword = () => {
    // Şifremi unuttum sayfasına yönlendirme
    alert('Şifremi unuttum sayfası henüz uygulanmadı');
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
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../../assets/images/logo.png')} 
            style={styles.logo} 
          />
          <Typography variant="h2" style={styles.title}>
            Rota
          </Typography>
          <Typography variant="body1" style={styles.subtitle}>
            Seyahat anılarını keşfet ve paylaş
          </Typography>
        </View>

        <View style={styles.formContainer}>
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

          <TouchableOpacity 
            onPress={navigateToForgotPassword}
            style={styles.forgotPasswordContainer}
          >
            <Typography 
              variant="body2" 
              style={{ color: theme.colors.primary }}
            >
              Şifremi unuttum
            </Typography>
          </TouchableOpacity>

          <Button
            title="Giriş Yap"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
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
            title="Google ile Giriş Yap"
            onPress={handleGoogleLogin}
          />
        </View>

        <View style={styles.footerContainer}>
          <Typography variant="body2">
            Hesabınız yok mu?{' '}
            <Typography
              variant="body2"
              style={{ color: theme.colors.primary }}
              onPress={navigateToRegister}
            >
              Kayıt Ol
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
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  loginButton: {
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
  },
});

export default LoginScreen; 