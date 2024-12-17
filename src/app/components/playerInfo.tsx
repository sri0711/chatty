import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "@/src/constants/interfaces";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Marquee } from "@animatereactnative/marquee";
import { Slider } from "@miblanchard/react-native-slider";

const PlayerInfo = () => {
  const appState = useSelector((state: State) => state.chatty_app_state);
  const playerState = useSelector((state: State) => state.player);
  const { socket } = useSelector((state: State) => state.socket);
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    if (playerState.isPlaying) {
      let percentage =
        (playerState.timer.current_time / playerState.timer.total_time) * 100;
      console.log(percentage);
      setCurrentPercentage(Math.round(percentage) || 0);
    }
  }, [playerState.timer.current_time]);
  const formatTime = (seconds: any) => {
    seconds = parseFloat(seconds);
    const minutes = Math.floor((seconds % 3600) / 60) || 0;
    const remainingSeconds = seconds % 60 || 0;

    // Format the result as hh:mm:ss
    const formattedTime = [
      minutes.toString().padStart(2, "0"),
      Math.round(remainingSeconds).toString().padStart(2, "0"),
    ].join(":");

    return formattedTime;
  };

  const playPause = () => {
    socket.emit("music", {
      room_id: appState.room_id,
      type: "playPause",
      action: !playerState.isPlaying,
    });
  };

  const playerSeek = (seekedTime: number[]) => {
    socket.emit("music", {
      room_id: appState.room_id,
      type: "seekTo",
      time: seekedTime[0],
    });
  };

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
        <Pressable style={styles.button} onPress={playPause}>
          <FontAwesome
            name={playerState.isPlaying ? "pause" : "play"}
            style={styles.buttonText}
          />
        </Pressable>
        <Pressable style={styles.button}>
          <FontAwesome name="forward" style={styles.buttonText} />
        </Pressable>
      </View>
      <View style={styles.timerSection}>
        <Text style={styles.trackName}>
          {formatTime(playerState.timer.current_time)}
        </Text>
        <View style={styles.progressOuter}>
          <Slider
            animateTransitions
            maximumValue={100}
            minimumValue={0}
            value={currentPercentage}
            minimumTrackStyle={styles.progressedTrack}
            thumbStyle={styles.thumb}
            onSlidingComplete={playerSeek}
          />
        </View>
        <Text style={styles.trackName}>
          {formatTime(playerState.timer.total_time)}
        </Text>
      </View>
    </View>
  );
};

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
    width: "70%",
    borderColor: "#6EC207",
    padding: 2,
    margin: 3,
  },
  progressedTrack: {
    backgroundColor: "#6EC207",
  },
  thumb: {
    backgroundColor: "#000",
    borderColor: "#6EC207",
    borderRadius: 30 / 2,
    borderWidth: 2,
    height: 10,
    width: 20,
  },
});

export default PlayerInfo;
