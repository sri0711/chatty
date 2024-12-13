import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "@/src/constants/interfaces";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Marquee } from "@animatereactnative/marquee";

const styles = StyleSheet.create({
  root: {
    height: "30%",
    backgroundColor: "#000",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 15,
  },
  albumArt: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  trackName: {
    color: "#fff",
    fontSize: 20,
    margin: 2,
  },
  groupButton: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  button: {
    backgroundColor: "#6EC207",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
    color: "#000",
  },
  timerSection: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  progressOuter: {
    width: "75%",
    borderColor: "#6EC207",
    borderWidth: 1,
    padding: 2,
    margin: 3,
  },
  progressInner: {
    width: "65%",
    height: 8,
    backgroundColor: "#6EC207",
  },
});
const PlayerInfo = () => {
  const appState = useSelector((state: State) => state.chatty_app_state);
  const playerState = useSelector((state: State) => state.player);

  return (
    <View style={styles.root}>
      <Image
        style={styles.albumArt}
        src={playerState?.current_song_details.image}
      />
      <Marquee speed={0.5} spacing={50}>
        <Text style={styles.trackName}>
          {playerState?.current_song_details?.track_name}
        </Text>
      </Marquee>
      <View style={styles.groupButton}>
        <Pressable style={styles.button}>
          <FontAwesome name="backward" style={styles.buttonText} />
        </Pressable>
        <Pressable style={styles.button}>
          <FontAwesome
            name={playerState.is_playing ? "pause" : "play"}
            style={styles.buttonText}
          />
        </Pressable>
        <Pressable style={styles.button}>
          <FontAwesome name="forward" style={styles.buttonText} />
        </Pressable>
      </View>
      <View style={styles.timerSection}>
        <Text style={styles.trackName}>01:00</Text>
        <View style={styles.progressOuter}>
          <View style={styles.progressInner}></View>
        </View>
        <Text style={styles.trackName}>3:55</Text>
      </View>
    </View>
  );
};

export default PlayerInfo;
