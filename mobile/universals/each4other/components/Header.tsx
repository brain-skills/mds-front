import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SafeAreaView, View, StyleSheet, Animated, Easing, Pressable } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Logo from '../assets/logo/each4other-logo-light-mobile.svg';
import NotificationsDropdown from './NotificationsDropdown';
import SettingsDropdown from './SettingsDropdown';
import SearchBar from './SearchBar';
import LanguageLocationSelector from './LanguageLocationSelector';
import { RootStackParamList } from '../App';
import { useThemeContext } from '../context/ThemeContext';

type HeaderNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainMenu'>;

export default function Header() {
  const navigation = useNavigation<HeaderNavigationProp>();
  const { theme } = useThemeContext();

  const [activeDropdown, setActiveDropdown] = useState<null | 'settings' | 'language' | 'search' | 'notifications'>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedLocation, setSelectedLocation] = useState('United States');

  const dropdownAnim = useRef(new Animated.Value(0)).current;

  const checkLoginStatus = useCallback(async () => {
    try {
      const status = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(status === 'true');
    } catch (err) {
      console.error('Failed to fetch login status:', err);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  useEffect(() => {
    Animated.timing(dropdownAnim, {
      toValue: activeDropdown ? 1 : 0,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [activeDropdown]);

  const toggleDropdown = (type: typeof activeDropdown) => {
    setActiveDropdown(prev => (prev === type ? null : type));
  };

  const handleLanguageSelect = (language: string, location: string) => {
    setSelectedLanguage(language);
    setSelectedLocation(location);
    setActiveDropdown(null);
  };

  const handleUserPress = async () => {
    try {
      const status = await AsyncStorage.getItem('isLoggedIn');
      navigation.navigate(status === 'true' ? 'Profile' : 'Login');
    } catch {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
      <View style={[styles.header, { backgroundColor: theme.colors.background, borderBottomColor: theme.colors.border }]}>
        <Logo />
        <View style={styles.iconsContainer}>
          <Pressable onPress={() => toggleDropdown('search')}>
            <Feather name="search" size={20} color={theme.colors.text} />
          </Pressable>
          {isLoggedIn && (
            <Pressable onPress={() => toggleDropdown('notifications')}>
              <FontAwesome5 name="bell" size={20} color={theme.colors.text} />
            </Pressable>
          )}
          <Pressable onPress={() => toggleDropdown('settings')}>
            <Feather name="settings" size={20} color={theme.colors.text} />
          </Pressable>
          <Pressable onPress={handleUserPress} style={[styles.avatarContainer, { backgroundColor: theme.dark ? '#333' : '#f3f3f3' }]}>
            <FontAwesome5 name="user" size={26} color={theme.colors.text} />
          </Pressable>
        </View>
      </View>

      {activeDropdown === 'settings' && (
        <SettingsDropdown
          anim={dropdownAnim}
          selectedLanguage={selectedLanguage}
          selectedLocation={selectedLocation}
          onLanguagePress={() => toggleDropdown('language')}
        />
      )}

      {activeDropdown === 'search' && <SearchBar anim={dropdownAnim} />}

      {activeDropdown === 'notifications' && isLoggedIn && (
        <Animated.View
          style={{
            opacity: dropdownAnim,
            transform: [
              {
                translateY: dropdownAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 0],
                }),
              },
              {
                scale: dropdownAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.97, 1],
                }),
              },
            ],
          }}
        >
          <NotificationsDropdown onClose={() => setActiveDropdown(null)} />
        </Animated.View>
      )}

      {activeDropdown === 'language' && (
        <LanguageLocationSelector
          onClose={() => setActiveDropdown(null)}
          onSelect={handleLanguageSelect}
          defaultLanguage={selectedLanguage}
          defaultLocation={selectedLocation}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarContainer: {
    padding: 6,
    borderRadius: 50,
  },
});
