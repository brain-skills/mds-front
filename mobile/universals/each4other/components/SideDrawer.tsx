import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SideDrawerProps = {
  visible: boolean;
  onClose: () => void;
};

const sections = [
  { title: 'Home Page' },
  { title: 'About Project' },
  {
    title: 'Opportunity',
    submodules: ['Donat', 'Power Prize', 'Hello World'],
  },
  { title: 'For Investors' },
  {
    title: 'About Us',
    submodules: ['Our Mission', 'Our Team', 'Contact Info'],
  },
];

const { width, height } = Dimensions.get('window');

const SideDrawer = ({ visible, onClose }: SideDrawerProps) => {
  const colorScheme = useColorScheme(); // auto-detect dark or light mode
  const darkMode = colorScheme === 'dark';

  const [openSections, setOpenSections] = useState<string[]>([]);
  const [isDisplayed, setIsDisplayed] = useState(visible);
  const slideAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    if (visible) {
      setIsDisplayed(true);
      slideAnim.setValue(-width);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsDisplayed(false);
        setOpenSections([]);
      });
    }
  }, [visible]);

  const toggleSection = (title: string, hasSubmodules: boolean) => {
    if (hasSubmodules) {
      setOpenSections(prev =>
        prev.includes(title)
          ? prev.filter(item => item !== title)
          : [...prev, title]
      );
    } else {
      console.log(`Navigate to: ${title}`);
      onClose();
    }
  };

  const handleSubmodulePress = (sub: string) => {
    console.log(`Navigate to submodule: ${sub}`);
    onClose();
  };

  if (!isDisplayed) return null;

  return (
    <Modal visible={true} transparent animationType="none">
      <View style={[styles.overlay, darkMode && styles.overlayDark]}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        <Animated.View
          style={[
            styles.drawer,
            { transform: [{ translateX: slideAnim }] },
            darkMode && styles.drawerDark,
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="arrow-back"
                size={28}
                color={darkMode ? '#ddd' : '#333'}
              />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {sections.map(({ title, submodules }) => {
              const isOpen = openSections.includes(title);
              return (
                <View key={title}>
                  <TouchableOpacity
                    style={[styles.sectionRow, darkMode && styles.sectionRowDark]}
                    onPress={() => toggleSection(title, !!submodules)}
                  >
                    <Text style={[styles.section, darkMode && styles.sectionDark]}>
                      {title}
                    </Text>
                    {submodules && (
                      <Ionicons
                        name={isOpen ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color={darkMode ? '#aaa' : '#555'}
                      />
                    )}
                  </TouchableOpacity>

                  {submodules && isOpen && (
                    <View style={styles.submodules}>
                      {submodules.map(sub => (
                        <TouchableOpacity
                          key={sub}
                          onPress={() => handleSubmodulePress(sub)}
                        >
                          <Text
                            style={[
                              styles.subItem,
                              darkMode && styles.subItemDark,
                            ]}
                          >
                            {sub}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  overlayDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: height,
    width: width,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  drawerDark: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    paddingBottom: 100,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionRowDark: {
    borderColor: '#333',
  },
  section: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  sectionDark: {
    color: '#eee',
  },
  submodules: {
    paddingLeft: 15,
    paddingTop: 5,
  },
  subItem: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#555',
  },
  subItemDark: {
    color: '#bbb',
  },
});

export default SideDrawer;
