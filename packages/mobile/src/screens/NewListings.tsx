import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  Image,
  Linking,
} from "react-native";
import constants from "../config/constants";
import { Property } from "../data/model/Property";
import useListings, { State } from "../hooks/listings";
import React, { useState } from "react";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import DownIcon from "../../assets/ic_chickenburger.svg"
import NavBar from "../components/Nav";

const NewListingsScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const listings = useListings(State.NEW);
  const [cardIndex, setCardIndex] = useState(0);
  const swiper = {};

  if (!listings) {
    return <Text>Loading</Text>;
  }

  const listing = listings[cardIndex];

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <IconButton style={styles.navIcon} icon={DownIcon} onPress={() => {}}></IconButton>
        <Text style={styles.navText}>{listings.length - cardIndex} new properties</Text>
      </View>
      <View style={styles.card}>
        <Image
          style={styles.cardImage}
          source={{
            uri:
              listing.images && listing.images.length > 0
                ? listing.images[0]
                : "https://static4.depositphotos.com/1021974/371/i/450/depositphotos_3712990-stock-photo-house-model.jpg",
          }}
        ></Image>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.subtitle}>{listing.subtitle}</Text>

        <Button
          backgroundColor="#199662"
          color="white"
          style={styles.buttonStyle}
          onPress={() => {
            console.log("cardIndex " + cardIndex);
            setCardIndex(cardIndex + 1);
          }}
          title="Add to wishlist"
        ></Button>

        <Button
          backgroundColor="white"
          color="black"
          onPress={() => {
            setCardIndex(cardIndex + 1);
            console.log("oulala");
          }}
          title="It's a no"
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%"
  },
  nav: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navIcon: {
    width: 50, // Adjust button width as needed
    height: 50, // Adjust button height as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  navText: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: "red",
    marginLeft: -25
  },
  card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  cardImage: {
    width: "100%",
    height: "50%",
  },
  buttonStyle: {
    marginTop: "auto",
    margin: 8,
  },
  title: {
    fontSize: 22,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "transparent",
    fontFamily: constants.fonts.extraBold,
  },
  subtitle: {
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "transparent",
    fontFamily: constants.fonts.regular,
  },
});

export default NewListingsScreen;
