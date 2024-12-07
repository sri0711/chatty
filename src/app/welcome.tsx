import { View, Text, StatusBar } from "react-native";
import React, { useEffect } from "react";
import applications from "../constants/applications";
import { Link } from "expo-router";

const welcome = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={applications.Theme.body.backgroundColor}
      />
      <View style={applications.Theme.body}>
        <View style={[applications.Theme.center]}>
          <Text
            style={[
              applications.Theme.title_font,
              applications.Theme.text_align_center,
              applications.Theme.app_info_title,
            ]}
          >
            Chatty
          </Text>
          <Text
            style={[
              applications.Theme.title_font,
              applications.Theme.text_align_center,
              applications.Theme.font_color_gray,
            ]}
          >
            Personal One to One vibe with message
          </Text>
          <Link href={"/register"} style={{ margin: 80, marginTop: 180 }}>
            <Text
              style={[
                applications.Theme.title_font,
                applications.Theme.text_align_center,
              ]}
            >
              Start
            </Text>
          </Link>
        </View>
      </View>
    </>
  );
};

export default welcome;
