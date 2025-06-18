import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";

const themeColor = "#2C3E50";

export default function Auctions() {
  const navigation = useNavigation();

  const bottomMenuItems = [
    {
      id: "back",
      label: "Back",
      iconName: "arrow-back-circle",
      IconComp: Ionicons,
      onPress: () => navigation.goBack(),
    },
    {
      id: "auctions",
      label: "Auctions",
      iconName: "pricetag",
      IconComp: Ionicons,
    },
    {
      id: "profile",
      label: "Profile",
      iconName: "person-circle",
      IconComp: Ionicons,
    },
  ];

  const auctionData = [
    { id: 1, title: "Vintage Rolex Watch", description: "Collector’s item from 1965 in great condition.", icon: "watch" },
    { id: 2, title: "Picasso Sketch", description: "Certified original sketch signed by Picasso.", icon: "color-palette" },
    { id: 3, title: "Ferrari F40", description: "Limited edition classic car. 1,311 made.", icon: "car-sport" },
    { id: 4, title: "Luxury Yacht", description: "Mini yacht with modern amenities, 2020 model.", icon: "boat" },
    { id: 5, title: "Diamond Ring", description: "Brilliant-cut, 2.5 carats, GIA certified.", icon: "diamond" },
    { id: 6, title: "Antique Camera", description: "Vintage Leica M3 with original case.", icon: "camera" },
    { id: 7, title: "Luxury Yacht", description: "Mini yacht with modern amenities, 2020 model.", icon: "boat" },
    { id: 8, title: "Vintage Rolex Watch", description: "Collector’s item from 1965 in great condition.", icon: "watch" },
    { id: 9, title: "Vintage Rolex Watch", description: "Collector’s item from 1965 in great condition.", icon: "watch" },

  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header />
      </View>

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>🔥 Live Auctions</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {auctionData.map((item) => (
          <View key={item.id} style={styles.auctionItem}>
            <Ionicons name={item.icon as any} size={32} color={themeColor} style={styles.icon} />
            <View style={styles.itemText}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={themeColor} />
          </View>
        ))}
      </ScrollView>

      <BottomMenu menuItems={bottomMenuItems} initialActiveId="auctions" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerWrapper: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: themeColor,
    textAlign: "center",
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  backContainer: {
    paddingBottom: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 16,
    color: themeColor,
    fontWeight: "500",
    marginLeft: 10,
  },
  auctionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F3F4",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
  },
  icon: {
    marginRight: 12,
  },
  itemText: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: themeColor,
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 13,
    color: "#333",
  },
});
