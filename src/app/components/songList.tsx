import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import SearchList from "@/src/app/components/searchList";
import QueueList from "./queueList";

const styles = StyleSheet.create({
  root: {
    height: "60%",
  },
  groupButton: {
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    backgroundColor: "white",
  },
  button: {
    height: 40,
    width: "50%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#6EC207",
    fontSize: 25,
    fontWeight: "500",
    textDecorationStyle: "solid",
    textDecorationColor: "#6EC207",
  },
});
const SongList = () => {
  const [showPlaylist, setShowPlaylist] = useState(true);

  return (
    <View style={styles.root}>
      <View style={styles.groupButton}>
        <Pressable style={styles.button} onPress={() => setShowPlaylist(true)}>
          <Text
            style={[
              styles.buttonText,
              showPlaylist ? { textDecorationLine: "underline" } : {},
            ]}
          >
            Discover
          </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setShowPlaylist(false)}>
          <Text
            style={[
              styles.buttonText,
              !showPlaylist ? { textDecorationLine: "underline" } : {},
            ]}
          >
            Queue
          </Text>
        </Pressable>
      </View>
      {showPlaylist ? <SearchList /> : <QueueList />}
    </View>
  );
};

export default SongList;
