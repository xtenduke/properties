import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import constants from "../config/constants";
import {Property} from "../data/model/Property";
import React from "react";

const ListingScrollView = ({ navigation }) => {
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    backgroundColor: "#05042A",
    flex: 1,
    paddingTop: 32,
  },
  list: {
    marginTop: 16,
  },
  scrollViewContent: {
    paddingVertical: 32,
  },
  searchField: {
    alignSelf: "stretch",
    borderColor: "#37366F",
    borderRadius: 8,
    borderWidth: 1,
    color: "white",
    fontFamily: constants.fonts.regular,
    fontSize: 16,
    height: 58,
    marginHorizontal: 24,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    color: "white",
    fontFamily: constants.fonts.extraBold,
    fontSize: 24,
    letterSpacing: -0.4,
    lineHeight: 32,
    marginHorizontal: 24,
    marginTop: 16,
    maxWidth: "60%",
  },
});

export default ListingScrollView;