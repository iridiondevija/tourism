import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import {authService } from "../services/userServices"
import axios from "axios";


const API_URL =
  Platform.OS === "ios"
    ? "http://192.168.88.25:8080/api/users/"
    : "http://192.168.88.25:8080/api/users/";

    const userId = '6332fb4ad6bcd03b4e6580aa';

const Favourite = ({item}) => {
  const [fav, setFav] = useState(false);

//console.log('item', item)

const favoriteHandler = async () => { 
  setFav((prev) => !prev);
  await axios.put(API_URL + "/" + userId , item)
}

// useEffect(()=>{
//   console.log('fav', fav)
//   axios.put(API_URL + "/" + userId + "/" + item._id)
// },[fav])

  return (
    <TouchableWithoutFeedback onPress={favoriteHandler}>
        <Icon
          name="heart"
          type="font-awesome"
          size={25}
          color={fav ? "#EC5655" : "#0000005c"}
        />
    </TouchableWithoutFeedback>
  );
};

export default Favourite;
