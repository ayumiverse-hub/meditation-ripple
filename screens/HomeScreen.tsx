import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Meditation: undefined;
  Breathing: undefined;
  About: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ripple Meditation</Text>
      <Text style={styles.subtitle}>
        Tap to create ripples, hear soft water, and unwind.
      </Text>

      <Pressable
        style={styles.primaryButton}
        onPress={() => navigation.navigate("Meditation")}
      >
        <Text style={styles.primaryButtonText}>Free Meditation</Text>
      </Pressable>

      <Pressable
        style={styles.primaryButton}
        onPress={() => navigation.navigate("Breathing")}
      >
        <Text style={styles.primaryButtonText}>Guided Breathing</Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={styles.secondaryButtonText}>About this app</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0099ff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#e0f2ff",
    textAlign: "center",
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 9999,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#0099ff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    borderColor: "#fff",
    borderWidth: 1.5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 9999,
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
