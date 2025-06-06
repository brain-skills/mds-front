import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type MenuProps = {
  style?: ViewStyle | ViewStyle[];
};

type MenuItem = {
  id: string;
  label: string;
  iconName: string;
  IconComp: typeof Ionicons | typeof MaterialIcons;
};

const menuItems: MenuItem[] = [
  { id: 'profile', label: 'Profile', iconName: 'person', IconComp: Ionicons },
  { id: 'settings', label: 'Settings', iconName: 'settings', IconComp: Ionicons },
  { id: 'home', label: 'Home', iconName: 'home', IconComp: Ionicons },
  { id: 'notifications', label: 'Alerts', iconName: 'notifications', IconComp: Ionicons },
  { id: 'menu', label: 'Menu', iconName: 'menu', IconComp: MaterialIcons }, // Burger icon at right
];

export default function Menu({ style }: MenuProps) {
  const [activeId, setActiveId] = useState<string>('home'); 
  const handleMenuPress = (id: string) => {
    setActiveId(id);
    console.log(`Pressed menu: ${id}`);
  };

  return (
    <View style={[styles.menuContainer, style]}>
      {menuItems.map(({ id, label, iconName, IconComp }) => (
        <TouchableOpacity
          key={id}
          style={[styles.menuItem, id === 'home' && styles.homeItem]}
          onPress={() => handleMenuPress(id)}
          activeOpacity={0.7}
        >
          <IconComp
            name={iconName as any}
            size={24}
            color={activeId === id ? '#007AFF' : '#333'}
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
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
  },
  homeItem: {
    flex: 1.2,
  },
  menuText: {
    marginTop: 4,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activeText: {
    color: '#007AFF',
  },
});
