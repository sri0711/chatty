import { View, StyleSheet } from "react-native";
import React from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/src/constants/interfaces";
import {
  updateBufferedState,
  updateIsPlaying,
} from "@/src/redux/reducers/player";

const styles = StyleSheet.create({
  root: {
    height: 0,
    width: 0,
  },
});

enum playerEvents {
  unstarted = "unstarted",
  "video cue" = "video cue",
  buffering = "buffering",
  playing = "playing",
  paused = "paused",
  ended = "ended",
}

const Player = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: State) => state.player);

  const onChangeState = (event: playerEvents) => {
    if (event === playerEvents.playing) {
      dispatch(updateBufferedState(true));
      dispatch(updateIsPlaying(false));
    }
  };
  return (
    <View style={styles.root}>
      <YoutubePlayer
        height={0}
        play={player.is_playing}
        videoId={player.current_song_details.track_id}
        onChangeState={(event: any) => onChangeState(event)}
      />
    </View>
  );
};

export default Player;
