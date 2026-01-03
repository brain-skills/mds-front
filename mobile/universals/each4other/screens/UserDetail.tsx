import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Adjust path as needed to import your central type

type Props = NativeStackScreenProps<RootStackParamList, 'UserDetail'>;

export default function UserDetail({ navigation, route }: Props) {
  const { fieldName } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={28} color="#6C63FF" />
        </TouchableOpacity>

        <Text style={styles.title}>{fieldName}</Text>

        {/* Empty View for spacing so title is centered */}
        <View style={{ width: 34 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>
          Это случайный текст под заголовком "{fieldName}". Здесь может быть описание или детали, связанные с этим полем.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2F5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3F3D56',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#5C5470',
  },
});
