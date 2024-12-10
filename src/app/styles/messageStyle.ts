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
  flatList: {
    maxHeight: Dimensions.get("screen").height - 120,
  },
});
