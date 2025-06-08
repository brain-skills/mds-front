import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
  UserDetail: { fieldName: string };
};

export default function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred during logout.');
      console.error('Logout error:', error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    Alert.alert('Edit Profile', 'Edit profile pressed');
  };

  const additionalFields = [
    'Информация о пользователе',
    'Мои Доходы',
    'Мои Задачи',
    'Рефералы',
    'Мессенджер',
    'Редактирование',
  ];

  const renderField = (label: string, index: number) => (
    <TouchableOpacity
      style={[
        styles.fieldRow,
        index === additionalFields.length - 1 && styles.lastFieldRow,
      ]}
      key={label}
      onPress={() => navigation.navigate('UserDetail', { fieldName: label })}
    >
      <Text style={styles.fieldText}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#6C63FF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContent}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
              <Ionicons name="arrow-back" size={28} color="#6C63FF" />
            </TouchableOpacity>

            <Text style={styles.topBarTitle}>My Profile</Text>

            <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
              <Ionicons name="pencil" size={26} color="#6C63FF" />
            </TouchableOpacity>
          </View>

          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle-outline" size={120} color="#6C63FF" />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}><Text style={styles.infoLabel}>Name: </Text>Admin</Text>
            <Text style={styles.infoText}><Text style={styles.infoLabel}>Email: </Text>admin@gmail.com</Text>
            <Text style={styles.infoText}><Text style={styles.infoLabel}>Age: </Text>24</Text>
            <Text style={styles.infoText}><Text style={styles.infoLabel}>Phone: </Text>+374 77-59-55-09</Text>
            <Text style={styles.infoText}><Text style={styles.infoLabel}>City: </Text>Washington</Text>
            <Text style={styles.infoText}><Text style={styles.infoLabel}>Gender: </Text>Мужчина</Text>
            <Text style={styles.infoText}><Text style={styles.infoLabel}>Balance: </Text>0 USD</Text>
            <Text style={styles.infoText}><Text style={styles.infoLabel}>Followers: </Text>0</Text>
            <Text style={styles.infoText}><Text style={styles.infoLabel}>Likes: </Text>100</Text>
            <Text style={styles.infoText}><Text style={styles.infoLabel}>Subscription: </Text>No subscription</Text>
          </View>

          <View style={styles.fieldsContainer}>
            {additionalFields.map((field, index) => renderField(field, index))}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2F5',
  },

  scrollContainer: {
    paddingBottom: 40,
    paddingHorizontal: 24,
  },

  innerContent: {},

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingVertical: 10,
  },

  iconButton: {
    padding: 6,
    borderRadius: 8,
  },

  topBarTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3F3D56',
  },

  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },

  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 32,
  },

  infoText: {
    fontSize: 16,
    color: '#5C5470',
    marginBottom: 10,
  },

  infoLabel: {
    fontWeight: '700',
    color: '#6C63FF',
  },

  fieldsContainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 10,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },

  lastFieldRow: {
    borderBottomWidth: 0,
  },

  fieldText: {
    fontSize: 16,
    color: '#5C5470',
  },

  logoutButton: {
    backgroundColor: '#FF6584',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },

  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
