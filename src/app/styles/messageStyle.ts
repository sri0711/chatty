import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  userText: {
    color: "#6EC207",
    fontSize: 20,
  },
  messageText: {
    color: "#fff",
    fontSize: 18,
  },
  replyMessageText: {
    color: "#fff",
    fontSize: 18,
    backgroundColor: "rgba(166, 174, 191, 0.2)",
    padding: 5,
  },
  flatList: {
    maxHeight: Dimensions.get("screen").height - 120,
  },
});
