import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import { Feather, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Logo from '../assets/logo/each4other-logo-light-mobile.svg';
import NotificationsDropdown from './NotificationsDropdown';
import LanguageSelector from './LanguageSelector';

import { RootStackParamList } from '../App';

const { width } = Dimensions.get('window');

type HeaderNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Header() {
  const navigation = useNavigation<HeaderNavigationProp>();

  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const toggleSettings = () => {
    setShowSettingsOptions(prev => {
      const newState = !prev;
      if (newState) {
        setShowSearchInput(false);
        setShowNotifications(false);
        setShowLanguageDropdown(false);
      }
      return newState;
    });
  };

  const handleLanguagePress = () => {
    setShowSettingsOptions(false);
    setShowLanguageDropdown(true);
    setShowSearchInput(false);
    setShowNotifications(false);
  };

  const closeLanguageDropdown = () => setShowLanguageDropdown(false);

  const toggleSearch = () => {
    setShowSearchInput(prev => {
      const newState = !prev;
      if (newState) {
        setShowSettingsOptions(false);
        setShowNotifications(false);
        setShowLanguageDropdown(false);
      }
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
      return newState;
    });
  };

  const onCloseNotifications = () => {
    setShowNotifications(false);
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

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Logo />

        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={toggleSearch}>
            <Feather name="search" size={22} color="black" />
          </TouchableOpacity>

          {isLoggedIn && (
            <TouchableOpacity onPress={toggleNotifications}>
              <FontAwesome5 name="bell" size={22} color="black" />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={toggleSettings}>
            <Feather name="settings" size={22} color="black" />
          </TouchableOpacity>

          {showSettingsOptions && (
            <View style={styles.settingsDropdown}>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleLanguagePress}>
                <Entypo name="language" size={20} color="black" />
                <Text style={styles.dropdownText}>Language</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={[styles.dropdownText, { marginRight: 8 }]}>Theme</Text>
                <Feather name="moon" size={20} color="black" />
                <Feather name="sun" size={20} color="black" />
                <MaterialCommunityIcons name="theme-light-dark" size={20} color="black"/>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity onPress={handleUserPress} style={styles.avatarContainer}>
            <FontAwesome5 name="user" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {showSearchInput && (
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search..." style={styles.searchInput} autoFocus />
        </View>
      )}

      {showNotifications && isLoggedIn && <NotificationsDropdown onClose={onCloseNotifications} />}

      {showLanguageDropdown && <LanguageSelector onClose={closeLanguageDropdown} onSelectLanguage={() => {}} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingsDropdown: {
    position: 'absolute',
    top: 50,
    right: 60,
    backgroundColor: 'white',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    alignItems: 'center',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  searchContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    height: 40,
    borderRadius: 6,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    fontSize: 16,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
