export interface State {
  play_list: Playlist[];
  chatty_app_state: AppState;
  messages: object[];
  player: Player;
}

interface AppState {
  user_name: string;
  room_id: string;
  show_player: boolean;
}

export interface Playlist {
  id: string;
  thumbnail: thumbnail;
  title: string;
}

interface thumbnail {
  url: string;
}

interface Player {
  buffered: boolean;
  current_song_details: {
    image: string;
    track_name: string;
  };
  is_playing: boolean;
}
