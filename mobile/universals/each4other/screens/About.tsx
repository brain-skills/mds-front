import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutChangeEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";

const themeColor = "#2980B9";

export default function About() {
  const navigation = useNavigation();

  // State for dynamic header height
  const [headerHeight, setHeaderHeight] = useState(0);

  const bottomMenuItems = [
    { id: "home", label: "Home", iconName: "home", IconComp: Ionicons },
    { id: "about", label: "About", iconName: "information-circle", IconComp: Ionicons },
    { id: "profile", label: "Profile", iconName: "person-circle", IconComp: Ionicons },
  ];

  // Capture header height on layout
  const onHeaderLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height !== headerHeight) {
      setHeaderHeight(height);
    }
  };

  // Don't render scroll content until header height is known
  if (headerHeight === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper} onLayout={onHeaderLayout}>
          <Header />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={[styles.headerWrapper, { height: headerHeight }]} onLayout={onHeaderLayout}>
        <Header />
      </View>

      {/* Scrollable content below header */}
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: headerHeight }]}>
        <View style={styles.backContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle" size={32} color={themeColor} />
            <Text style={styles.backText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>👥 About Our Company</Text>

        <Text style={styles.paragraph}>
          We are a modern online auction platform connecting buyers and sellers worldwide.
          Our mission is to make bidding easy, transparent, and exciting.
        </Text>

        <View style={styles.card}>
          <Ionicons name="rocket-outline" size={28} color={themeColor} style={styles.cardIcon} />
          <Text style={styles.cardText}>Founded in 2021 with a passion for innovation</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="people-outline" size={28} color={themeColor} style={styles.cardIcon} />
          <Text style={styles.cardText}>Serving over 100,000 users globally</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="medal-outline" size={28} color={themeColor} style={styles.cardIcon} />
          <Text style={styles.cardText}>Awarded Best Startup in 2024</Text>
        </View>
      </ScrollView>

      {/* Bottom Menu */}
      <BottomMenu menuItems={bottomMenuItems} initialActiveId="about" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerWrapper: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#fff",
  },
  backContainer: { paddingHorizontal: 16, paddingTop: 10 },
  backButton: { flexDirection: "row", alignItems: "center" },
  backText: { fontSize: 16, color: themeColor, fontWeight: "500", marginLeft: 10 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: "bold", color: themeColor, marginBottom: 16 },
  paragraph: { fontSize: 15, lineHeight: 22, color: "#333", marginBottom: 20 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECF3FA",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  cardIcon: { marginRight: 12 },
  cardText: { fontSize: 15, color: "#2C3E50", flexShrink: 1 },
});
