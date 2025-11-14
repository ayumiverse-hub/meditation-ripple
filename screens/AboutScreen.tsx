import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Ripple Meditation</Text>
      <Text style={styles.body}>
        This app is a tiny interactive meditation space. Tap anywhere on the
        screen to create soft ripples, hear a water drop sound, and relax with a
        gentle water stream in the background.
      </Text>
      <Text style={styles.body}>
        Built with React Native, Expo, and a lot of curiosity ✨
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f2fe",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#0369a1",
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: "#0f172a",
    marginBottom: 10,
  },
});
