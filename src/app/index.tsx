import { useEffect, useRef, useState } from "react";
import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { State, Message } from "../constants/interfaces";
import { updateJoinRoomState } from "@/src/redux/reducers/socket";
import { addMessages } from "@/src/redux/reducers/messages";
import indexStyle from "./styles/indexStyle";
import LoadScreen from "./components/loadScreen";
import MessagesScreen from "./components/messagesScreen";

const index = () => {
  const dispatch = useDispatch();
  const AppState = useSelector((state: State) => state.chatty_app_state);
  const { socket, connected, joined } = useSelector(
    (state: State) => state.socket
  );

  // socket state event handler
  useEffect(() => {
    if (connected && !joined) {
      socket.emit("news", {
        type: "join",
        room_id: AppState.room_id,
      });
      dispatch(updateJoinRoomState(true));
      socket.on("message", (data: Message) => {
        dispatch(addMessages(data));
      });
    }
  }, [connected]);

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

  const sendMessage = () => {
    socket.emit("news", {
      type: "message",
      message: input,
      room_id: AppState.room_id,
      name: AppState.user_name,
    });
    setInput("");
  };

  return (
    <SafeAreaView style={indexStyle.root}>
      <View style={indexStyle.body}>
        {!isServerUp ? (
          <LoadScreen serverHealthState={[isServerUp, setIsServerUp]} />
        ) : (
          <>
            <MessagesScreen />
            <Pressable onPress={() => textInputRef?.current?.focus()}>
              <Text style={indexStyle.userText}>
                {AppState.user_name}@chatty${"  "}
                <Text style={indexStyle.messageText}>{input}</Text>
                <Text style={indexStyle.messageText}>
                  {showCarrot ? "_" : ""}
                </Text>
                <TextInput
                  ref={textInputRef}
                  onFocus={() => setInputFocus(true)}
                  onBlur={() => {
                    textInputRef.current?.focus();
                    setInputFocus(false);
                  }}
                  style={indexStyle.messageInputText}
                  value={input}
                  onChangeText={setInput}
                  autoFocus={true}
                  autoCapitalize={"none"}
                  keyboardType="default"
                  returnKeyType="send"
                  onSubmitEditing={sendMessage}
                />
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default index;
