import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { State, Message } from "@/src/constants/interfaces";
import { updateJoinRoomState } from "@/src/redux/reducers/socket";
import { addMessages } from "@/src/redux/reducers/messages";
import { updateShowPlayer, updateRoomId } from "@/src/redux/reducers/appState";
import indexStyle from "@/src/app/styles/indexStyle";
import LoadScreen from "@/src/app/components/loadScreen";
import MessagesScreen from "@/src/app/components/messagesScreen";
import Music from "@/src/app/music";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import musicHandler from "@/src/helpers/musicHandler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const dispatch = useDispatch();
  const AppState = useSelector((state: State) => state.chatty_app_state);
  const { socket, connected, joined } = useSelector(
    (state: State) => state.socket
  );

  // secValidator
  useEffect(() => {
    if (!AppState.room_id) {
      setTimeout(() => {
        router.replace("/welcome");
      }, 500);
    }
  });

  // socket state event handler
  useEffect(() => {
    if (connected && !joined) {
      socket.emit("news", {
        type: "leave",
        room_id: AppState.room_id,
      });
      socket.emit("news", {
        type: "join",
        room_id: AppState.room_id,
      });
      dispatch(updateJoinRoomState(true));
      socket.on("music", (data: any) => {
        musicHandler(data, dispatch);
      });
      socket.on("message", (data: Message) => {
        dispatch(addMessages(data));
      });
    }
  }, [connected, socket]);

  const [isServerUp, setIsServerUp] = useState(false);
  const [input, setInput] = useState("");
  const [showCarrot, setShowCarrot] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const textInputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    if (!inputFocus) {
      return setShowCarrot(false);
    }
    let showCurserTimer = setInterval(() => {
      setShowCarrot(!showCarrot);
    }, 500);

    return () => clearInterval(showCurserTimer);
  });

  useEffect(() => {
    if (input === "//logout") {
      SecureStore.deleteItemAsync("room_id");
      dispatch(updateRoomId(undefined));
      router.replace("/register");
    }
  }, [input]);

  const sendMessage = (e: any) => {
    e.preventDefault();
    try {
      if (!connected || !joined) {
        return;
      }
      socket.emit("news", {
        type: "message",
        message: input,
        room_id: AppState.room_id,
        name: AppState.user_name,
      });
      setInput("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={indexStyle.root}>
        <View style={indexStyle.body}>
          {!isServerUp ? (
            <LoadScreen serverHealthState={[isServerUp, setIsServerUp]} />
          ) : (
            <View>
              <MessagesScreen />
              <Pressable
                onPress={() => {
                  textInputRef?.current?.blur();
                  textInputRef?.current?.focus();
                }}
              >
                <Text style={indexStyle.userText}>
                  {AppState.user_name}@chatty${"  "}
                  <Text style={indexStyle.messageText}>{input}</Text>
                  <Text style={indexStyle.messageText}>
                    {showCarrot ? "_" : ""}
                  </Text>
                  <TextInput
                    ref={textInputRef}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                    style={indexStyle.messageInputText}
                    value={input}
                    onChangeText={setInput}
                    autoCapitalize={"none"}
                    keyboardType="default"
                    returnKeyType="send"
                    onSubmitEditing={(e: any) => sendMessage(e)}
                    autoFocus={true}
                    autoCorrect={false}
                    blurOnSubmit={false}
                  />
                </Text>
              </Pressable>
              <TouchableHighlight
                style={indexStyle.musicButton}
                onPress={() => dispatch(updateShowPlayer(true))}
              >
                <FontAwesome name="headphones" color={"#000"} size={45} />
              </TouchableHighlight>
            </View>
          )}
        </View>

        <Music />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default index;
