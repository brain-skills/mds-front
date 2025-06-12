// screens/ContentPage.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../App';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header'; // Your Header component
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

  const renderContent = () => {
    switch (section) {
      case 'gallery':
        return <Text style={styles.text}>📷 Welcome to the Gallery!</Text>;
      case 'about':
        return <Text style={styles.text}>ℹ️ This is the About page.</Text>;
      case 'contact':
        return (
          <Text style={styles.text}>📞 Contact us at: support@example.com</Text>
        );
      case 'help':
        return <Text style={styles.text}>❓ Need help? You’re in the right place.</Text>;
      default:
        return <Text style={styles.text}>Unknown Section</Text>;
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

      <View style={styles.backContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('MainMenu')}
          accessibilityLabel="Go back to Main Menu"
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={28} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>{renderContent()}</View>

      <BottomMenu
        style={styles.bottomMenu}
        menuItems={bottomMenuItems}
        initialActiveId="home"
        onMenuPress={(id) => {
          console.log('BottomMenu pressed:', id);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fefefe',
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
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    lineHeight: 30,
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
