import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import CardDetail from "./screens/CardDetail";
import Carousel from "./screens/Carousel";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import Testing from "./screens/Testing";
import Users from "./screens/Users";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
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
      </Stack.Navigator>
      
    </NavigationContainer>
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
