import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import OnboardingItem from '../../components/molecules/OnboardingItem';

const Onboarding = () => {
  const { theme } = useTheme();
  const { completeOnboarding } = useAuth();
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  
  // Dimensions API'sini kullanarak ekran genişliğini al
  const { width } = Dimensions.get('window');

  const onboardingData = [
    {
      id: '1',
      title: 'Anılarını Keşfet ve Kaydet',
      description: 'Gezdiğin şehirleri ve ülkeleri not al, anılarını fotoğraflarla sakla!',
      image: require('../../assets/images/onboarding1.png'),
    },
    {
      id: '2',
      title: 'Rotalarını Planla',
      description: 'Sonraki seyahatlerini planla, bütçeni oluştur ve seyahat öncesi hazırlan!',
      image: require('../../assets/images/onboarding2.png'),
    },
    {
      id: '3',
      title: 'Anılarını Paylaş',
      description: 'Seyahat anılarını, fotoğraflarını ve önerilerini arkadaşlarınla paylaş!',
      image: require('../../assets/images/onboarding3.png'),
    },
  ];

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = (index) => {
    if (slidesRef.current) {
      slidesRef.current.scrollToIndex({ index });
    }
  };

  const skip = () => {
    completeOnboarding();
    navigation.replace('Auth');
  };

  const next = () => {
    if (currentIndex < onboardingData.length - 1) {
      scrollTo(currentIndex + 1);
    } else {
      completeOnboarding();
      navigation.replace('Auth');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={skip}
      >
        <Typography style={{ color: theme.colors.primary }}>
          Atla
        </Typography>
      </TouchableOpacity>

      <FlatList 
        data={onboardingData}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } }
        ], { useNativeDriver: false })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        scrollEventThrottle={32}
      />

      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          
          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: [
              theme.colors.border,
              theme.colors.primary,
              theme.colors.border
            ],
            extrapolate: 'clamp',
          });
          
          return (
            <Animated.View 
              key={index} 
              style={[
                styles.dot, 
                { 
                  width: dotWidth, 
                  opacity, 
                  backgroundColor 
                }
              ]} 
            />
          );
        })}
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title={currentIndex === onboardingData.length - 1 ? "Başla" : "Devam Et"}
          onPress={next}
          style={{ width: 200 }}
        />
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
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  buttonContainer: {
    marginBottom: 50,
  },
});

export default Onboarding; 