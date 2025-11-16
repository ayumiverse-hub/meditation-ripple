import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";

type BreathingPhase = "inhale" | "hold" | "exhale";

type BreathingRippleProps = {
  backgroundSound: number;
  backgroundColor?: string;
  rippleColor?: string;
};

export default function BreathingRipple({
  backgroundSound,
  backgroundColor = "#7dd3fc",
  rippleColor = "white",
}: BreathingRippleProps) {
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>("inhale");
  const rippleScale = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    let bgSound: Audio.Sound;

    //background sound
    (async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      });

      try {
        const { sound } = await Audio.Sound.createAsync(backgroundSound, {
          volume: 0.15,
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

  // breathing cycle
  useEffect(() => {
    let isMounted = true;

    const runBreathingCycle = () => {
      const speak = (text: String) => {
        Speech.speak(text, {
          language: "en-US",
          pitch: 1.0,
          rate: 0.8,
        });
      };

      const singleCycle = async () => {
        if (!isMounted) return;
      };

      const singleCycle = async () => {
        setCurrentPhase("inhale");
        speak("Breathe in");
        await new Promise((resolve) => {
          Animated.timing(rippleScale, {
            toValue: 1.0,
            duration: 4000,
            useNativeDriver: true,
          }).start(resolve);
        });

        setCurrentPhase("hold");
        speak("Hold");
        await new Promise((resolve) => setTimeout(resolve, 7000));

        if (!isMounted) return;

        setCurrentPhase("exhale");
        speak("Breathe out");
        await new Promise((resolve) => {
          Animated.timing(rippleScale, {
            toValue: 0.3,
            duration: 8000,
            useNativeDriver: true,
          }).start(resolve);
        });
      };

      const runForever = async () => {
        while (isMounted) {
          await singleCycle();
        }
      };
      runForever();
    };

    runBreathingCycle();

    return () => {
      isMounted = false;
      Speech.stop();
    };
  }, [rippleScale]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* the breating ripple */}
      <Animated.View
        style={[
          styles.ripple,
          {
            backgroundColor: rippleColor,
            transform: [{ scale: rippleScale }],
          },
        ]}
      />
      {/* Text overlay showing current phase */}
      <Text style={styles.phaseText}>
        {currentPhase === "inhale" && "Breathe in..."}
        {currentPhase === "hold" && "Hold..."}
        {currentPhase === "exhale" && "Breathe out..."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ripple: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: "absolute",
  },
  phaseText: {
    fontSize: 24,
    color: "white",
    fontWeight: "600",
    marginTop: 250,
  },
});
