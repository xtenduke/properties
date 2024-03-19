import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const SplashScreen = () => (
  <View style={styles.container}>
    <StatusBar style="dark" />
    <ActivityIndicator size="large" color="#FFF" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#05042A",
    flex: 1,
    paddingVertical: 32,
  },
});

export default SplashScreen;
