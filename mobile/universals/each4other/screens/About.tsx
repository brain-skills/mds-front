import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";

const themeColor = "#2980B9";

export default function About() {
  const navigation = useNavigation();

  const bottomMenuItems = [
    {
      id: "back",
      label: "Back",
      iconName: "arrow-back-circle",
      IconComp: Ionicons,
      onPress: () => navigation.goBack(),
    },
    { id: "about", label: "About", iconName: "information-circle", IconComp: Ionicons },
    { id: "profile", label: "Profile", iconName: "person-circle", IconComp: Ionicons },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.headerWrapper]}>
        <Header />
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent]}>

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
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: themeColor,
    marginBottom: 16,
    textAlign: "center",
    paddingTop: 20,
  },
  paragraph: { fontSize: 15, lineHeight: 22, color: "#333", marginBottom: 20, textAlign:'center' },
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
