import React from "react";
import RippleEffect from "../components/RippleEffect";

export default function MeditationScreen() {
  return (
    <RippleEffect
      backgroundSound={require("../assets/water-stream.mp3")}
      rippleSound={require("../assets/water-drop.mp3")}
      backgroundColor="#7dd3fc"
      rippleColor="white"
    />
  );
}
