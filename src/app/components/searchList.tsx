import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { Playlist, State } from "@/src/constants/interfaces";
import youtubeUtils from "@/src/helpers/youtube";
import { updateList } from "@/src/redux/reducers/playlist";
import { updateSongDetails } from "@/src/redux/reducers/player";

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
  },
  searchBar: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  searchIcon: {
    color: "#fff",
    fontSize: 25,
    padding: 5,
  },
  searchInput: {
    width: "85%",
    color: "#6EC207",
    fontSize: 25,
  },
  songLists: {
    maxHeight: "85%",
    marginHorizontal: 15,
    margin: 5,
  },
  listItem: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 3,
  },
  songItem: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  songIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  songTitleBlock: {
    color: "#fff",
    fontSize: 15,
    width: "80%",
  },
  songTitle: {
    color: "#fff",
    fontSize: 15,
  },
  options: {
    color: "#6EC207",
    fontSize: 25,
  },
});

const SearchList = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const play_list = useSelector((state: State) => state.play_list);
  const appState = useSelector((state: State) => state.chatty_app_state);
  const { socket } = useSelector((state: State) => state.socket);
  useEffect(() => {
    youtubeUtils.search_song("kangal neeyeh").then((data) => {
      dispatch(updateList(data.data));
    });
  }, []);

  useEffect(() => {
    youtubeUtils.search_song(appState.song_search).then((data) => {
      dispatch(updateList(data.data));
    });
  }, [appState.song_search]);

  const playSong = (item: Playlist) => {
    socket.emit("music", {
      room_id: appState.room_id,
      track_id: item.id,
      image: item.thumbnail.url,
      track_name: item.title,
      type: "song",
    });
  };
  const searchSong = (keyWord: string) => {
    if (keyWord.length <= 1) return;
    socket.emit("music", {
      room_id: appState.room_id,
      type: "search_song",
      search_string: keyWord,
    });
  };
  return (
    <View style={styles.root}>
      <View style={styles.searchBar}>
        <FontAwesome name="search" style={styles.searchIcon} />
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.searchInput}
          onSubmitEditing={() => searchSong(input)}
          keyboardType="default"
          returnKeyType="search"
        />
      </View>
      <FlatList
        style={styles.songLists}
        data={play_list}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Pressable style={styles.songItem} onPress={() => playSong(item)}>
              <Image src={item.thumbnail.url} style={styles.songIcon} />
              <View style={styles.songTitleBlock}>
                <Text style={styles.songTitle}>
                  {item.title.split("").splice(0, 35).join("")}
                  {item.title.length > 35 ? "..." : ""}
                </Text>
                <Text style={styles.songTitle}> {item.duration_formatted}</Text>
              </View>
            </Pressable>
            <Pressable>
              <FontAwesome style={styles.options} name="plus" />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default SearchList;
