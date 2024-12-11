import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    backgroundColor: "#000",
  },
  body: {
    minHeight: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
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
  musicButton: {
    backgroundColor: "rgba(109, 192, 7, 0.75)",
    position: "absolute",
    top: 40,
    right: 40,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
