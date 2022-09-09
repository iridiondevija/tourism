import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cardService from "../services/cardsServices";


// const API_URL = "http://10.0.2.2:8080/api/packages/read";

const config = {
	provider:  null,
	token: null,
	'Content-Type': 'application/x-www-form-urlencoded',
	'Cache-Control': 'no-cache, no-store, must-revalidate',
	'Pragma': 'no-cache',
	'Expires': 0,
	'Accept': 'application/json',
};
 

const Testing = () => {

    // const getData = async () => {
    //     const response = await axios.get(API_URL, config)
    //     .then((response)=>{
    //           console.warn(response.data)
    //         }).catch((error)=>{
    //           console.warn(error)
    //         })
    //     return response;

    //   };

    // const getData = () =>{
    //   axios.get("http://10.0.2.2:8080/api/packages/read")
    //   .then((response)=>{
    //     console.warn(response.data)
    //   }).catch((error)=>{
    //     console.warn(error)
    //   })
    // }

  return (
    <View>
      <TouchableOpacity onPress={()=> cardService.getCards()}>
        <Text>Testing</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Testing;

const styles = StyleSheet.create({});
