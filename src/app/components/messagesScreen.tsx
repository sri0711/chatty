import React, { useEffect, useRef } from "react";
import { View, Text, FlatList, Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/src/constants/interfaces";
import messageStyle from "@/src/app/styles/messageStyle";
import { PanGestureHandler } from "react-native-gesture-handler";
import { updateReplyMessage } from "@/src/redux/reducers/appState";

const MessagesScreen = () => {
  const dispatch = useDispatch();
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

  // for swipe action
  const translateXValues = useRef<{ [key: number]: Animated.Value }>({});

  const onGestureEvent = (index: number) => {
    return Animated.event(
      [{ nativeEvent: { translationX: translateXValues.current[index] } }],
      {
        useNativeDriver: true,
      }
    );
  };

  const actionForReply = (event: any, index: number, data: any) => {
    const { translationX, state } = event.nativeEvent;

    if (state === 5) {
      // Gesture ended
      if (translationX > 100) {
        dispatch(updateReplyMessage(data));
      }

      // Reset position after swipe action
      Animated.spring(translateXValues.current[index], {
        toValue: 0, // Reset to initial position
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <View>
      <FlatList
        ref={flatListRef}
        style={messageStyle.flatList}
        data={messages}
        renderItem={({ item, index }) => {
          if (!translateXValues.current[index]) {
            translateXValues.current[index] = new Animated.Value(0);
          }

          return (
            <View>
              <PanGestureHandler
                onGestureEvent={onGestureEvent(index)}
                onHandlerStateChange={(event) =>
                  actionForReply(event, index, item)
                }
              >
                <Animated.View
                  style={{
                    transform: [
                      { translateX: translateXValues.current[index] },
                    ],
                  }}
                >
                  {item?.reply_message?.message_id ? (
                    <Text style={messageStyle.replyMessageText}>
                      <Text style={messageStyle.userText}>
                        {"  "}- Reply~{item?.reply_message?.message_from}@chatty
                      </Text>{" "}
                      {item?.reply_message?.message}
                    </Text>
                  ) : (
                    <></>
                  )}
                  <Text style={messageStyle.messageText}>
                    <Text style={messageStyle.userText}>
                      {item.name}@chatty${" "}
                    </Text>
                    {"  "}
                    {item.message}
                  </Text>
                </Animated.View>
              </PanGestureHandler>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MessagesScreen;
