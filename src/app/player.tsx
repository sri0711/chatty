import { View, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
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

  const onChangeState = (event: playerEvents) => {
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
