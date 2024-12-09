import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  root: {
    backgroundColor: "#000",
  },
  body: {
    minHeight: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  icon: {
    height: 200,
    width: 200,
    borderRadius: 25,
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  title: {
    color: "#6EC207",
    margin: 50,
    fontSize: 50,
    fontWeight: 600,
  },
  bottomText: {
    color: "#fff",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#6EC207",
    margin: 30,
    height: 50,
    width: 100,
    fontSize: 35,
    padding: 5,
    textAlign: "center",
    borderRadius: 10,
  },
});
