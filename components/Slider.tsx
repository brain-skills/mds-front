import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type SlideItem = {
  id: number;
  title: string;
  color: string;
};

type SliderProps = {
  data: SlideItem[];
};

export default function Slider({ data }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % data.length;
    carouselRef.current?.scrollTo({ index: nextIndex });
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + data.length) % data.length;
    carouselRef.current?.scrollTo({ index: prevIndex });
    setCurrentIndex(prevIndex);
  };

  return (
    <View style={styles.sliderWrapper}>
      <Carousel
        ref={carouselRef}
        loop
        width={width * 0.9}
        height={180}
        data={data}
        scrollAnimationDuration={800}
        onSnapToItem={setCurrentIndex}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.color }]}>
            <Text style={styles.slideText}>{item.title}</Text>
          </View>
        )}
      />

      <View style={styles.navBlock}>
        <TouchableOpacity onPress={handlePrev}>
          <Ionicons name="chevron-back" size={28} color="#1a73e8" />
        </TouchableOpacity>

        <View style={styles.dotsWrapper}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext}>
          <Ionicons name="chevron-forward" size={28} color="#1a73e8" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderWrapper: {
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  navBlock: {
    backgroundColor: '#ffffff',
    width: '100%',
    paddingHorizontal: 2,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dotsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#1a73e8',
  },
});
