import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';

interface BlockProps {
  title: string;
  description: string;
  icons?: boolean;
  buttonLabel?: string;
  onButtonPress?: () => void;
  buttonStyle?: ViewStyle;
  darkMode?: boolean; // added darkMode prop
}

export default function Block({
  title,
  description,
  icons = false,
  buttonLabel = 'Click Me',
  onButtonPress,
  buttonStyle,
  darkMode = false, // default false
}: BlockProps) {
  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      {icons && (
        <View style={styles.iconWrapper}>
          <FontAwesome name="youtube-play" size={24} color={darkMode ? '#ff4444' : 'red'} style={styles.icon} />
          <AntDesign name="instagram" size={24} color={darkMode ? '#e1306c' : '#C13584'} style={styles.icon} />
          <Entypo name="facebook" size={24} color={darkMode ? '#2d4a8a' : '#3b5998'} style={styles.icon} />
          <Entypo name="facebook" size={24} color={darkMode ? '#2d4a8a' : '#3b5998'} style={styles.icon} />
        </View>
      )}

      <Text style={[styles.title, darkMode && styles.titleDark]}>{title}</Text>
      <Text style={[styles.description, darkMode && styles.descriptionDark]}>{description}</Text>

      <TouchableOpacity style={[styles.button, darkMode && styles.buttonDark, buttonStyle]} onPress={onButtonPress}>
        <Text style={[styles.buttonText, darkMode && styles.buttonTextDark]}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  containerDark: {
    backgroundColor: '#222',
    shadowOpacity: 0.3,
    shadowColor: '#000',
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#000',
  },
  titleDark: {
    color: '#eee',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  descriptionDark: {
    color: '#ccc',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 8,
  },
  buttonDark: {
    backgroundColor: '#444',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextDark: {
    color: '#ddd',
  },
});
