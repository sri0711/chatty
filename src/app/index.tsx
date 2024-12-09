import {
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import applications from "../constants/applications";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { io } from "socket.io-client";
import config from "@/src/helpers/config";
import Music from "./music";
import { FontAwesome } from "@expo/vector-icons";
import AudioPlayer from "react-native-youtube-iframe";
import { useSelector, useDispatch } from "react-redux";
import { addMessages } from "../redux/reducers/messages";
import { State } from "../constants/interfaces";

const index = () => {
  const socketUrl = config.server_url;
  const socket = io(socketUrl, {
    reconnection: true,
    rememberUpgrade: true,
    autoConnect: true,
  });
  const dispatch = useDispatch();
  const message = useSelector((state: State) => state.messages);
  const AppState = useSelector((state: State) => state.chatty_app_state);

  const [currentInput, setCurrentInput] = useState("");
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("user");
  const [isServerAlive, setIsServerAlive] = useState(false);
  const [joined, setJoined] = useState(false);
  const [iDonWait, setIsDonWait] = useState(true);
  const flatListRef = useRef(null);
  const [modelShow, setModelShow] = useState(true);
  const [songs, setSongs] = useState([]);
  const [trackId, setTrackId] = useState("");
  //  for player settings
  const [playing, setPlaying] = useState(false);
  const [isBuffered, setIsBuffered] = useState(false);
  const [toggle, setToggle] = useState(false);

  // message update area
  socket.on("message", (data) => {
    if (data.type === "message") {
      dispatch(addMessages(data));
    }
  });

  // health check for server
  useEffect(() => {
    let healthCheck = async () => {
      let response = await fetch(socketUrl);
      let result = await response.json();
      if (result.status) {
        setIsServerAlive(true);
      } else {
        healthCheck();
      }
    };
    healthCheck();
  }, []);

  // check room id for server
  useEffect(() => {
    const checkRoomId = () => {
      let room_id = AppState.room_id;
      let name_input = AppState.user_name;
      if (!room_id) {
        const timer = setTimeout(() => {
          router.replace("/welcome"); // Use `push` instead of `navigate` for route transition
        }, 2000);
        return clearTimeout(timer);
      } else {
        setRoomId(room_id);
        setName(name_input || "");
        socket.connect(); // Ensure socket is connected only once
        socket.emit("news", { type: "join", room_id: roomId });
        setJoined(true);
      }
    };
    checkRoomId();
    setTimeout(() => {
      if (!joined) {
        setIsDonWait(false);
      }
    }, 10_000);
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [roomId]);

  // handle message
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [message]);

  useEffect(() => {
    if (currentInput === "") return;
    if (currentInput === "//logout") {
      SecureStore.deleteItemAsync("room_id");
      SecureStore.deleteItemAsync("name");
      router.replace("/welcome");
    }
  }, [currentInput]);

  // pass the message to others
  const handleChange = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    e.preventDefault();
    socket.emit("news", {
      type: "message",
      room_id: roomId,
      message: currentInput,
      name: name,
    });
    setCurrentInput("");
  };

  socket.on("admin", (data) => {
    if (data.message === "logout") {
      SecureStore.deleteItemAsync("room_id");
      SecureStore.deleteItemAsync("name");
      router.replace("/welcome");
    }
  });

  /* 
  we need to move from here
  */
  // music handling

  // handleTrackIdUpdate
  useEffect(() => {
    if (trackId === "") return;
    setIsBuffered(false);
    socket.emit("music", {
      room_id: roomId,
      url: trackId,
      action: "play",
    });
  }, [trackId]);

  useEffect(() => {
    if (toggle) {
      if (playing) {
        socket.emit("music", {
          room_id: roomId,
          url: trackId,
          action: "ready",
        });
        setToggle(false);
      } else {
        socket.emit("music", {
          room_id: roomId,
          url: trackId,
          action: "pause",
        });
        setToggle(false);
      }
    }
  }, [playing]);

  socket.on("music", (data) => {
    if (data.action === "play") {
      setTrackId(data.url);
      setPlaying(true);
    }
    if (data.action === "pause") {
      setPlaying(false);
    }
    if (data.action === "ready" && isBuffered) {
      setPlaying(true);
    }
  });

  const playerStateHandler = (event) => {
    if (event === "playing" && !isBuffered) {
      setPlaying(false);
      socket.emit("music", {
        room_id: roomId,
        url: trackId,
        action: "ready",
      });
      setIsBuffered(true);
    }
    if (event === "ended") {
      setPlaying(false);
      setIsBuffered(false);
    }
  };

  return (
    <>
      {isServerAlive ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor={applications.Theme.body.backgroundColor}
          />
          <View style={[applications.Theme.body, { padding: 10 }]}>
            <View style={[applications.Theme.from_bottom]}>
              <FlatList
                ref={flatListRef}
                data={message}
                renderItem={({ item }) => (
                  <View style={{ marginVertical: 3 }}>
                    <Text style={{ color: "#6EC207" }}>
                      {item?.name}@chatty $
                    </Text>
                    <Text style={{ color: "#FFF" }}>{item?.message}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              {joined ? (
                <>
                  <Text style={{ color: "#6EC207" }}>{name}@chatty $</Text>
                  <TextInput
                    style={{
                      fontWeight: 900,
                      color: "#fff",
                    }}
                    onChangeText={setCurrentInput}
                    onSubmitEditing={(e) => handleChange(e)}
                    returnKeyType="send"
                    value={currentInput}
                    keyboardType="default"
                    blurOnSubmit={false}
                  ></TextInput>
                </>
              ) : (
                <View>
                  <Text style={{ color: "#6EC207" }}>
                    Not Connected... reconnecting. please wait.....
                    {iDonWait ? (
                      <></>
                    ) : (
                      <Pressable onPress={() => setCurrentInput("//logout")}>
                        <Text style={applications.Theme.title_font}>
                          Login again
                        </Text>
                      </Pressable>
                    )}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <Music
            modelStates={[modelShow, setModelShow]}
            songsList={[songs, setSongs]}
            trackIdState={[trackId, setTrackId]}
            playingState={[playing, setPlaying]}
            toggleState={[toggle, setToggle]}
          />
          <Pressable
            style={applications.Theme.float_button}
            onPress={() => setModelShow(true)}
          >
            <FontAwesome name="headphones" size={35} color={"#000"} />
          </Pressable>
          <AudioPlayer
            height={0}
            videoId={trackId}
            play={playing}
            onChangeState={playerStateHandler}
          />
        </KeyboardAvoidingView>
      ) : (
        <View style={[applications.Theme.center, applications.Theme.body]}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text>Encrypting the chat...</Text>
        </View>
      )}
    </>
  );
};

export default index;
