import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Language = {
  code: string;
  name: string;
  flag: string;
};

type LanguageSelectorProps = {
  onClose: () => void;
  onSelectLanguage: (language: Language) => void;
};

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'he', name: 'Hebrew', flag: '🇮🇱' },
  { code: 'el', name: 'Greek', flag: '🇬🇷' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
  { code: 'hu', name: 'Hungarian', flag: '🇭🇺' },
  { code: 'cs', name: 'Czech', flag: '🇨🇿' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
  { code: 'da', name: 'Danish', flag: '🇩🇰' },
  { code: 'uk', name: 'Ukrainian', flag: '🇺🇦' },
  { code: 'bg', name: 'Bulgarian', flag: '🇧🇬' },
  { code: 'ms', name: 'Malay', flag: '🇲🇾' },
  { code: 'sr', name: 'Serbian', flag: '🇷🇸' },
  { code: 'hr', name: 'Croatian', flag: '🇭🇷' },
  { code: 'lt', name: 'Lithuanian', flag: '🇱🇹' },
  { code: 'sk', name: 'Slovak', flag: '🇸🇰' },
  { code: 'sl', name: 'Slovenian', flag: '🇸🇮' },
];

export default function LanguageSelector({
  onClose,
  onSelectLanguage,
}: LanguageSelectorProps) {
  const [searchText, setSearchText] = useState('');

  const filteredLanguages = useMemo(() => {
    const lowerSearch = searchText.toLowerCase();
    return LANGUAGES.filter(lang =>
      lang.name.toLowerCase().includes(lowerSearch)
    );
  }, [searchText]);

  const handleSelectLanguage = useCallback(
    (language: Language) => {
      onSelectLanguage(language);
    },
    [onSelectLanguage]
  );

  return (
    <View style={styles.fullScreenDropdown}>
      <View style={styles.dropdownHeader}>
        <TouchableOpacity onPress={onClose} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.languageTitle}>Language</Text>
      </View>

      <TextInput
        placeholder="Search language..."
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={{ flex: 1, marginTop: 10 }}>
        <FlatList
          data={filteredLanguages}
          keyExtractor={item => item.code}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.languageItem}
              onPress={() => handleSelectLanguage(item)}
            >
              <Text style={styles.flag}>{item.flag}</Text>
              <Text style={styles.languageName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenDropdown: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  dropdownHeader: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  languageTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backIcon: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    fontSize: 18,
    color: '#000',
  },
});
