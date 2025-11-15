import React, { useState, useEffect } from "react";
import { StyleSheet, Pressable, Animated } from "react-native";
import type { GestureResponderEvent } from "react-native";
import { Audio } from "expo-av";

let rippleSeq = 0;
const makeRippleId = () => `${Date.now()}-${rippleSeq++}`;

type Ripple = {
  id: string;
  x: number;
  y: number;
  anim: Animated.Value;
  size: number;
  startOpacity: number;
  endScale: number;
  duration: number;
};

type RippleEffectProps = {
  backgroundSound: number;
  rippleSound: number;
  backgroundColor?: string;
  rippleColor?: string;
  onPress?: () => void;
};

export default function RippleEffect({
  backgroundSound,
  rippleSound,
  backgroundColor = "skyblue",
  rippleColor = "white",
  onPress,
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let bgSound: Audio.Sound;

    (async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      });

      try {
        const { sound } = await Audio.Sound.createAsync(backgroundSound, {
          volume: 0.25,
          isLooping: true,
        });
        bgSound = sound;
        await bgSound.playAsync();
      } catch (error) {
        console.log("Error loading background sound:", error);
      }
    })();

    return () => {
      bgSound?.unloadAsync();
    };
  }, [backgroundSound]);

  function spawnRipple(opts: Omit<Ripple, "id" | "anim">) {
    const anim = new Animated.Value(0);
    const ripple: Ripple = { id: makeRippleId(), anim, ...opts };

    setRipples((curr) => [...curr, ripple]);

    Animated.timing(anim, {
      toValue: 1,
      duration: ripple.duration,
      useNativeDriver: true,
    }).start(() => {
      setRipples((curr) => curr.filter((r) => r.id !== ripple.id));
    });
  }

  async function handlePress(event: GestureResponderEvent) {
    const { locationX: x, locationY: y } = event.nativeEvent;

    try {
      const { sound } = await Audio.Sound.createAsync(rippleSound);
      await sound.playAsync();
    } catch (error) {
      console.log("Error playing ripple sound:", error);
    }

    spawnRipple({
      x,
      y,
      size: 110,
      startOpacity: 0.5,
      endScale: 3.0,
      duration: 1500,
    });

    setTimeout(() => {
      spawnRipple({
        x,
        y,
        size: 70,
        startOpacity: 0.2,
        endScale: 1.5,
        duration: 1200,
      });
    }, 300);

    onPress?.();
  }

  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      onPress={handlePress}
    >
      {ripples.map((r) => (
        <Animated.View
          key={r.id}
          style={[
            styles.circle,
            {
              backgroundColor: rippleColor,
              left: r.x - r.size / 2,
              top: r.y - r.size / 2,
              width: r.size,
              height: r.size,
              transform: [
                {
                  scale: r.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.1, r.endScale],
                  }),
                },
              ],
              opacity: r.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [r.startOpacity, 0],
              }),
            },
          ]}
        />
      ))}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  circle: { position: "absolute", borderRadius: 9999 },
});
