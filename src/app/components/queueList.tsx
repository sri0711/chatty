import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "@/src/constants/interfaces";
import DraggableList from "react-native-draggable-flatlist";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const QueueList = () => {
  const queueList = useSelector((state: State) => state.queue_list);
  const appState = useSelector((state: State) => state.chatty_app_state);
  const { socket } = useSelector((state: State) => state.socket);

  const playSong = (item: any) => {
    socket.emit("music", {
      room_id: appState.room_id,
      track_id: item.track_id,
      image: item.image,
      track_name: item.track_name,
      type: "song",
    });
  };

  const queueUpdate = (data: any) => {
    socket.emit("music", {
      room_id: appState.room_id,
      type: "queue",
      action: "updateQueue",
      queueList: data.data,
    });
  };
  return (
    <GestureHandlerRootView style={styles.root}>
      <DraggableList
        data={queueList}
        renderItem={(render: any) => (
          <View
            style={[
              styles.listItem,
              { backgroundColor: render.isActive ? "#6EC207" : "#000" },
            ]}
          >
            <Pressable
              style={styles.songItem}
              onPress={() => playSong(render.item)}
            >
              <Image src={render.item.image} style={styles.songIcon} />
              <View style={styles.songTitleBlock}>
                <Text style={styles.songTitle}>
                  {render.item.track_name.split("").splice(0, 35).join("")}
                  {render.item.track_name.length > 35 ? "..." : ""}
                </Text>
              </View>
            </Pressable>
            <View>
              <FontAwesome
                onLongPress={render.drag}
                delayLongPress={400}
                style={styles.options}
                name="bars"
              />
            </View>
          </View>
        )}
        keyExtractor={(item: any) => item.track_id}
        onDragEnd={queueUpdate}
      />
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  root: {
    width: "100%",
    maxHeight: "85%",
    minHeight: "60%",
    margin: 5,
  },
  songLists: {
    maxHeight: "85%",
    marginHorizontal: 15,
    margin: 5,
  },
  listItem: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 3,
  },
  songItem: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  songIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  songTitleBlock: {
    color: "#fff",
    fontSize: 15,
    width: "80%",
  },
  songTitle: {
    color: "#fff",
    fontSize: 15,
  },
  options: {
    color: "#6EC207",
    fontSize: 25,
    marginHorizontal: 20,
  },
});

export default QueueList;
