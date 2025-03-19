import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Başlangıçta loading yok
  const [hasOnboarded, setHasOnboarded] = useState(false);

  // Not: Gerçek uygulamada, bu fonksiyonlar Firebase ile entegre edilecek
  const login = async (userData) => {
    // Gerçek uygulamada, Firebase Authentication kullanılacak
    setUser(userData);
    setIsLoggedIn(true);
    // Not: Firebase'e giriş yapıldığı kaydedilecek
  };

  const register = async (userData) => {
    // Gerçek uygulamada, Firebase Authentication kullanılacak
    setUser(userData);
    setIsLoggedIn(true);
    // Not: Firebase'e kullanıcı kaydedilecek
  };

  const logout = async () => {
    // Gerçek uygulamada, Firebase Authentication ile çıkış yapılacak
    setUser(null);
    setIsLoggedIn(false);
  };

  const completeOnboarding = () => {
    setHasOnboarded(true);
    // Not: Firebase'e onboarding tamamlandığı kaydedilecek
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      user,
      isLoading,
      hasOnboarded,
      login,
      register,
      logout,
      completeOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 