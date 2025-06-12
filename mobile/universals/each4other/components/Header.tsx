import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import { Feather, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Logo from '../assets/logo/each4other-logo-light-mobile.svg';
import NotificationsDropdown from './NotificationsDropdown';
import LanguageSelector from './LanguageSelector';

import { RootStackParamList } from '../App';

type HeaderNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainMenu'>;

export default function Header() {
  const navigation = useNavigation<HeaderNavigationProp>();

  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const settingsAnim = useRef(new Animated.Value(0)).current;
  const languageAnim = useRef(new Animated.Value(0)).current;
  const searchAnim = useRef(new Animated.Value(0)).current;
  const notificationsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(status === 'true');
      } catch (err) {
        console.error('Failed to fetch login status:', err);
      }
    };

    checkLoginStatus();
  }, []);

  const animateDropdown = (anim: Animated.Value, toValue: number) => {
    Animated.timing(anim, {
      toValue,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const toggleSettings = () => {
    setShowSettingsOptions(prev => {
      const newState = !prev;
      if (newState) {
        setShowSearchInput(false);
        setShowNotifications(false);
        setShowLanguageDropdown(false);
      }
      animateDropdown(settingsAnim, newState ? 1 : 0);
      animateDropdown(searchAnim, 0);
      animateDropdown(notificationsAnim, 0);
      animateDropdown(languageAnim, 0);
      return newState;
    });
  };

  const handleLanguagePress = () => {
    setShowSettingsOptions(false);
    setShowLanguageDropdown(true);
    setShowSearchInput(false);
    setShowNotifications(false);

    animateDropdown(settingsAnim, 0);
    animateDropdown(searchAnim, 0);
    animateDropdown(notificationsAnim, 0);
    animateDropdown(languageAnim, 1);
  };

  const closeLanguageDropdown = () => {
    setShowLanguageDropdown(false);
    animateDropdown(languageAnim, 0);
  };

  const toggleSearch = () => {
    setShowSearchInput(prev => {
      const newState = !prev;
      if (newState) {
        setShowSettingsOptions(false);
        setShowNotifications(false);
        setShowLanguageDropdown(false);
      }
      animateDropdown(searchAnim, newState ? 1 : 0);
      animateDropdown(settingsAnim, 0);
      animateDropdown(notificationsAnim, 0);
      animateDropdown(languageAnim, 0);
      return newState;
    });
  };

  const toggleNotifications = () => {
    setShowNotifications(prev => {
      const newState = !prev;
      if (newState) {
        setShowSettingsOptions(false);
        setShowSearchInput(false);
        setShowLanguageDropdown(false);
      }
      animateDropdown(notificationsAnim, newState ? 1 : 0);
      animateDropdown(settingsAnim, 0);
      animateDropdown(searchAnim, 0);
      animateDropdown(languageAnim, 0);
      return newState;
    });
  };

  const onCloseNotifications = () => {
    setShowNotifications(false);
    animateDropdown(notificationsAnim, 0);
  };

  const handleUserPress = async () => {
    try {
      const status = await AsyncStorage.getItem('isLoggedIn');
      if (status === 'true') {
        navigation.navigate('Profile');
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      navigation.navigate('Login');
    }
  };

  const dropdownSlideStyle = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0],
        }),
      },
      {
        scale: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.97, 1],
        }),
      },
    ],
  });

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Logo />
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={toggleSearch}>
            <Feather name="search" size={20} color="black" />
          </TouchableOpacity>
          {isLoggedIn && (
            <TouchableOpacity onPress={toggleNotifications}>
              <FontAwesome5 name="bell" size={20} color="black" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={toggleSettings}>
            <Feather name="settings" size={20} color="black" />
          </TouchableOpacity>

          {showSettingsOptions && (
            <Animated.View style={[styles.settingsDropdown, dropdownSlideStyle(settingsAnim)]}>
              <TouchableOpacity style={styles.dropdownItemBeautiful} onPress={handleLanguagePress}>
                <Text style={styles.dropdownTextBeautiful}>Language</Text>
                <Feather name="chevron-right" size={16} color="#4A90E2" />
                <View style={styles.iconWrapper}>
                  <Entypo name="language" size={18} color="#4A90E2" />
                </View>
              </TouchableOpacity>

              <View style={styles.separator} />

              <View style={[styles.dropdownItemBeautiful, { justifyContent: 'space-between' }]}>
                <Text style={styles.dropdownTextBeautiful}>Theme</Text>
                <View style={styles.themeIcons}>
                  <Feather name="moon" size={18} color="#4A90E2" />
                  <Feather name="sun" size={18} color="#4A90E2" />
                  <MaterialCommunityIcons name="theme-light-dark" size={18} color="#4A90E2" />
                </View>
              </View>
            </Animated.View>
          )}

          <TouchableOpacity onPress={handleUserPress} style={styles.avatarContainer}>
            <FontAwesome5 name="user" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {showSearchInput && (
        <Animated.View style={[styles.searchContainer, dropdownSlideStyle(searchAnim)]}>
          <View style={styles.searchInputWrapper}>
            <Feather name="search" size={16} color="#4a90e2" style={styles.searchIcon} />
            <TextInput
              placeholder="Search..."
              placeholderTextColor="#a0b0d9"
              style={styles.searchInput}
              autoFocus
              clearButtonMode="while-editing"
            />
          </View>
        </Animated.View>
      )}

      {showNotifications && isLoggedIn && (
        <Animated.View style={dropdownSlideStyle(notificationsAnim)}>
          <NotificationsDropdown onClose={onCloseNotifications} />
        </Animated.View>
      )}

      {showLanguageDropdown && (
        <Animated.View style={dropdownSlideStyle(languageAnim)}>
          <LanguageSelector onClose={closeLanguageDropdown} onSelectLanguage={() => {}} />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  settingsDropdown: {
    position: 'absolute',
    top: 45,
    right: 50,
    backgroundColor: 'white',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 20,
    zIndex: 9999,
    minWidth: 160,
  },
  dropdownItemBeautiful: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: '#f2f8ff',
    borderRadius: 12,
    marginVertical: 4,
    gap: 10,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D6E9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownTextBeautiful: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#D1D8E0',
    marginVertical: 8,
    borderRadius: 1,
  },
  themeIcons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#ffffff',
    shadowColor: '#4a90e2',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 6,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#4a90e2',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600',
    height: 28,
  },
  avatarContainer: {
    width: 34,
    height: 34,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
