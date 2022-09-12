import axios from "axios";
import { Platform } from "react-native";

const API_URL = Platform.OS === 'ios' ? 'http://localhost:8080/api/cards' : 'http://10.0.2.2:8080/api/cards';

//const API_URL = "http://10.0.2.2:8080/api/cards";


const getCards = async () => {
    const response = await axios.get(`${API_URL}/read`)
    return response;
}

const cardService ={
    getCards
}
export default cardService