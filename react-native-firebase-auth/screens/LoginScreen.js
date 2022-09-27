import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts } from "expo-font";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const navigation = useNavigation();

  const [loaded] = useFonts({
    Damion: require("../assets/fonts/Damion-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const image = {
    uri: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/143195170.jpg?k=48cbd9f326f316892baeb038265c7e46eb050f7f5f7f21b5feed5dcc7429741a&o=&hp=1",
  };

  return (
    <>
      <StatusBar animated={true} barStyle="light-content" />
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.titleContent}>
          <View style={{ alignSelf: "center" }}>
            <Icon
              name="airplane"
              size={50}
              color="white"
              style={styles.iconContent}
            />
          </View>

          <Text style={styles.text}>Ciao Albania</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#C4C4C4" }]}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.line} />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#E24747" }]}
          >
            <Text style={styles.buttonOutlineText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#2766E0" }]}
          >
            <Text style={styles.buttonOutlineText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: "#FFFF",
    fontSize: 55,
    fontWeight: "400",
    textShadowColor: "black",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 12,
    fontFamily: "Damion",
  },
  iconContent: {
    textShadowColor: "black",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 12,
  },
  titleContent: {
    height: "35%",
    justifyContent: "center",
    width: width - 20,
    marginTop: 30,
    margin: 20,
    alignSelf: "center",
  },
  buttonContainer: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    position: "relative",
  },
  line: {
    backgroundColor: "white",
    borderTopColor: "white",
    borderBottomColor: "white",
    borderWidth: 0.8,
    width: "100%",
    alignItems: "center",
    margin: 15,
  },
  button: {
    backgroundColor: "#2CCF98",
    width: "100%",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    margin: 15,
    opacity: 0.8,
  },
  buttonOutline: {
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "#000000",
    fontWeight: "400",
    fontSize: 18,
  },
  buttonOutlineText: {
    color: "#FFFF",
    fontWeight: "400",
    fontSize: 18,
  },
});
