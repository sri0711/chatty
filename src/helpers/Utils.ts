import { Platform, ToastAndroid, Alert } from "react-native";

export default {
  showToast: (message: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert("error", message, [{ text: "reconnect" }]);
    }
  },
};
