import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';

interface BlockProps {
  title: string;
  description: string;
  icons?: boolean;
  buttonLabel?: string;
  onButtonPress?: () => void;
  buttonStyle?: ViewStyle;
  darkMode?: boolean;
}

export default function Block({
  title,
  description,
  icons = false,
  buttonLabel = 'Click Me',
  onButtonPress,
  buttonStyle,
  darkMode = false,
}: BlockProps) {
  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      {icons && (
        <View style={styles.iconWrapper}>
          <FontAwesome name="youtube-play" size={28} color={darkMode ? '#FF5A5F' : '#E62117'} style={styles.icon} />
          <AntDesign name="instagram" size={28} color={darkMode ? '#FF7F99' : '#C13584'} style={styles.icon} />
          <Entypo name="facebook" size={28} color={darkMode ? '#3B5998' : '#4267B2'} style={styles.icon} />
          <Entypo name="twitter" size={28} color={darkMode ? '#1DA1F2' : '#1DA1F2'} style={styles.icon} />
        </View>
      )}

      <Text style={[styles.title, darkMode && styles.titleDark]}>{title}</Text>
      <Text style={[styles.description, darkMode && styles.descriptionDark]}>{description}</Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          darkMode && styles.buttonDark,
          buttonStyle,
          pressed && styles.buttonPressed,
        ]}
        onPress={onButtonPress}
      >
        <Text style={[styles.buttonText, darkMode && styles.buttonTextDark]}>{buttonLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
    shadowOpacity: 0.25,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    gap: 20
  },
  icon: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
    color: '#222',
  },
  titleDark: {
    color: '#eee',
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: '#555',
    lineHeight: 22,
  },
  descriptionDark: {
    color: '#bbb',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    shadowColor: '#007AFF',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 4,
  },
  buttonDark: {
    backgroundColor: '#0a84ff',
    shadowColor: '#0a84ff',
  },
  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonTextDark: {
    color: '#e6e6e6',
  },
});
