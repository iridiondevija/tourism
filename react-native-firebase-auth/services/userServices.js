// import axios from "axios";
// import { Platform } from "react-native";
// //import { AsyncStorage } from '@react-native-async-storage/async-storage';

// const API_URL =
//   Platform.OS === "ios"
//     ? "http://192.168.88.25:8080/api/agents/"
//     : "http://192.168.88.25:8080/api/agents/";


//     // Register user
// const register = async (userData) => {
//     const response = await axios.post(API_URL, userData)
  
//     if (response.data) {
//       await AsyncStorage.setItem('user', JSON.stringify(response.data))
//     }
  
//     return response.data
//   }

//   // const setFavorite = async (userId, packId) =>{
//   //   console.log('here', userId)
//   //   console.log('here', packId)
//   //   const response = await axios.put(API_URL + userId + packId)
//   //   return response.data
//   // }
  
//   // Login user
//   const login = async (userData) => {
//     const response = await axios.post(API_URL + 'login', userData)
  
//     if (response.data) {
//      await AsyncStorage.setItem('user', JSON.stringify(response.data))
//     }
  
//     return response.data
//   }
  
//   // Logout user
//   const logout = async () => {
//    await AsyncStorage.removeItem('user')
//   }
  
//   const authService = {
//     register,
//     logout,
//     login,
    
//   }
  
//   export default authService