import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useThemeContext } from '../context/ThemeContext';

interface SettingsDropdownProps {
  anim: Animated.Value;
  selectedLanguage: string;
  selectedLocation: string;
  onLanguagePress: () => void;
}

const ThemeIcon = ({
  name,
  onPress,
  color,
  backgroundColor,
  shadowColor,
}: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  onPress?: () => void;
  color: string;
  backgroundColor: string;
  shadowColor: string;
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.themeIconWrapper,
          {
            backgroundColor,
            shadowColor,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <MaterialCommunityIcons name={name} size={22} color={color} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const SettingsDropdown: React.FC<SettingsDropdownProps> = React.memo(
  ({ anim, selectedLanguage, selectedLocation, onLanguagePress }) => {
    const dropdownStyle = {
      opacity: anim,
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [-15, 0],
          }),
        },
        {
          scale: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.95, 1],
          }),
        },
      ],
    };

    const { mode, setMode } = useThemeContext();

    // Define colors based on current mode
    const colors = {
      background: mode === 'dark' ? '#1f2937' : '#ffffff', // dark gray / white
      itemBackground: mode === 'dark' ? '#374151' : '#e6f0ff', // darker gray / light blue
      itemBackgroundPressed: mode === 'dark' ? '#4b5563' : '#c7dcff', // slightly lighter gray / lighter blue
      textPrimary: mode === 'dark' ? '#f3f4f6' : '#1e293b', // light gray / dark blue-gray
      textSecondary: mode === 'dark' ? '#d1d5db' : '#334155', // medium gray / dark slate
      iconColor: mode === 'dark' ? '#93c5fd' : '#3b82f6',  // lighter blue in dark mode, bright blue in light
      shadowColor: mode === 'dark' ? '#000000' : '#000000',
      themeIconBackground: mode === 'dark' ? '#2563eb' : '#dbeafe', // blue tones
      themeIconShadow: mode === 'dark' ? '#1e40af' : '#2563eb',
    };

    const renderDropdownItem = useCallback(
      (children: React.ReactNode, onPress?: () => void) => (
        <Pressable
          style={({ pressed }) => [
            {
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              paddingHorizontal: 10,
              backgroundColor: pressed ? colors.itemBackgroundPressed : colors.itemBackground,
              borderRadius: 14,
              marginVertical: 6,
              gap: 12,
            },
          ]}
          onPress={onPress}
        >
          {children}
        </Pressable>
      ),
      [colors]
    );

    return (
      <Animated.View
        style={[
          styles.settingsDropdown,
          { backgroundColor: colors.background, shadowColor: colors.shadowColor },
          dropdownStyle,
        ]}
      >
        {renderDropdownItem(
          <>
            <Text style={[styles.selectedItem, { color: colors.textPrimary }]}>
              {selectedLanguage} / {selectedLocation}
            </Text>
            <Feather name="chevron-right" size={18} color={colors.iconColor} />
            <View style={styles.iconWrapper}>
              <Entypo name="language" size={20} color={colors.iconColor} />
            </View>
          </>,
          onLanguagePress
        )}

        <View
          style={[
            styles.separator,
            { backgroundColor: mode === 'dark' ? '#4b5563' : '#cbd5e1' },
          ]}
        />

        <View style={styles.themeRow}>
          <Text style={[styles.dropdownText, { color: colors.textSecondary }]}>Theme</Text>
          <View style={styles.themeIcons}>
            <ThemeIcon
              name="moon-waning-crescent"
              onPress={() => setMode('dark')}
              color={colors.iconColor}
              backgroundColor={colors.themeIconBackground}
              shadowColor={colors.themeIconShadow}
            />
            <ThemeIcon
              name="weather-sunny"
              onPress={() => setMode('light')}
              color={colors.iconColor}
              backgroundColor={colors.themeIconBackground}
              shadowColor={colors.themeIconShadow}
            />
            <ThemeIcon
              name="theme-light-dark"
              onPress={() => setMode('system')}
              color={colors.iconColor}
              backgroundColor={colors.themeIconBackground}
              shadowColor={colors.themeIconShadow}
            />
          </View>
        </View>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  settingsDropdown: {
    position: 'absolute',
    top: 65,
    right: 30,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 22,
    zIndex: 9999,
    minWidth: 180,
  },
  iconWrapper: {
    marginLeft: 'auto',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    fontSize: 17,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    marginVertical: 10,
    borderRadius: 1,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 15,
    fontWeight: '600',
  },
  themeIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  themeIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
});

export default SettingsDropdown;