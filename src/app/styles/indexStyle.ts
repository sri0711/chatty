import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    backgroundColor: "#000",
  },
  body: {
    minHeight: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#000",
    paddingHorizontal: 5,
  },
  userText: {
    color: "#6EC207",
    fontSize: 20,
  },
  messageText: {
    color: "#fff",
  },
  messageInputText: {
    height: 0,
    width: 0,
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
