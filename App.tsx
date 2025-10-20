import { StyleSheet, Pressable, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";

type Ripple = {
  id: number;
  x: number;
  y: number;
  anim: Animated.Value;
};

export default function App() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let bgSound: Audio.Sound;

    (async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      });

      const { sound } = await Audio.Sound.createAsync(
        require("../meditation-ripple/assets/water-stream.mp3"),
        { volume: 0.25, isLooping: true }
      );
      bgSound = sound;
      await bgSound.playAsync();
    })();

    return () => {
      bgSound?.unloadAsync();
    };
  }, []);

  async function handlePress(event: any) {
    const { sound } = await Audio.Sound.createAsync(
      require("../meditation-ripple/assets/water-drop.mp3")
    );
    await sound.playAsync();

    const x = event.nativeEvent.locationX;
    const y = event.nativeEvent.locationY;
    const anim = new Animated.Value(0);
    const ripple: Ripple = { id: Date.now(), x, y, anim };

    setRipples((curr) => [...curr, ripple]);

    Animated.timing(anim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      setRipples((curr) => curr.filter((r) => r.id !== ripple.id));
    });
  }

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      {ripples.map((r) => {
        const size = 100;
        return (
          <Animated.View
            key={r.id}
            style={[
              styles.circle,
              {
                left: r.x - size / 2,
                top: r.y - size / 2,
                width: size,
                height: size,
                transform: [
                  {
                    scale: r.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.1, 3],
                    }),
                  },
                ],
                opacity: r.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 0],
                }),
              },
            ]}
          />
        );
      })}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
  },
  circle: {
    position: "absolute",
    borderRadius: 9999,
    backgroundColor: "white",
  },
});
