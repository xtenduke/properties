import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import NewListingsScreen from "./src/screens/NewListings";
import {TransitionPresets} from "@react-navigation/stack";
import {
  NunitoSans_200ExtraLight,
  NunitoSans_200ExtraLight_Italic,
  NunitoSans_300Light,
  NunitoSans_300Light_Italic,
  NunitoSans_400Regular,
  NunitoSans_400Regular_Italic,
  NunitoSans_600SemiBold,
  NunitoSans_600SemiBold_Italic,
  NunitoSans_700Bold,
  NunitoSans_700Bold_Italic,
  NunitoSans_800ExtraBold,
  NunitoSans_800ExtraBold_Italic,
  NunitoSans_900Black,
  NunitoSans_900Black_Italic,
  useFonts,
} from "@expo-google-fonts/nunito-sans";
import SplashScreen from "./src/screens/SplashScreen";
import ListingsScrollView from "./src/screens/ListingScroll";
import constants from "./src/config/constants";

const Stack = createNativeStackNavigator();

const PropertiesApp = () => {
  const [fontsLoaded] = useFonts({
    NunitoSans_200ExtraLight,
    NunitoSans_200ExtraLight_Italic,
    NunitoSans_300Light,
    NunitoSans_300Light_Italic,
    NunitoSans_400Regular,
    NunitoSans_400Regular_Italic,
    NunitoSans_600SemiBold,
    NunitoSans_600SemiBold_Italic,
    NunitoSans_700Bold,
    NunitoSans_700Bold_Italic,
    NunitoSans_800ExtraBold,
    NunitoSans_800ExtraBold_Italic,
    NunitoSans_900Black,
    NunitoSans_900Black_Italic,
  });

  if (!fontsLoaded) {
    return (
      <SplashScreen/>
    );
  }

  return (
    <NavigationContainer theme={{colors: {background: "#05042A"}}}>
      { getHomeNavigation()}
    </NavigationContainer>
  );
};

const getHomeNavigation = () => {
  return (
  <Stack.Navigator
    screenOptions={{
      animation: "fade_from_bottom",
      headerShown: false,
    }}
  >
    <Stack.Group>
      <Stack.Screen
      name={constants.screens.listings}
      component={NewListingsScreen}
      options={{title}}
      />
    </Stack.Group>

    <Stack.Group
      screenOptions={{
        presentation: "modal",
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <Stack.Screen
        name={constants.screens.noList}
        component={ListingsScrollView}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />

      <Stack.Screen
        name={constants.screens.wishlist}
        component={ListingsScrollView}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </Stack.Group>
  </Stack.Navigator>
  )
}

export default PropertiesApp;
