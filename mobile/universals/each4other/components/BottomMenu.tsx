import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type BottomMenuItem = {
  id: string;
  label: string;
  iconName: string;
  IconComp: typeof Ionicons | typeof MaterialIcons;
};

type BottomMenuProps = {
  style?: ViewStyle | ViewStyle[];
  menuItems: BottomMenuItem[];
  initialActiveId?: string;
  onMenuPress?: (id: string) => void;
};

export default function BottomMenu({
  style,
  menuItems,
  initialActiveId = '',
  onMenuPress,
}: BottomMenuProps) {
  const [activeId, setActiveId] = useState<string>(initialActiveId);

  const handlePress = (id: string) => {
    setActiveId(id);
    if (onMenuPress) {
      onMenuPress(id);
    }
  };

  return (
    <View style={[styles.menuContainer, style]}>
      {menuItems.map(({ id, label, iconName, IconComp }) => (
        <TouchableOpacity
          key={id}
          style={[styles.menuItem, id === activeId && styles.activeItem]}
          onPress={() => handlePress(id)}
          activeOpacity={0.7}
        >
          <IconComp
            name={iconName as any}
            size={28}
            color={activeId === id ? '#007AFF' : '#333'}
            style={styles.icon}
          />
          <Text style={[styles.menuText, activeId === id && styles.activeText]}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: 'transparent',
    paddingBottom: 20,
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
  },
  activeItem: {
    // Optional styles for active item container
  },
  icon: {
    marginBottom: 4,
  },
  menuText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activeText: {
    color: '#007AFF',
  },
});
