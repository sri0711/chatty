import React, { useEffect, useRef } from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { State } from "../../constants/interfaces";
import messageStyle from "../styles/messageStyle";

const MessagesScreen = () => {
  const flatListRef = useRef<FlatList | null>(null);
  const messages = useSelector((state: State) => state.messages);
  useEffect(() => {
    let messageDelay = setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        animated: true,
        viewPosition: 1,
        index: messages.length - 1,
      });
    }, 500);
    return () => clearTimeout(messageDelay);
  }, [messages]);
  return (
    <View>
      <FlatList
        ref={flatListRef}
        style={messageStyle.flatList}
        data={messages}
        renderItem={({ item }) => (
          <View>
            <Text style={messageStyle.messageText}>
              <Text style={messageStyle.userText}>{item.name}@chatty$ </Text>
              {"  "}
              {item.message}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default MessagesScreen;
