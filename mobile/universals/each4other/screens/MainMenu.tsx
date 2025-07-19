import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useThemeContext } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

type IoniconName = keyof typeof Ionicons.glyphMap;

type NoParamScreens = Extract<
  {
    [K in keyof RootStackParamList]: RootStackParamList[K] extends undefined ? K : never;
  }[keyof RootStackParamList],
  string
>;

type Section = {
  id: NoParamScreens;
  label: string;
  description: string;
  icon: IoniconName;
  color: string;
};

const sections: Section[] = [
  {
    id: "Auctions",
    label: "Auctions",
    description: "Browse current auctions and bids",
    icon: "pricetag",
    color: "#2C3E50",
  },
  {
    id: "About",
    label: "About Us",
    description: "Learn about our company and values",
    icon: "information-circle",
    color: "#2980B9",
  },
  {
    id: "Contact",
    label: "Contact",
    description: "Get in touch with our team",
    icon: "call",
    color: "#16A085",
  },
  {
    id: "Support",
    label: "Support",
    description: "Customer service and FAQs",
    icon: "help-circle",
    color: "#8E44AD",
  },
];

export default function MainMenu() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useThemeContext();
  const animations = useRef(sections.map(() => new Animated.Value(-width))).current;

  useEffect(() => {
    const animationsSequence = sections.map((_, i) =>
      Animated.timing(animations[i], {
        toValue: 0,
        duration: 500,
        delay: i * 150,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      })
    );
    Animated.stagger(100, animationsSequence).start();
  }, [animations]);

  const handlePress = (id: NoParamScreens) => {
    navigation.navigate({ name: id, params: undefined });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.menuContainer}>
        {sections.map((section, index) => (
          <Animated.View
            key={section.id}
            style={[
              styles.animatedButton,
              { transform: [{ translateX: animations[index] }] },
            ]}
          >
            <TouchableOpacity
              style={[styles.button, { backgroundColor: section.color }]}
              onPress={() => handlePress(section.id)}
              activeOpacity={0.8}
            >
              <Ionicons name={section.icon} size={36} color="#fff" style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.label}>{section.label}</Text>
                <Text style={styles.description}>{section.description}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedButton: {
    width: "100%",
    marginBottom: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 30,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    minHeight: 130,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flexShrink: 1,
  },
  label: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
});