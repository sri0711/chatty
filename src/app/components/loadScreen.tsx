import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import React, { useEffect } from "react";
import config from "@/src/helpers/config";
import { useSelector } from "react-redux";
const appIcon = require("@/src/assets/images/icon.png");
import { State } from "@/src/constants/interfaces";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("screen").height - Constants.statusBarHeight,
    width: Dimensions.get("screen").width,
  },
  icon: {
    height: 200,
    width: 200,
  },
  loader: {
    marginVertical: 100,
  },
});

const LoadScreen = ({ serverHealthState }: any) => {
  const [isReady, setReady] = serverHealthState;
  const { connected } = useSelector((state: State) => state.socket);
  useEffect(() => {
    async function checkServerHealth() {
      let response = await fetch(config.server_url);
      response = await response.json();
      if (response.status) {
        if (connected) setReady(true);
      }
    }
    checkServerHealth();
  }, [connected]);
  return (
    <View style={styles.body}>
      <Image source={appIcon} style={styles.icon} />
      <ActivityIndicator style={styles.loader} size="large" color="#6EC207" />
    </View>
  );
};

export default LoadScreen;
