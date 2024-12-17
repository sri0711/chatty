import {
  updateSongDetails,
  updateIsPlaying,
  updateSeek,
} from "@/src/redux/reducers/player";
import { addSongQueue, updateList } from "@/src/redux/reducers/queue";
import { updateSongSearch } from "@/src/redux/reducers/appState";

interface SongDetails {
  type: string;
  room_id: string;
  image: string;
  track_name: string;
  track_id: string;
  search_string: string;
  action: string;
  time: number;
  queueList: object[];
}
export default (data: SongDetails, dispatch: any) => {
  if (data.type === "song") {
    console.log(data);
    dispatch(updateIsPlaying(false));
    dispatch(
      updateSongDetails({
        image: data.image,
        track_name: data.track_name,
        track_id: data.track_id,
      })
    );
    dispatch(updateIsPlaying(true));
  }
  if (data.type === "search_song") {
    dispatch(updateSongSearch(data.search_string));
  }
  if (data.type === "playPause") {
    dispatch(updateIsPlaying(data?.action));
  }
  if (data.type === "seekTo") {
    dispatch(updateSeek(data?.time));
  }

  if (data.type === "queue") {
    if (data.action === "add") {
      dispatch(
        addSongQueue({
          image: data.image,
          track_id: data.track_id,
          track_name: data.track_name,
        })
      );
    }
    if (data.action === "updateQueue") {
      dispatch(updateList(data?.queueList));
    }
  }
};
