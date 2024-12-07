import { StyleSheet } from "react-native";

const Theme = StyleSheet.create({
  body: {
    backgroundColor: "#000",
    height: "100%",
  },
  app_info_title: {
    fontSize: 38,
  },
  font_color_gray: {
    color: "#A6AEBF",
  },
  title_font: {
    fontSize: 18,
    color: "#fff",
  },
  margin: {
    margin: 10,
  },
  text_align_center: {
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  inline_center: {
    flexDirection: "row",
    margin: 10,
  },
  from_bottom: {
    flex: 1,
    justifyContent: "flex-end",
    alignContent: "flex-end",
  },
  float_button: {
    position: "absolute",
    height: 50,
    width: 50,
    top: 50,
    right: 50,
    borderRadius: 50,
    backgroundColor: "#6EC207",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default { Theme };
