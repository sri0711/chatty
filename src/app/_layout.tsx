import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import SocketHandler from "../helpers/socketHandler";
import Player from "./player";

export default function Layout() {
  return (
    <Provider store={store}>
      <SocketHandler />
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
