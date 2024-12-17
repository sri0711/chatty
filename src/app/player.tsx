import { View, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/src/constants/interfaces";
import {
  updateBufferedState,
  updateIsPlaying,
  updateTotalTime,
  updateCurrentTime,
} from "@/src/redux/reducers/player";

const styles = StyleSheet.create({
  root: {
    height: 0,
    width: 0,
  },
});

enum playerEvents {
  unstarted = "unstarted",
  "video_cued" = "video cued",
  buffering = "buffering",
  playing = "playing",
  paused = "paused",
  ended = "ended",
}

const Player = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: State) => state.player);
  const appState = useSelector((state: State) => state.chatty_app_state);
  const queueState = useSelector((state: State) => state.queue_list);
  const { socket } = useSelector((state: State) => state.socket);
  const playerRef = useRef<YoutubeIframeRef>(null);

  useEffect(() => {
    let updateTimeTrackDelay = setInterval(() => {
      if (player.isPlaying) {
        playerRef.current?.getCurrentTime().then((duration: number) => {
          dispatch(updateCurrentTime(duration));
        });
      }
    }, 500);
    return () => clearInterval(updateTimeTrackDelay);
  }, [player.isPlaying]);

  useEffect(() => {
    playerRef.current?.seekTo(player.timer.seek_time, true);
  }, [player.timer.seek_time]);

  const playPause = (action: boolean) => {
    if (
      player.current_song_details.track_id === "" ||
      player.current_song_details.track_id == null
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
    let time = (seekedTime[0] / 100) * player.timer.total_time;
    socket.emit("music", {
      room_id: appState.room_id,
      type: "seekTo",
      time: time,
    });
  };

  const onChangeState = (event: playerEvents) => {
    console.log("🚀 ~ onChangeState ~ event:", event);
    if (event === playerEvents.playing) {
      playerRef.current?.getDuration().then((duration: number) => {
        dispatch(updateTotalTime(duration));
      });
      dispatch(updateBufferedState(true));
    }
    if (event === playerEvents.paused) {
      dispatch(updateIsPlaying(false));
    }
    if (event === playerEvents.unstarted) {
      dispatch(updateIsPlaying(true));
    }
    if (event === playerEvents.ended) {
      if (queueState.length === 0) {
        playerSeek([0 / 0]);
        playPause(false);
        return;
      } else {
        let queueSongs = queueState;
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
    }
  };
  return (
    <View style={styles.root}>
      <YoutubePlayer
        ref={playerRef}
        height={0}
        width={0}
        play={player.isPlaying}
        videoId={player.current_song_details.track_id}
        onChangeState={(event: any) => onChangeState(event)}
      />
    </View>
  );
};

export default Player;
