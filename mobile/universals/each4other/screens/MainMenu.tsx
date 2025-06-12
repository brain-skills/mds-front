// MainMenu.tsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Adjust this path according to your project structure

const sections = [
  { id: 'gallery', label: 'Gallery', icon: 'images', color: '#007AFF' },
  { id: 'about', label: 'About', icon: 'information-circle', color: '#34C759' },
  { id: 'contact', label: 'Contact', icon: 'call', color: '#FF9500' },
  { id: 'help', label: 'Help', icon: 'help-circle', color: '#AF52DE' },
];

export default function MainMenu() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const animations = useRef(sections.map(() => new Animated.Value(100))).current;

  useEffect(() => {
    const animationsSequence = animations.map(anim =>
      Animated.spring(anim, {
        toValue: 0,
        useNativeDriver: true,
      })
    );
    Animated.stagger(150, animationsSequence).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {sections.map((btn, index) => (
          <Animated.View
            key={btn.id}
            style={[
              styles.buttonWrapper,
              { transform: [{ translateY: animations[index] }] },
            ]}
          >
            <TouchableOpacity
              style={[styles.button, { backgroundColor: btn.color }]}
              onPress={() =>
                navigation.navigate('ContentPage', { section: btn.id as 'gallery' | 'about' | 'contact' | 'help' })
              }
            >
              <Ionicons name={btn.icon as any} size={36} color="#fff" />
              <Text style={styles.label}>{btn.label}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const buttonSize = width * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: buttonSize,
    margin: 10,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
  },
});
