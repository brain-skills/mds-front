import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import SideDrawer from './SideDrawer'; 

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
  { id: 'profile', label: 'Profile', iconName: 'person-outline', IconComp: Ionicons },
  { id: 'settings', label: 'Services', iconName: 'construct-outline', IconComp: Ionicons }, 
  { id: 'home', label: 'Home', iconName: 'home-outline', IconComp: Ionicons },
  { id: 'notifications', label: 'Alerts', iconName: 'notifications-outline', IconComp: Ionicons },
  { id: 'menu', label: 'Menu', iconName: 'menu', IconComp: MaterialIcons },
];

export default function Menu({ style }: MenuProps) {
  const [activeId, setActiveId] = useState<string>('home'); 
  const [drawerVisible, setDrawerVisible] = useState(false); 

  const handleMenuPress = (id: string) => {
    if (id === 'menu') {
      setDrawerVisible(true);
    } else {
      setActiveId(id);
      console.log(`Pressed menu: ${id}`);
    }
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  return (
    <>
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

      <SideDrawer visible={drawerVisible} onClose={handleDrawerClose} />
    </>
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
