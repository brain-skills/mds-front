import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

interface Props {
  onClose: () => void;
  onSelect: (language: string, location: string) => void;
  defaultLanguage?: string;
  defaultLocation?: string;
}

const languages = [
  { name: 'English', flag: '🇺🇸' },
  { name: 'Spanish', flag: '🇪🇸' },
  { name: 'French', flag: '🇫🇷' },
  { name: 'German', flag: '🇩🇪' },
  { name: 'Chinese', flag: '🇨🇳' },
  { name: 'Arabic', flag: '🇸🇦' },
  { name: 'Hindi', flag: '🇮🇳' },
  { name: 'Turkish', flag: '🇹🇷' },
  { name: 'Russian', flag: '🇷🇺' },
  { name: 'Japanese', flag: '🇯🇵' },
  { name: 'Korean', flag: '🇰🇷' },
  { name: 'Italian', flag: '🇮🇹' },
  { name: 'Portuguese', flag: '🇵🇹' },
];

const countries = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Russia', flag: '🇷🇺' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'South Korea', flag: '🇰🇷' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Australia', flag: '🇦🇺' },
];

const LanguageLocationSelector: React.FC<Props> = ({
  onClose,
  onSelect,
  defaultLanguage = 'English',
  defaultLocation = 'United States',
}) => {
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [languageSearch, setLanguageSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);

  const { width, height } = useWindowDimensions();

  // Animations for modal entry/exit
  const modalTranslateY = useSharedValue(height);
  const modalOpacity = useSharedValue(0);

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: modalTranslateY.value }],
    opacity: modalOpacity.value,
  }));

  // Fix here: use runOnJS to safely update React state inside animation callbacks
  const closeModals = (callback: () => void) => {
    modalTranslateY.value = withTiming(height, { duration: 300 }, () => {
      modalOpacity.value = withTiming(0, { duration: 200 }, () => {
        runOnJS(callback)();
      });
    });
  };

  const openModal = () => {
    modalTranslateY.value = withTiming(0, { duration: 300 });
    modalOpacity.value = withTiming(1, { duration: 200 });
  };

  const renderModal = (
    title: string,
    data: { name: string; flag: string }[],
    searchValue: string,
    setSearch: (val: string) => void,
    onSelectItem: (val: string) => void,
    visible: boolean,
    onCloseModal: () => void
  ) => (
    <Modal
      transparent
      animationType="none" // Controlled by reanimated
      visible={visible}
      onRequestClose={() => closeModals(onCloseModal)}
    >
      <Animated.View style={[styles.modalOverlay, modalAnimatedStyle]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <SafeAreaView style={styles.fullscreenModal}>
            <TouchableOpacity
              style={styles.modalHandle}
              onPress={() => closeModals(onCloseModal)}
              accessible={true}
              accessibilityLabel="Close modal"
            />
            <Text style={styles.modalTitle}>{title}</Text>

            <View style={styles.searchBox}>
              <Feather name="search" size={20} color="#8e8e93" />
              <TextInput
                placeholder="Search..."
                placeholderTextColor="#a0a0a0"
                style={styles.searchInput}
                value={searchValue}
                onChangeText={setSearch}
              />
            </View>

            <FlatList
              data={data.filter(item =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
              )}
              contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
              keyExtractor={item => item.name}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => {
                    onSelectItem(item.name);
                    setSearch('');
                    closeModals(onCloseModal);
                  }}
                  accessibilityLabel={`Select ${item.name}`}
                >
                  <Text style={styles.listText}>
                    {item.flag} {item.name}
                  </Text>
                  {(onSelectItem === setSelectedLanguage && item.name === selectedLanguage) ||
                  (onSelectItem === setSelectedLocation && item.name === selectedLocation) ? (
                    <Feather name="check-circle" size={20} color="#007AFF" />
                  ) : null}
                </TouchableOpacity>
              )}
              ListFooterComponent={<View style={{ height: Platform.OS === 'android' ? 50 : 0 }} />}
            />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      style={[styles.wrapper, { width, height }]}
    >
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#5C6BC0" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.mainTitle}>Choose Your Preference</Text>
        <Text style={styles.subtitle}>
          Select your preferred language and location to personalize your experience.
        </Text>

        <TouchableOpacity
          style={styles.selector}
          onPress={() => {
            setLanguageModalVisible(true);
            openModal();
          }}
          accessibilityLabel="Open language selection modal"
        >
          <Text style={styles.selectorText}>🌐 Language:</Text>
          <Text style={styles.selectedValue}>{selectedLanguage}</Text>
          <Feather name="chevron-right" size={20} color="#8e8e93" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selector}
          onPress={() => {
            setLocationModalVisible(true);
            openModal();
          }}
          accessibilityLabel="Open location selection modal"
        >
          <Text style={styles.selectorText}>📍 Location:</Text>
          <Text style={styles.selectedValue}>{selectedLocation}</Text>
          <Feather name="chevron-right" size={20} color="#8e8e93" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            onSelect(selectedLanguage, selectedLocation);
            onClose();
          }}
          accessibilityLabel="Confirm selected language and location"
        >
          <Text style={styles.confirmText}>Confirm Selections</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      {renderModal(
        'Select Language',
        languages,
        languageSearch,
        setLanguageSearch,
        setSelectedLanguage,
        languageModalVisible,
        () => setLanguageModalVisible(false)
      )}

      {renderModal(
        'Select Location',
        countries,
        locationSearch,
        setLocationSearch,
        setSelectedLocation,
        locationModalVisible,
        () => setLocationModalVisible(false)
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#F7F9FC',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 28,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    width: '90%',
    maxWidth: 400,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#5C6BC0',
    fontWeight: '500',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EBF1FA',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#DDE6F0',
  },
  selectorText: {
    fontSize: 16,
    color: '#5C6BC0',
    fontWeight: '500',
  },
  selectedValue: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#5C6BC0',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: 'rgba(92, 107, 192, 0.4)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  fullscreenModal: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 15,
  },
  modalHandle: {
    width: 50,
    height: 6,
    backgroundColor: '#D1D1D6',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#2C3E50',
    textAlign: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 15,
    borderRadius: 25,
    marginBottom: 20,
    height: 48,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  listText: {
    fontSize: 17,
    color: '#333333',
    flex: 1,
  },
});

export default LanguageLocationSelector;