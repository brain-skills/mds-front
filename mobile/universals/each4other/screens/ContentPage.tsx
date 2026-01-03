import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../App';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ContentPageRouteProp = RouteProp<RootStackParamList, 'ContentPage'>;
type ContentPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ContentPage'
>;

export default function ContentPage() {
  const route = useRoute<ContentPageRouteProp>();
  const navigation = useNavigation<ContentPageNavigationProp>();
  const { section } = route.params;

  // Animation refs
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bottomBounce = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 12,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(bottomBounce, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
        delay: 300,
      }),
    ]).start();
  }, []);

  const renderContent = () => {
    switch (section) {
      case 'gallery':
        return '📷 Welcome to the Gallery!';
      case 'about':
        return 'ℹ️ This is the About page.';
      case 'contact':
        return '📞 Contact us at: support@example.com';
      case 'help':
        return '❓ Need help? You’re in the right place.';
      default:
        return 'Unknown Section';
    }
  };

  const bottomMenuItems = [
    { id: 'home', label: 'Home', iconName: 'home', IconComp: Ionicons },
    { id: 'search', label: 'Search', iconName: 'search', IconComp: Ionicons },
    { id: 'add', label: 'Add', iconName: 'add-circle', IconComp: Ionicons },
    { id: 'notifications', label: 'Alerts', iconName: 'notifications', IconComp: Ionicons },
    { id: 'settings', label: 'Settings', iconName: 'settings', IconComp: Ionicons },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

      <Animated.View
        style={[
          styles.backContainer,
          { transform: [{ translateX: slideAnim }], opacity: fadeAnim },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('MainMenu')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={28} color="#007AFF" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.text}>{renderContent()}</Text>
      </Animated.View>

      <Animated.View style={{ transform: [{ translateY: bottomBounce }] }}>
        <BottomMenu
          style={styles.bottomMenu}
          menuItems={bottomMenuItems}
          initialActiveId="home"
          onMenuPress={(id) => {
            console.log('BottomMenu pressed:', id);
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Solid white background
  },
  backContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e6f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    lineHeight: 34,
  },
  bottomMenu: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 8,
  },
});
