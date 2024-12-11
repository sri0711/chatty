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
  },
  title: {
    color: "#6EC207",
    marginTop: 40,
    margin: 30,
    fontSize: 50,
    fontWeight: 600,
  },
  versionText: {
    color: "#A6AEBF",
    marginBottom: 20,
  },
  bottomText: {
    color: "#fff",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#6EC207",
    margin: 30,
    height: 40,
    width: 100,
    fontSize: 30,
    textAlign: "center",
    borderRadius: 10,
    fontWeight: 500,
  },
});
