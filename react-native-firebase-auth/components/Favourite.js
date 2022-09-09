import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";

const Favourite = () => {
  const [fav, setFav] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setFav((prev) => !prev)}>
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
