import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Card } from "react-native-paper";
import { Rating } from "react-native-ratings";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Favourite from "../components/Favourite";
import { getCardsList } from "../reducers/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import ContainerView from "../container/ContainerView";

const { width } = Dimensions.get("window");

function Carousel() {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card);
  //const [cardData, setCardData] = useState([]);
  const navigation = useNavigation();

  // console.log(card.cards[0].period[0])
  // const loadData = async () => {
  //   const querySnapshot = await cardService.getCards();
  //   let temp = [];
  //   querySnapshot.data.forEach((doc) => {
  //     temp.push({
  //       swipData: doc,
  //     });
  //   });
  //   setCardData(temp);
  // };


    console.log('card', card)

  useEffect(() => {
    //loadData();
    dispatch(getCardsList());
  }, []);

  return (
        <>
          {card.cards && card.cards.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              horizontal={true}
              scrollEnabled={true}
              // showPagination
              // paginationActiveColor="#1061cc"
              // paginationStyle={{position:'absolute'}}
              // paginationStyleItem={{ width:10, height:10, borderRadius:5, marginTop:9 }}
              data={card.cards}
              renderItem={({ item }) =>
                // item.rating > 1 && (
                  <ContainerView >
                    <Card
                      mode="contained"
                      style={[styles.cardContent, styles.card]}
                      onPress={() => {
                        navigation.navigate("Detail", { singleCardId: item._id});
                      }}
                    >
                      <View style={{ position: "relative" }}>
                        <Card.Cover
                          style={styles.cardImage}
                          source={{
                            uri: item.defaultImage,
                          }}
                        />
                        <View style={styles.heart}>
                          <Favourite item={item}/>
                        </View>
                      </View>
                      <View style={styles.cardBody}>
                        <Text style={styles.text}>
                          {item.title}{" "}
                        </Text>
                        <View style={styles.rating}>
                          <Text style={styles.location}>
                            <Icon name="map-marker-outline" size={20} />
                            {item.location}
                          </Text>
                          <Rating
                            startingValue={item.rating}
                            ratingCount={5}
                            type="custom"
                            ratingColor="#FFE27D"
                            ratingBackgroundColor="#E5E5E5"
                            imageSize={24}
                            readonly={true}
                            tintColor="#FFFF"
                          />
                        </View>
                        <View style={styles.cardButton}>
                          <Text style={styles.price}>
                            $ {item.price}
                            <Text style={{ color: "#6C6D68" }}>/day</Text>
                          </Text>
                          <TouchableOpacity
                            style={{ marginTop: 20 }}
                            onPress={() => {
                              navigation.navigate("Detail", { singleCardId: item._id });
                            }}
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
                  </ContainerView>
                
              }
            />
          ) : (
            <Text>No data found...</Text>
          )}
        
        </>
  );
}

export default Carousel;
const styles = StyleSheet.create({
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
    paddingVertical: 5,
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
    backgroundColor: "#FFFF",
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
    bottom: -20,
    backgroundColor: "white",
    width: 44,
    height: 44,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 44 / 2,
  },
});
