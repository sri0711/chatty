import { View, Text, Pressable, Share, TextInput } from "react-native";
import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import registerStyle from "@/src/app/styles/registerStyle";
import { useSelector, useDispatch } from "react-redux";
import { State } from "@/src/constants/interfaces";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { updateRoomId, updateUserName } from "@/src/redux/reducers/appState";
import Utils from "@/src/helpers/Utils";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const register = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state: State) => state.chatty_app_state);
  const { socket } = useSelector((state: State) => state.socket);

  const [name, setName] = useState(appState.user_name || "");
  const [roomId, setRoomId] = useState(appState.room_id || "");
  const [haveRoomIds, setHaveRoomIds] = useState(roomId != null ? true : false);
  const getRoomId = () => {
    socket.emit("news", {
      type: "register",
    });
  };
  socket.on("news", (data: { room_id: string }) => {
    setRoomId(appState.room_id);
  });

  const mingle = () => {
    if (!name || name?.length < 3) {
      return Utils.showToast("please provide a name");
    }
    if (!roomId || roomId?.length < 3) {
      return Utils.showToast("please provide a Love Id");
    }
    dispatch(updateUserName(name));
    dispatch(updateRoomId(roomId));
    SecureStore.setItem("room_id", roomId);
    SecureStore.setItem("name", name);
    router.replace("/");
  };

  const shareRoomID = () => {
    Share.share({
      message: `Your Partner is waiting for you! \nLove Id: ${roomId}`,
    });
  };

  return (
    <SafeAreaProvider>
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
            <Pressable onPress={mingle}>
              <Text style={registerStyle.button}>Mingle</Text>
            </Pressable>
          ) : roomId ? (
            <>
              <Text style={registerStyle.TextInputTitle}>
                Love Id{"         "}:{" "}
                <TextInput
                  style={registerStyle.TextField}
                  value={roomId}
                  onChangeText={setRoomId}
                  keyboardType="default"
                ></TextInput>
              </Text>
              <Pressable onPress={shareRoomID}>
                <FontAwesome name="share-alt" size={35} color={"red"} />
              </Pressable>

              <Pressable onPress={mingle}>
                <Text style={registerStyle.button}>Mingle</Text>
              </Pressable>
            </>
          ) : (
            <Pressable onPress={getRoomId}>
              <Text style={[registerStyle.button, { width: 200 }]}>
                Get Love Id
              </Text>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default register;
