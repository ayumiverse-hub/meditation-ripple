import React from "react";
import BreathingRipple from "./BreathingRipple";

export default function GuidedBreathing() {
  return (
    <BreathingRipple
      backgroundSound={require("../assets/water-stream.mp3")}
      backgroundColor="#7dd3fc"
      rippleColor="white"
    />
  );
}
