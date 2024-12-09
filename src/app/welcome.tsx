import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import welcomeStyle from "./styles/welcomeStyle";
const appIcon = require("../assets/images/icon.png");

const welcome = () => {
  return (
    <SafeAreaView style={welcomeStyle.root}>
      <View style={welcomeStyle.body}>
        <Image source={appIcon} alt="image" style={welcomeStyle.icon} />
        <Text style={welcomeStyle.title}>Chatty</Text>
        <Text style={welcomeStyle.bottomText}>
          Share Thoughts To Your Partner
        </Text>
        <Text style={welcomeStyle.bottomText}>with music</Text>
        <Pressable onPress={() => router.push("/register")}>
          <Text style={welcomeStyle.button}>Start</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default welcome;
