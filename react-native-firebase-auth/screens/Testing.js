import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/cards/read";

const config = {
	provider:  null,
	token: null,
	'Content-Type': 'application/x-www-form-urlencoded',
	'Cache-Control': 'no-cache, no-store, must-revalidate',
	'Pragma': 'no-cache',
	'Expires': 0,
	'Accept': 'application/json',
};


// axios.get(API_URL, {
    
// })
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
//     .then(function () {
//         // always executed
//     });  

const Testing = () => {

    const getData = async () => {
        const response = await axios.get(API_URL, config);
         //const response = await fetch(API_URL);
        const data = await response.json();
        console.warn(response)
        console.warn(data)
        return response;

      };

  return (
    <View>
      <TouchableOpacity onPress={()=> getData()}>
        <Text>Testing</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Testing;

const styles = StyleSheet.create({});
