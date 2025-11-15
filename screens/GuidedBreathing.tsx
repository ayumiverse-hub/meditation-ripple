import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function GuidedBreathing() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Breathing Exercise coming soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7dd3fc",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },
});
