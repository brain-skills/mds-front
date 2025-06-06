import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import { Feather, FontAwesome5, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

  const handleThemePress = () => setShowSettingsOptions(false);

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

  // Navigate to Login screen when user icon pressed
  const handleUserPress = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Logo />

        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={toggleSearch}>
            <Feather name="search" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleNotifications}>
            <FontAwesome5 name="bell" size={18} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleSettings}>
            <Feather name="settings" size={20} color="black" />
          </TouchableOpacity>

          {showSettingsOptions && (
            <View style={styles.settingsDropdown}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleThemePress}
              >
                <Feather name="moon" size={20} color="black" />
                <Feather name="sun" size={20} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleLanguagePress}
              >
                <Entypo name="language" size={20} color="black" />
                <Text style={styles.dropdownText}>Language</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity onPress={handleUserPress}>
            <FontAwesome5 name="user-circle" size={36} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {showSearchInput && (
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            autoFocus
          />
        </View>
      )}

      {showNotifications && <NotificationsDropdown onClose={onCloseNotifications} />}
      {showLanguageDropdown && (
        <LanguageSelector
          onClose={closeLanguageDropdown}
          onSelectLanguage={() => {}}
        />
      )}
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
});
