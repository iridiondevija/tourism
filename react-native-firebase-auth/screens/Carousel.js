import { useNavigation } from "@react-navigation/native";
import { AirbnbRating, Icon } from "@rneui/themed";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Card } from "react-native-paper";
import SwiperFlatList from "react-native-swiper-flatlist";
import Favourite from "../components/Favourite";
import { db } from "../firebase.config";

const { width } = Dimensions.get("window");



function Carousel() {
  const dataBase = collection(db, "cards");

  const [cardData, setCardData] = useState([]);
  const [fav, setFav] = useState(false);
  const navigation = useNavigation();

  const loadData = async () => {
    const querySnapshot = await getDocs(dataBase);
    let temp = [];
    querySnapshot.forEach((doc) => {
      temp.push({
        swipData: doc.data(),
        cardId: doc.id,
      });
    });
    setCardData(temp);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {cardData && cardData.length > 0 ? (
            <SwiperFlatList
              scrollEnabled={true}
              // showPagination
              // paginationActiveColor="#1061cc"
              // paginationStyle={{position:'absolute'}}
              // paginationStyleItem={{ width:10, height:10, borderRadius:5, marginTop:9 }}
              data={cardData}
              renderItem={({ item }) => (
                <View style={styles.child}>
                  <Card
                    mode="contained"
                    style={[styles.cardContent, styles.card]}
                    onPress={()=>{navigation.navigate("Detail",{item: item})}}
                  >
                    <View style={{position: "relative"}}>
                    <Card.Cover
                      style={styles.cardImage}
                      source={{
                        uri: item.swipData["image"],
                      }}
                    />
                    <View style={styles.heart}> 
                    <Favourite />
                    </View>
                    </View>
                    <View style={styles.cardBody}>
                      <Text style={styles.text}>{item.swipData["title"]} </Text>
                      <View style={styles.rating}>
                        <Text style={styles.location}>
                          <Icon
                            name="location-pin"
                            type="antDesign"
                            size={20}
                          />
                          {item.swipData["location"]}
                        </Text>
                        <AirbnbRating
                          size={20}
                          showRating={false}
                          selectedColor="#FFE27D"
                          backgroundColor="red"
                          shadowColor="red"
                          isDisabled={true}
                          reviewColor="red"
                        />
                      </View>
                      <View style={styles.cardButton}>
                        <Text style={styles.price}>
                          $ {item.swipData["price"]}{" "}
                          <Text style={{ color: "#6C6D68" }}>/day</Text>
                        </Text>
                        <TouchableOpacity style={{ marginTop: 20 }} 
                        onPress={()=>{navigation.navigate("Detail",{item: item})}}
                        >
                          <Text
                            style={{
                              fontWeight: "700",
                              fontSize: 14,
                              lineHeight: 17,
                              color: "#176FF2",
                            }}
                          >
                            Read More
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card>
                </View>
              )}
            />
          ) : (
            <Text>No data found...</Text>
          )}
        </View>
      </ScrollView>
    </>
  );
}

export default Carousel;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  child: { width, justifyContent: "center" },
  text: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: -1,
    lineHeight: 20,
  },
  location: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: -1,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 18,
    letterSpacing: -1,
    color: "#7DAE36",
  },
  cardImage: {
    height: 256,
    borderRadius: 10,
  },
  cardContent: {
    margin: 5,
    padding: 5,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  cardBody: {
    height: 150,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cardButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    marginTop: 21,
  },
  rating: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  heart: {
    position: "absolute",
    right: 15,
    bottom:-20,
    backgroundColor: "white",
    width: 44,
    height: 44,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 44 / 2
  },
});
