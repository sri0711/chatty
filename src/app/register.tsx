import {
  View,
  Text,
  Pressable,
  Share,
  TextInput,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import config from "../helpers/config";
import registerStyle from "./styles/registerStyle";
import { useSelector } from "react-redux";
import { State } from "../constants/interfaces";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const register = () => {
  const appState = useSelector((state: State) => state.chatty_app_state);
  const [name, setName] = useState(appState.user_name);
  const [roomId, setRoomId] = useState(appState.room_id);
  const [haveRoomIds, setHaveRoomIds] = useState(false);
  return (
    <SafeAreaView style={registerStyle.root}>
      <View style={registerStyle.body}>
        <Text style={registerStyle.title}>Register</Text>
        <Text style={registerStyle.slogan}>❤️ Fill Your Love Form ❤️</Text>
        <Pressable onPress={() => setHaveRoomIds(!haveRoomIds)}>
          <Text style={registerStyle.haveLoveId}>
            Do you have Love ID{" "}
            <FontAwesome
              name={haveRoomIds ? "heart" : "heart-o"}
              color={"red"}
              size={25}
            />
          </Text>
        </Pressable>
        <Text style={registerStyle.TextInputTitle}>
          Lover’s Call :{" "}
          <TextInput
            style={registerStyle.TextField}
            value={name}
            onChangeText={setName}
            keyboardType="default"
          ></TextInput>
        </Text>
        {haveRoomIds ? (
          <Text style={registerStyle.TextInputTitle}>
            Love Id{"         "}:{" "}
            <TextInput
              style={registerStyle.TextField}
              value={roomId}
              onChangeText={setRoomId}
              keyboardType="default"
            ></TextInput>
          </Text>
        ) : (
          <></>
        )}
        {haveRoomIds ? (
          <Pressable onPress={() => router.push("/register")}>
            <Text style={registerStyle.button}>Mingle</Text>
          </Pressable>
        ) : roomId ? (
          <Pressable onPress={() => router.push("/register")}>
            <Text style={registerStyle.button}>Mingle</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => router.push("/register")}>
            <Text style={[registerStyle.button, { width: 200 }]}>
              Get Love Id
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default register;
