import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Logo from '../assets/logo/each4other-logo-light-mobile.svg';
import LanguageSelector from './LanguageSelector';
import NotificationsDropdown from './NotificationsDropdown';

const { width } = Dimensions.get('window');

export default function Header() {
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Open Settings and close others
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

  // Open Language dropdown and close others
  const handleLanguagePress = () => {
    setShowSettingsOptions(false);
    setShowLanguageDropdown(true);
    setShowSearchInput(false);
    setShowNotifications(false);
  };

  const closeLanguageDropdown = () => setShowLanguageDropdown(false);

  // Open Search and close others
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

  // Open Notifications and close others
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

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Logo />

        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={toggleSearch}>
            <Ionicons name="search" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleNotifications}>
            <Ionicons name="notifications" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleSettings}>
            <Ionicons name="settings" size={20} color="black" />
          </TouchableOpacity>

          {showSettingsOptions && (
            <View style={styles.settingsDropdown}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleThemePress}
              >
                <Ionicons name="moon" size={20} color="black" />
                <Text style={styles.dropdownText}>Theme</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleLanguagePress}
              >
                <MaterialIcons name="language" size={20} color="black" />
                <Text style={styles.dropdownText}>Language</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity>
            <Ionicons name="person-circle" size={40} color="black" />
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

      {showNotifications && (
        <NotificationsDropdown onClose={onCloseNotifications} />
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
    zIndex: 999,
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
