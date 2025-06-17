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

const themeColor = "#8E44AD";

export default function Support() {
  const navigation = useNavigation();

  const [headerHeight, setHeaderHeight] = useState(0);

  const bottomMenuItems = [
    { id: "home", label: "Home", iconName: "home", IconComp: Ionicons },
    { id: "support", label: "Support", iconName: "help-circle", IconComp: Ionicons },
    { id: "profile", label: "Profile", iconName: "person-circle", IconComp: Ionicons },
  ];

  const onHeaderLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height !== headerHeight) {
      setHeaderHeight(height);
    }
  };

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

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: headerHeight }]} showsVerticalScrollIndicator={false}>
        <View style={styles.backContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle" size={32} color={themeColor} />
            <Text style={styles.backText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>🛟 Support Center</Text>

        <View style={styles.card}>
          <Ionicons name="chatbubble-ellipses-outline" size={28} color={themeColor} style={styles.icon} />
          <Text style={styles.cardText}>Live chat available 9am – 6pm daily</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="book-outline" size={28} color={themeColor} style={styles.icon} />
          <Text style={styles.cardText}>Check out our FAQs for quick answers</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="call-outline" size={28} color={themeColor} style={styles.icon} />
          <Text style={styles.cardText}>Call us anytime at +1 (800) 555-4321</Text>
        </View>
      </ScrollView>

      {/* Bottom navigation menu */}
      <BottomMenu menuItems={bottomMenuItems} initialActiveId="support" />
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
  backText: { fontSize: 16, color: themeColor, fontWeight: "600", marginLeft: 10 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: themeColor,
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3EAF9",
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  icon: { marginRight: 14 },
  cardText: {
    fontSize: 16,
    color: "#2C3E50",
    flexShrink: 1,
  },
});
