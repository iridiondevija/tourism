import axios from "axios";

export const GET_CARDS = "GET_CARDS";

const API_URL =
  Platform.OS === "ios"
    ? "http://localhost:8080/api/cards"
    : "http://10.0.2.2:8080/api/cards";

export const getCardsRedux = () => {
  try {
    return async (dispatch) => {
        const response = await fetch(`${API_URL}/read`)
        const data = await response.json()
      if(data){
        dispatch({
            type: GET_CARDS,
            payload: data
        });
        //console.log("payload", response)
      }else {
        console.log('unable to fetch')
      }
    };
  } catch (error) {
    console.log(error);
  }
};
