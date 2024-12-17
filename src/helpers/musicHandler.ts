import {
  updateSongDetails,
  updateIsPlaying,
} from "@/src/redux/reducers/player";
import { updateSongSearch } from "@/src/redux/reducers/appState";

interface SongDetails {
  type: string;
  room_id: string;
  image: string;
  track_name: string;
  track_id: string;
  search_string: string;
  action: string;
}
export default (data: SongDetails, dispatch: any) => {
  if (data.type === "song") {
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
};
