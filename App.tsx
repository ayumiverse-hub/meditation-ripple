import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import MeditationScreen from "./screens/MeditationScreen";
import AboutScreen from "./screens/AboutScreen";

const stack = createStackNavigator;

type RootStackParamList = {
  Home: undefined;
  Meditation: undefined;
  About: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0099ff",
          },
          headerTintColor: "fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Meditation App" }}
        />
        <Stack.Screen
          name="Meditation"
          component={MeditationScreen}
          options={{
            title: "Meditate",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: "About" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
