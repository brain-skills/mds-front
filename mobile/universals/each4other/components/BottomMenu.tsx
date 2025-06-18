import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Updated type with onPress
type BottomMenuItem = {
  id: string;
  label: string;
  iconName: string;
  IconComp: typeof Ionicons | typeof MaterialIcons;
  onPress?: () => void; // ✅ Support individual press action
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

  const handlePress = (item: BottomMenuItem) => {
    setActiveId(item.id);

    // ✅ Priority: use individual item onPress if available
    if (item.onPress) {
      item.onPress();
    } else if (onMenuPress) {
      onMenuPress(item.id);
    }
  };

  return (
    <View style={[styles.menuContainer, style]}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.menuItem, item.id === activeId && styles.activeItem]}
          onPress={() => handlePress(item)}
          activeOpacity={0.7}
        >
          <item.IconComp
            name={item.iconName as any}
            size={28}
            color={item.id === activeId ? '#007AFF' : '#333'}
            style={styles.icon}
          />
          <Text style={[styles.menuText, item.id === activeId && styles.activeText]}>
            {item.label}
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
    // You can style the active item container if needed
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
