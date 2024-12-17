import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "@/src/constants/interfaces";
import DraggableList from "react-native-draggable-flatlist";

const QueueList = () => {
  const queueList = useSelector((state: State) => state.queue_list);

  return (
    <View style={styles.container}>
      <DraggableList
        data={queueList}
        renderItem={(render) => (
          <Pressable style={styles.item} onLongPress={render.drag}>
            <Text>{render.item.track_name}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.track_id.toString()}
        onDragEnd={({ data }) => {
          console.log(data);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  item: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
});

export default QueueList;
