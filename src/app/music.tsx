import {
  View,
  Text,
  Modal,
  Pressable,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import youtubeUtils from "../helpers/youtube";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { updateList } from "../redux/reducers/playlist";
import { updateShowPlayer } from "../redux/reducers/appState";
import { State } from "../constants/interfaces";

const Music = ({ trackIdState, playingState, toggleState }) => {
  const dispatch = useDispatch();
  const play_list = useSelector((state: State) => state.play_list);
  const appState = useSelector((state: State) => state.chatty_app_state);
  const playerState = useSelector((state: State) => state.player);

  const [trackId, setTrackId] = trackIdState;
  const [input, setInput] = useState(appState.song_search);
  const [playing, setPlaying] = playingState;
  const [toggle, setToggle] = toggleState;
  useEffect(() => {
    youtubeUtils.search_song("kangal neeyeh").then((data) => {
      dispatch(updateList(data.data));
    });
  }, []);

  const handleSubmit = () => {
    youtubeUtils
      .search_song(input)
      .then((data) => dispatch(updateList(data.data)));
  };
  return (
    <View>
      <Modal
        animationType="slide"
        visible={appState?.show_player}
        hardwareAccelerated={true}
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
          }}
        >
          <Image
            src={playerState.current_song_details.image}
            style={{
              height: 150,
              width: 150,
              borderRadius: 150,
              padding: 10,
              margin: 10,
            }}
          />
          <Text style={{ color: "#fff", fontSize: 15, marginBottom: 5 }}>
            {playerState.current_song_details.track_name}
          </Text>
          <Pressable
            onPress={() => {
              setPlaying(!playing), setToggle(true);
            }}
          >
            <FontAwesome
              name={playerState.is_playing ? "pause" : "play"}
              size={25}
              color={"#FFF"}
            />
          </Pressable>
        </View>
        <TextInput
          onChangeText={setInput}
          placeholder="search song..."
          placeholderTextColor={"#6EC207"}
          style={{ color: "#6EC207", fontSize: 25, backgroundColor: "#000" }}
          keyboardType={"default"}
          returnKeyLabel={"search"}
          autoCapitalize={"none"}
          onSubmitEditing={handleSubmit}
        >
          {input}
        </TextInput>
        <View
          style={[
            {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: 30,
            },
          ]}
        >
          <FlatList
            style={{ height: "70%" }}
            data={play_list}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setTrackId(item.id)}
                style={{ flex: 1, flexDirection: "row", marginVertical: 5 }}
              >
                <Image
                  src={item.thumbnail.url}
                  style={{ height: 80, width: 80 }}
                />
                <Text
                  style={{ color: "#fff", width: "80%", marginHorizontal: 10 }}
                >
                  {item.title}
                </Text>
              </Pressable>
            )}
          ></FlatList>
        </View>
        <Pressable
          onPress={() => {
            dispatch(updateShowPlayer());
          }}
          style={{
            position: "absolute",
            backgroundColor: "#000",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        >
          <Text
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              color: "#000",
              backgroundColor: "#6EC207",
              height: 60,
              fontSize: 30,
              textAlign: "center",
              fontWeight: "800",
            }}
          >
            Close
          </Text>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Music;
