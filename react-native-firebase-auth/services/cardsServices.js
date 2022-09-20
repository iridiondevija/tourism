import axios from "axios";
import { Platform } from "react-native";

const API_URL =
  Platform.OS === "ios"
    ? "http://localhost:8080/api/packages/"
    : "http://10.0.2.2:8080/api/packages/";

  //   const API_URL_ID =
  // Platform.OS === "ios"
  //   ? "http://localhost:5000/api/packages/"
  //   : "http://10.0.2.2:5000/api/packages/";

const getCards = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const createPackage = async (packData) => {
  const response = await axios.post(API_URL, packData);

  return response.data;
};

const deletePack = async (packId) => {  
    const response = await axios.delete(API_URL + packId)
     return response.data
  }

  const updatePack = async (data) =>{
    const response = await axios.put(API_URL + data.id, data)
     return response.data

  }

const cardService = {
  getCards,
  createPackage,
  deletePack,
  updatePack
};
export default cardService;
