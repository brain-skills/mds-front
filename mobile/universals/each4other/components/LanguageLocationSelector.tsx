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
  SafeAreaView, // Added for better handling of safe areas
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn, // For subtle entry animations
  FadeOut,
} from 'react-native-reanimated'; // Added reanimated for smoother animations

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

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: modalTranslateY.value }],
      opacity: modalOpacity.value,
    };
  });

  const openModal = () => {
    modalTranslateY.value = withTiming(0, { duration: 300 });
    modalOpacity.value = withTiming(1, { duration: 200 });
  };

  const closeModals = (callback: () => void) => {
    modalTranslateY.value = withTiming(height, { duration: 300 }, () => {
      modalOpacity.value = withTiming(0, { duration: 200 }, () => {
        callback();
      });
    });
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
            <TouchableOpacity style={styles.modalHandle} onPress={() => closeModals(onCloseModal)} />
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
                >
                  <Text style={styles.listText}>{item.flag} {item.name}</Text>
                  {onSelectItem === setSelectedLanguage && item.name === selectedLanguage && (
                    <Feather name="check-circle" size={20} color="#007AFF" />
                  )}
                   {onSelectItem === setSelectedLocation && item.name === selectedLocation && (
                    <Feather name="check-circle" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              )}
              // Add a small footer for better spacing with keyboard on Android
              ListFooterComponent={<View style={{ height: Platform.OS === 'android' ? 50 : 0 }} />}
            />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );

  return (
    <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)} style={[styles.wrapper, { width, height }]}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#5C6BC0" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.mainTitle}>Choose Your Preference</Text>
        <Text style={styles.subtitle}>Select your preferred language and location to personalize your experience.</Text>

        <TouchableOpacity
          style={styles.selector}
          onPress={() => {
            setLanguageModalVisible(true);
            openModal();
          }}
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
    backgroundColor: '#F7F9FC', // Lighter, modern background
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 28, // Increased padding
    borderRadius: 20, // More rounded corners
    backgroundColor: '#FFFFFF',
    width: '90%',
    maxWidth: 400, // Max width for larger screens
    shadowColor: 'rgba(0, 0, 0, 0.08)', // Softer shadow
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24, // Increased margin
    alignSelf: 'flex-start',
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#5C6BC0', // Muted blue
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
    marginBottom: 30, // More spacing
    lineHeight: 20,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EBF1FA', // Lighter, more subtle background for selectors
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14, // Slightly more rounded
    marginBottom: 14, // Consistent spacing
    borderWidth: 1,
    borderColor: '#DDE6F0', // Subtle border
  },
  selectorText: {
    fontSize: 16,
    color: '#5C6BC0', // Muted blue for labels
    fontWeight: '500',
  },
  selectedValue: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
    flex: 1, // Allows value to take up available space
    textAlign: 'right', // Aligns value to the right
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#5C6BC0', // Primary action color
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20, // More top margin
    shadowColor: 'rgba(92, 107, 192, 0.4)', // Shadow for button
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  confirmText: {
    color: '#fff',
    fontSize: 18, // Larger font
    fontWeight: '700', // Bolder
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // Darker, more pronounced overlay
    justifyContent: 'flex-end',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  fullscreenModal: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '90%', // Slightly taller modal
    borderTopLeftRadius: 30, // More rounded corners
    borderTopRightRadius: 30,
    padding: 25, // Increased padding
    shadowColor: 'rgba(0, 0, 0, 0.15)', // Enhanced shadow
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 15,
  },
  modalHandle: {
    width: 50, // Wider handle
    height: 6, // Thicker handle
    backgroundColor: '#D1D1D6', // Softer grey
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20, // More spacing
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20, // More spacing
    color: '#2C3E50',
    textAlign: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5', // Lighter search box background
    paddingHorizontal: 15,
    borderRadius: 25, // More rounded search input
    marginBottom: 20,
    height: 48, // Fixed height for input
  },
  searchInput: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10, // Adjust padding for consistent height
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16, // More vertical padding
    borderBottomWidth: StyleSheet.hairlineWidth, // Finer line
    borderBottomColor: '#E0E0E0', // Lighter border color
  },
  listText: {
    fontSize: 17, // Slightly larger text
    color: '#333333',
    flex: 1,
  },
  closeButton: {
    marginTop: 25,
    backgroundColor: '#007AFF', // iOS blue for close button
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: 'rgba(0, 122, 255, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
});

export default LanguageLocationSelector;