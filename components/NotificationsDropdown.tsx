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
};

export default function NotificationsDropdown({ onClose }: Props) {
  if (notifications.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No new notifications.</Text>
        </View>
      </View>
    );
  }

  const handleDeleteAll = () => {
    console.log('Delete All clicked');
    // Add logic here to clear notifications
  };

  const handleViewAll = () => {
    console.log('View All clicked');
    // Add logic here to navigate to all notifications
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
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

      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={handleDeleteAll} style={styles.button}>
          <Text style={styles.buttonText}>Delete All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleViewAll} style={styles.button}>
          <Text style={styles.buttonText}>View All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 70,
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  list: {
    maxHeight: 180,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
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
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
