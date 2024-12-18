import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    height: "100%",
    width: Dimensions.get("screen").width,
    backgroundColor: "#000",
  },
  closeButton: {
    width: Dimensions.get("screen").width,
    backgroundColor: "#6EC207",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 50,
    fontWeight: 600,
  },
});
