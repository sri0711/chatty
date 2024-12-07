import { View, Text, Pressable, Share, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import applications from "../constants/applications";
import CheckBox from "expo-checkbox";
import { io } from "socket.io-client";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import config from "../helpers/config";

const register = () => {
  const [loginType, setLoginType] = useState(true);
  const [roomId, setRoomId] = useState(SecureStore.getItem("room_id") || "");
  const [roomIdGenerated, setRoomIdGenerated] = useState(false);
  const [name, setName] = useState(SecureStore.getItem("name") || "user");
  const socket = io(config.server_url, {
    reconnection: true,
  });
  useEffect(() => {
    socket.connect();
    try {
      socket.on("connect", () => {});
    } catch (error) {
      console.log(error);
    }
  }, []);
  socket.on("news", (data) => {
    if (data.room_id != null) {
      setRoomId(data.room_id);
      setRoomIdGenerated(true);
    }
  });

  const GetRoomId = () => {
    socket.emit("news", {
      type: "register",
    });
  };
  const shareRoomId = async () => {
    await Share.share({
      message: `you partner is waiting on chat for this room id: \n\n\n\n\n\n\n\n ${roomId}`,
    });
  };

  const getStarted = async () => {
    SecureStore.setItem("room_id", roomId);
    SecureStore.setItem("name", name);
    router.replace("/");
    socket.disconnect();
  };

  return (
    <View style={[applications.Theme.body, applications.Theme.center]}>
      <Text
        style={[
          applications.Theme.title_font,
          applications.Theme.app_info_title,
          applications.Theme.text_align_center,
        ]}
      >
        Register
      </Text>
      <View style={{ marginTop: 70 }}>
        <Text style={[applications.Theme.title_font, { margin: 20 }]}>
          Please enter your name for identification
        </Text>
        <TextInput
          style={{
            fontWeight: 900,
            color: "#fff",
            borderColor: "#fff",
            borderWidth: 1,
            marginHorizontal: 30,
          }}
          value={name}
          keyboardType="default"
          onChangeText={setName}
        ></TextInput>
      </View>
      <View style={[applications.Theme.inline_center, { marginTop: 80 }]}>
        {roomIdGenerated ? (
          <></>
        ) : (
          <>
            <CheckBox
              style={[
                loginType && { backgroundColor: "#6EC207" },
                {
                  marginHorizontal: 10,
                  marginLeft: 40,
                },
              ]}
              value={loginType}
              onValueChange={setLoginType}
            />
            <Text style={applications.Theme.title_font}>have a partner</Text>
          </>
        )}
      </View>
      <View>
        {loginType ? (
          <>
            <View style={{ margin: 10, padding: 10 }}>
              <TextInput
                style={{
                  fontWeight: 900,
                  color: "#fff",
                  borderColor: "#fff",
                  borderWidth: 1,
                }}
                value={roomId}
                keyboardType="default"
                onChangeText={setRoomId}
              ></TextInput>
            </View>
            <View>
              <Pressable onPress={getStarted}>
                <Text
                  style={[
                    applications.Theme.margin,
                    applications.Theme.title_font,
                    applications.Theme.text_align_center,
                    {
                      backgroundColor: "#6EC207",
                      marginHorizontal: 70,
                      paddingVertical: 10,
                    },
                  ]}
                >
                  Get Started
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            {roomIdGenerated ? (
              <>
                <Pressable onPress={shareRoomId}>
                  <Text
                    style={[
                      applications.Theme.title_font,
                      { margin: 10, marginHorizontal: 30, marginTop: 30 },
                    ]}
                  >
                    {roomId}
                  </Text>
                  <Text
                    style={[
                      applications.Theme.font_color_gray,
                      { marginHorizontal: 30 },
                    ]}
                  >
                    tap to share
                  </Text>
                </Pressable>
                <View>
                  <Pressable onPress={getStarted}>
                    <Text
                      style={[
                        applications.Theme.margin,
                        applications.Theme.title_font,
                        applications.Theme.text_align_center,
                        {
                          backgroundColor: "#6EC207",
                          marginHorizontal: 70,
                          paddingVertical: 10,
                        },
                      ]}
                    >
                      Get Started
                    </Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <Text
                  style={[
                    applications.Theme.title_font,
                    { margin: 10, marginHorizontal: 30 },
                  ]}
                >
                  click to get a unique id
                </Text>
                <View>
                  <Pressable onPress={GetRoomId}>
                    <Text
                      style={[
                        applications.Theme.margin,
                        applications.Theme.title_font,
                        applications.Theme.text_align_center,
                        {
                          backgroundColor: "#6EC207",
                          marginHorizontal: 70,
                          paddingVertical: 10,
                        },
                      ]}
                    >
                      Contact Server
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default register;
