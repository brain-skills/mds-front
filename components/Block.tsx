import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';

interface BlockProps {
  title: string;
  description: string;
  icons?: boolean;
  buttonLabel?: string;
  onButtonPress?: () => void;
  buttonStyle?: ViewStyle;
}

export default function Block({
  title,
  description,
  icons = false,
  buttonLabel = 'Click Me',
  onButtonPress,
  buttonStyle,
}: BlockProps) {
  return (
    <View style={styles.container}>
      {icons && (
        <View style={styles.iconWrapper}>
          <FontAwesome name="youtube-play" size={24} color="red" style={styles.icon} />
          <AntDesign name="instagram" size={24} color="#C13584" style={styles.icon} />
          <Entypo name="facebook" size={24} color="#3b5998" style={styles.icon} />
          <Entypo name="facebook" size={24} color="#3b5998" style={styles.icon} />
        </View>
      )}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onButtonPress}>
        <Text style={styles.buttonText}>{buttonLabel}</Text>
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
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
