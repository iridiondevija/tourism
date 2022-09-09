import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase.config";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
       <View style={styles.bottomContainer}>
      <Text style={{fontWeight:"bold"}}>Email: {auth.currentUser?.email} </Text>
      
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate("Users")}} style={styles.button}>
        <Text style={styles.buttonText}>User Dashboard</Text>
        
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  bottomContainer:{
    width:"100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#e4f2f7",
  }
});
