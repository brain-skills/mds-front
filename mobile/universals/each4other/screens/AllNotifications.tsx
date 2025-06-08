import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

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

export default function AllNotificationsScreen() {
  const navigation = useNavigation();

  const handleDeleteAll = () => {
    console.log('Delete All clicked');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.iconWrapper}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>All Notifications</Text>

        {/* Empty View to keep spacing even */}
        <View style={styles.iconWrapper} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notifications.map(item => (
          <View key={item.id} style={styles.notificationItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.notificationText}>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAll}>
        <Text style={styles.deleteButtonText}>Delete All</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconWrapper: {
    width: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
