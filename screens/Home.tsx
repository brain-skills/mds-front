import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import Slider from '../components/Slider';
import Menu from '../components/Menu';
import Block from '../components/Block';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const sliderData = [
  { id: 1, title: 'Slide One', color: '#ff6b6b' },
  { id: 2, title: 'Slide Two', color: '#4ecdc4' },
  { id: 3, title: 'Slide Three', color: '#1a73e8' },
  { id: 4, title: 'Slide Four', color: '#ffa500' },
  { id: 5, title: 'Slide Five', color: '#6a5acd' },
];

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header />

      <ScrollView contentContainerStyle={styles.homeScrollContent}>
        <Slider data={sliderData} />

        <Block
          title="Follow Us Online"
          description="Stay updated on our latest content and news."
        />

        <Slider data={sliderData} />

        <Block
          title="Follow Us Online"
          description="Stay updated on our latest content and news."
        />

        <Block
          title="Follow Us Online"
          description="Stay updated on our latest content and news."
          icons={true}
        />
      </ScrollView>

      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  homeScrollContent: {
    paddingTop: 10,
    paddingHorizontal: 14,
    gap: 25,
    alignItems: 'center',
  },
});
