import { Modal, Text, TouchableHighlight } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { State } from "@/src/constants/interfaces";
import PlayerInfo from "@/src/app/components/playerInfo";
import musicStyle from "@/src/app/styles/musicStyle";
import { updateShowPlayer } from "@/src/redux/reducers/appState";
import SongList from "@/src/app/components/songList";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Music = ({}) => {
  const dispatch = useDispatch();
  const appState = useSelector((state: State) => state.chatty_app_state);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={musicStyle.root}>
        <Modal
          animationType="slide"
          visible={appState.show_player}
          transparent={true}
        >
          <PlayerInfo />
          <SongList />
          <TouchableHighlight
            style={musicStyle.closeButton}
            onPress={() => dispatch(updateShowPlayer(false))}
          >
            <Text style={musicStyle.closeButtonText}>Close</Text>
          </TouchableHighlight>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Music;
