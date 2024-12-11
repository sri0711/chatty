import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/src/redux/store";
import SocketHandler from "@/src/helpers/socketHandler";
import Player from "@/src/app/player";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

export default function Layout() {
  return (
    <Provider store={store}>
      <SocketHandler />
      <StatusBar
        style={Platform.OS === "ios" ? "dark" : "dark"}
        backgroundColor={Platform.OS === "ios" ? "#000" : "#000"}
      />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="welcome"
          options={{
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerLeft: () => null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <Player />
    </Provider>
  );
}
