export interface State {
  play_list: Playlist[];
  chatty_app_state: AppState;
  messages: Message[];
  player: Player;
  socket: any;
}

interface AppState {
  user_name: string;
  room_id: string;
  show_player: boolean;
  song_search: string;
}
export interface Message {
  message: string;
  name: string;
}

export interface Playlist {
  id: string;
  thumbnail: thumbnail;
  title: string;
  duration_formatted: string;
}

interface thumbnail {
  url: string;
}

interface Player {
  buffered: boolean;
  current_song_details: {
    image: string;
    track_name: string;
    track_id: string;
  };
  isPlaying: boolean;
  timer: {
    total_time: number;
    current_time: number;
  };
}
