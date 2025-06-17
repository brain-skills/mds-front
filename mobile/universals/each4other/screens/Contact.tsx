import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  LayoutChangeEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";

const themeColor = "#16A085";

export default function Contact() {
  const navigation = useNavigation();

  const [headerHeight, setHeaderHeight] = useState(0);

  const bottomMenuItems = [
    { id: "home", label: "Home", iconName: "home", IconComp: Ionicons },
    { id: "contact", label: "Contact", iconName: "call", IconComp: Ionicons },
    { id: "profile", label: "Profile", iconName: "person-circle", IconComp: Ionicons },
  ];

  const openEmail = () => Linking.openURL("mailto:support@yourapp.com");

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
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: headerHeight }]}>
        <View style={styles.backContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle" size={32} color={themeColor} />
            <Text style={styles.backText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>📞 Contact Us</Text>

        <View style={styles.card}>
          <Ionicons name="call-outline" size={26} color={themeColor} style={styles.cardIcon} />
          <Text style={styles.cardText}>Phone: +1 (800) 555-1234</Text>
        </View>

        <TouchableOpacity onPress={openEmail} style={styles.card}>
          <Ionicons name="mail-outline" size={26} color={themeColor} style={styles.cardIcon} />
          <Text style={styles.cardText}>Email: support@yourapp.com</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Ionicons name="location-outline" size={26} color={themeColor} style={styles.cardIcon} />
          <Text style={styles.cardText}>
            Office: 123 Startup Street, Innovation City, USA
          </Text>
        </View>
      </ScrollView>

      <BottomMenu menuItems={bottomMenuItems} initialActiveId="contact" />
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E7F6F3",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  cardIcon: { marginRight: 12 },
  cardText: { fontSize: 15, color: "#2C3E50", flexShrink: 1 },
});
