import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface LanguageSelectorProps {
  onClose: () => void;
}

const languages = [
  { name: 'English', flag: '🇺🇸' },
  { name: 'Spanish', flag: '🇪🇸' },
  { name: 'French', flag: '🇫🇷' },
  { name: 'German', flag: '🇩🇪' },
  { name: 'Chinese', flag: '🇨🇳' },
  { name: 'Japanese', flag: '🇯🇵' },
  { name: 'Korean', flag: '🇰🇷' },
  { name: 'Italian', flag: '🇮🇹' },
  { name: 'Portuguese', flag: '🇵🇹' },
  { name: 'Russian', flag: '🇷🇺' },
  { name: 'Arabic', flag: '🇸🇦' },
  { name: 'Hindi', flag: '🇮🇳' },
  { name: 'Turkish', flag: '🇹🇷' },
  { name: 'Dutch', flag: '🇳🇱' },
  { name: 'Swedish', flag: '🇸🇪' },
  { name: 'Polish', flag: '🇵🇱' },
  { name: 'Vietnamese', flag: '🇻🇳' },
  { name: 'Indonesian', flag: '🇮🇩' },
  { name: 'Hebrew', flag: '🇮🇱' },
  { name: 'Ukrainian', flag: '🇺🇦' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const { width, height } = useWindowDimensions();

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { width, height }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.title}>Select Language</Text>
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#4A90E2" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search languages..."
          placeholderTextColor="#a0b0d9"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          clearButtonMode="while-editing"
        />
      </View>

      <FlatList
        data={filteredLanguages}
        keyExtractor={item => item.name}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.languageItem}
            onPress={() => {
              console.log('Selected language:', item.name);
              onClose();
            }}
          >
            <Text style={styles.languageText}>
              {item.flag}  {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A90E2',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
  },
  listContainer: {
    paddingBottom: 20,
  },
  languageItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
});

export default LanguageSelector;
