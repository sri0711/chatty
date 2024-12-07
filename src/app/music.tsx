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

const Music = ({
  modelStates,
  songsList,
  trackIdState,
  playingState,
  toggleState,
}) => {
  const [modelShow, setModelShow] = modelStates;
  const [songs, setSongs] = songsList;
  const [trackId, setTrackId] = trackIdState;
  const [input, setInput] = useState("hai");
  const [playing, setPlaying] = playingState;
  const [toggle, setToggle] = toggleState;
  useEffect(() => {
    youtubeUtils
      .search_song("kangal neeyeh")
      .then((data) => setSongs(data.data));
  }, []);

  const handleSubmit = () => {
    youtubeUtils.search_song(input).then((data) => setSongs(data.data));
  };
  return (
    <View>
      <Modal
        animationType="slide"
        visible={modelShow}
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
            src={
              trackId !== ""
                ? songs.find((song: Object) => song.id == trackId)?.thumbnail
                    ?.url
                : "https://cdn.dribbble.com/users/3547568/screenshots/14395014/music_jpeg_4x.jpg"
            }
            style={{
              height: 150,
              width: 150,
              borderRadius: 150,
              padding: 10,
              margin: 10,
            }}
          />
          <Pressable
            onPress={() => {
              setPlaying(!playing), setToggle(true);
            }}
          >
            <FontAwesome
              name={playing ? "pause" : "play"}
              size={25}
              color={"#FFF"}
            />
          </Pressable>
        </View>
        <TextInput
          onChangeText={setInput}
          placeholder="search song..."
          placeholderTextColor={"#6EC207"}
          style={{ color: "#6EC207", fontSize: 25 }}
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
            data={songs}
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
            setModelShow(false);
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
