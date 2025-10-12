import { StyleSheet, View, Pressable } from "react-native";
import { useState } from "react";

export default function App() {
  const [circlePos, setCirclePos] = useState({ x: 200, y: 200 });

  function handlePress(event: any) {
    const x = event.nativeEvent.locationX;
    const y = event.nativeEvent.locationY;
    setCirclePos({ x, y });
  }

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View
        style={[
          styles.circle,
          {
            left: circlePos.x - 50,
            top: circlePos.y - 50,
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
  },
});
