import React from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useThemeContext } from '../context/ThemeContext';

interface SearchBarProps {
  anim: Animated.Value;
  onSearchChange?: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(({ anim, onSearchChange, placeholder = 'Search...' }) => {
  const { theme } = useThemeContext();

  const dropdownStyle = {
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
  };

  return (
    <Animated.View style={[styles.searchContainer, { backgroundColor: theme.colors.card }, dropdownStyle]}>
      <View style={[styles.searchInputWrapper, { borderColor: theme.colors.border }]}>
        <Feather name="search" size={16} color={theme.colors.primary} style={styles.searchIcon} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text + '99'}
          style={[styles.searchInput, { color: theme.colors.text }]}
          autoFocus
          clearButtonMode="while-editing"
          onChangeText={onSearchChange}
        />
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
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
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 18,
    borderWidth: 1,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    fontSize: 16,
    flex: 1,
  },
});

export default SearchBar;
