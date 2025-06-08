import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // adjust path as needed

const { width } = Dimensions.get('window');

const notifications = [
  {
    id: '1',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    message: 'John liked your post.',
    date: 'June 3, 2025',
  },
  {
    id: '2',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    message: 'Anna commented on your photo.',
    date: 'June 2, 2025',
  },
  {
    id: '3',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    message: 'Your password was changed.',
    date: 'May 30, 2025',
  },
  {
    id: '4',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    message: 'New login from a device.',
    date: 'May 29, 2025',
  },
];

type Props = {
  onClose: () => void;
  darkMode?: boolean;
};

export default function NotificationsDropdown({ onClose, darkMode = false }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleViewAll = () => {
    onClose();
    navigation.navigate('AllNotifications');
  };

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, darkMode && styles.titleDark]}>Notifications</Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={[styles.viewAllText, darkMode && styles.viewAllTextDark]}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {notifications.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.notificationItem,
              index !== notifications.length - 1 && styles.notificationBorder,
            ]}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.notificationText}>
              <Text style={[styles.message, darkMode && styles.messageDark]}>{item.message}</Text>
              <Text style={[styles.date, darkMode && styles.dateDark]}>{item.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 110,
    left: '50%',
    transform: [{ translateX: -(width * 0.9) / 2 }],
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 10,
    zIndex: 1000,
  },
  containerDark: {
    backgroundColor: '#121212',
    shadowColor: '#000',
    shadowOpacity: 0.7,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  titleDark: {
    color: '#fff',
  },
  viewAllText: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '600',
  },
  viewAllTextDark: {
    color: '#3399FF',
  },
  list: {
    maxHeight: 180,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  notificationBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 6,
    marginRight: 10,
  },
  notificationText: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
  messageDark: {
    color: '#ddd',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  dateDark: {
    color: '#aaa',
  },
});
