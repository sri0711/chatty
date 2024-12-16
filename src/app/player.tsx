import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
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
  "video_cued" = "video cued",
  buffering = "buffering",
  playing = "playing",
  paused = "paused",
  ended = "ended",
}

const Player = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: State) => state.player);

  useEffect(() => {}, [player.is_playing]);

  const onChangeState = (event: playerEvents) => {
    console.log("🚀 ~ onChangeState ~ event:", event);
    if (event === playerEvents.playing) {
      dispatch(updateBufferedState(true));
      dispatch(updateIsPlaying(false));
    }
    if (event === playerEvents.video_cued) {
      dispatch(updateIsPlaying(false));
      setTimeout(() => {
        dispatch(updateIsPlaying(true));
      }, 1000);
    }
  };
  return (
    <View style={styles.root}>
      <YoutubePlayer
        height={0}
        width={0}
        play={true}
        videoId={player.current_song_details.track_id}
        onChangeState={(event: any) => onChangeState(event)}
      />
    </View>
  );
};

export default Player;
