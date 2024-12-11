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
  title: {
    color: "#6EC207",
    marginTop: 40,
    margin: 30,
    fontSize: 50,
    fontWeight: 600,
  },
  slogan: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 80,
  },
  haveLoveId: {
    color: "#fff",
    fontSize: 20,
    margin: 30,
  },
  TextInputTitle: {
    color: "#fff",
    fontSize: 20,
    height: 35,
    paddingBottom: 5,
    margin: 10,
  },
  TextField: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    width: 200,
    height: 35,
    borderWidth: 1,
    borderColor: "#fff",
  },
  button: {
    backgroundColor: "#6EC207",
    margin: 30,
    height: 40,
    width: 120,
    fontSize: 30,
    textAlign: "center",
    borderRadius: 10,
    fontWeight: 500,
  },
});
