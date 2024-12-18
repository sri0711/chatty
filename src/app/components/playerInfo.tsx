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
  const queueState = useSelector((state: State) => state.queue_list);
  const { socket } = useSelector((state: State) => state.socket);
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    if (playerState.isPlaying) {
      let percentage =
        (playerState.timer.current_time / playerState.timer.total_time) * 100;
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

  const playPause = (action: boolean) => {
    if (
      playerState.current_song_details.track_id === "" ||
      playerState.current_song_details.track_id == null
    ) {
      let queueSongs = queueState;
      if (queueSongs.length >= 1) {
        let currentSong = queueSongs[0];
        let data = queueSongs.toSpliced(0, 1);

        socket.emit("music", {
          room_id: appState.room_id,
          track_id: currentSong.track_id,
          image: currentSong.image,
          track_name: currentSong.track_name,
          type: "song",
        });
        socket.emit("music", {
          room_id: appState.room_id,
          type: "queue",
          action: "updateQueue",
          queueList: data,
        });
      }
      return;
    }
    socket.emit("music", {
      room_id: appState.room_id,
      type: "playPause",
      action: action,
    });
  };

  const playerSeek = (seekedTime: number[]) => {
    try {
      let time = (seekedTime[0] / 100) * playerState.timer.total_time;
      socket.emit("music", {
        room_id: appState.room_id,
        type: "seekTo",
        time: time,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const nextSong = () => {
    let queueSongs = queueState;
    if (queueSongs.length === 0) {
      playerSeek([0 / 0]);
      playPause(false);
      return;
    }
    let currentSong = queueSongs[0];
    let data = queueSongs.toSpliced(0, 1);

    socket.emit("music", {
      room_id: appState.room_id,
      track_id: currentSong.track_id,
      image: currentSong.image,
      track_name: currentSong.track_name,
      type: "song",
    });
    socket.emit("music", {
      room_id: appState.room_id,
      type: "queue",
      action: "updateQueue",
      queueList: data,
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
        <Pressable style={styles.button} onPress={() => playerSeek([0.0])}>
          <FontAwesome name="backward" style={styles.buttonText} />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => playPause(!playerState.isPlaying)}
        >
          <FontAwesome
            name={playerState.isPlaying ? "pause" : "play"}
            style={styles.buttonText}
          />
        </Pressable>
        <Pressable style={styles.button} onPress={nextSong}>
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
