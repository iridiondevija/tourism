import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { configureStore } from "@reduxjs/toolkit";
import { Button, Text } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import CardDetail from "./screens/CardDetail";
import Carousel from "./screens/Carousel";

import HomeScreen from "./screens/HomeScreen";
//import LoginScreen from "./screens/LoginScreen";
import Testing from "./screens/Testing";
import Users from "./screens/Users";
import cardReducer from './reducers/cardSlice';
import AvailabilityCard from "./screens/AvailabilityCard";


const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: {
    card: cardReducer,
  }
});

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store = { store }>
 <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="Loginscreen"
          component={LoginScreen}
        /> */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="Users"
          component={Users}
        />
        <Stack.Screen 
          options={{ headerShown: true }}
          name="Cards"
          component={Carousel}
        />
        <Stack.Screen 
          options={{ headerShown: false }}
          name="Detail"
          component={CardDetail}
        />
        <Stack.Screen 
          options={{ headerShown: true }}
          name="Testing"
          component={Testing}
        />
        <Stack.Screen 
          options={{ headerShown: true }}
          name="Availabilty"
          component={AvailabilityCard}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
