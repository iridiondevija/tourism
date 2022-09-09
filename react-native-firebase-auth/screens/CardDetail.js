import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Card } from "react-native-paper";
import Favourite from "../components/Favourite";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SwiperFlatList from "react-native-swiper-flatlist";

const { width, height } = Dimensions.get("window");
const NUM_OF_LINES = 4;

function CardDetail({ route, navigation }) {
  const { item } = route.params;

  const { price, image, title, location, description, images } = item.swipData;
  const [fav, setFav] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const animationHeight = useRef(new Animated.Value(2)).current;
  const [numOfLines, setNumOfLines] = useState(NUM_OF_LINES);
  const [hasMore, setHasMore] = useState(false);

  const onTextLayout = useCallback((e) => {
    setHasMore(e.nativeEvent.lines.length > NUM_OF_LINES);
    setNumOfLines(e.nativeEvent.lines.length);
  });

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (expanded) {
      Animated.timing(animationHeight, {
        duration: 1000,
        toValue: 60,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(animationHeight, {
        duration: 1000,
        toValue: 5,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }
  }, [expanded]);

  return (
    <>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.oneCard}>
            <View style={{ position: "relative" }}>
              <SwiperFlatList
                paginationActiveColor="#FFFFFF"
                scrollEnabled={true}
                showPagination
                data={images}
                renderItem={({ item }) => (
                  <Card.Cover
                    style={styles.cardCover}
                    source={{
                      uri: item,
                    }}
                  />
                )}
              ></SwiperFlatList>
              <TouchableOpacity
                style={styles.backIcon}
                onPress={() => navigation.goBack()}
              >
                <Icon color="#B8B8B8" name="chevron-left" size={30} />
              </TouchableOpacity>
              <View style={styles.heart}>
                <Favourite />
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{title}</Text>
            </View>
            <View style={styles.cardReview}>
              <Text style={styles.cardReviewText}>Overview</Text>
              <View style={styles.cardReviewItems}>
                <View style={styles.cardDescriptionIcons}>
                  <Icon name="clock" color="#24C6C6" size={18} />
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.cardRating}>Duration</Text>
                  <Text style={styles.cardRatingText}>5 Days</Text>
                </View>
              </View>
              <View style={styles.cardReviewItems}>
                <View style={styles.cardDescriptionIcons}>
                  <Icon name="star" color="#DF9652" size={18} />
                </View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.cardRating}>Rating</Text>
                  <Text style={styles.cardRatingText}>4.8 out of 5</Text>
                </View>
              </View>
            </View>
            <View style={styles.cardDescription}>
              <Animated.ScrollView
                scrollEnabled={expanded ? true : false}
                style={{ height: expanded ? height / 4 : height / 8 }}
              >
                <Text
                  numberOfLines={
                    !hasMore
                      ? NUM_OF_LINES
                      : expanded
                      ? numOfLines
                      : NUM_OF_LINES
                  }
                  onTextLayout={onTextLayout}
                  style={styles.cardDescriptionContent}
                  ellipsizeMode="tail"
                >
                  {description}
                </Text>
              </Animated.ScrollView>

              {hasMore && (
                <TouchableWithoutFeedback onPress={() => toggleExpansion()}>
                  <View style={styles.cardDescriptionExpand}>
                    <Text style={styles.cardDescriptionExpandButton}>
                      {expanded ? "Read Less" : "Read More"}
                    </Text>

                    <Icon
                      color="#176FF2"
                      name={expanded ? "chevron-up" : "chevron-down"}
                      size={30}
                    />
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>
          <View style={styles.twoCard}>
            <View style={styles.cardPrenotationContent}>
              <View style={styles.cardPrenotationContentPrice}>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 12,
                    lineHeight: 15,
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 24,
                    lineHeight: 30,
                    color: "#2DD7A4",
                    marginTop: 4,
                  }}
                >
                  ${price}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.cardPrenotationContentPriceButton}
                onPress={() => {}}
              >
                <View style={styles.cardBookButton}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "700",
                      fontSize: 16,
                      lineHeight: 20,
                    }}
                  >
                    Book Now
                  </Text>
                  <Icon
                    name="arrow-right"
                    size={20}
                    style={{ color: "#FFFFFF" }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>
    </>
  );
}

export default CardDetail;

const styles = StyleSheet.create({
  heart: {
    position: "absolute",
    marginRight: 19,
    right: 19,
    bottom: 19,
    backgroundColor: "white",
    width: 44,
    height: 44,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 44 / 2,
  },
  card: {
    marginTop: 30,
    borderRadius: 32,
    width: 375,
    display: "flex",
    flex: 1,
  },
  cardCover: {
    borderRadius: 20,
    height: height / 3,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    width: 335,
  },
  oneCard: {
    flex: 0.85,
  },
  twoCard: {
    flex: 0.1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  backIcon: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    position: "absolute",
    top: 32,
    left: 32,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    marginLeft: 20,
  },
  cardTitle: {
    width: 244,
    height: 29,
    fontWeight: "600",
    lineHeight: 29,
    fontSize: 24,
    justifyContent: "flex-start",
    marginTop: 32,
  },
  cardReview: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 25,
    width: 330,
    justifyContent: "space-between",
  },
  cardReviewText: {
    justifyContent: "center",
    textAlign: "center",
    height: 27,
    marginTop: 8,
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 27,
    color: "#2CCF98",
  },
  cardDescription: {
    width: 335,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 16,
  },
  cardDescriptionIcons: {
    backgroundColor: "#F0F0F0",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  cardReviewItems: {
    display: "flex",
    flexDirection: "row",
  },
  cardRating: {
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 15,
    color: "#89807A",
  },
  cardRatingText: {
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 18,
    color: "#000000",
  },
  cardDescriptionContent: {
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  cardDescriptionExpand: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  cardDescriptionExpandButton: {
    color: "#176FF2",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 17,
  },
  cardPrenotationContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: 335,
    marginLeft: 20,
  },
  cardPrenotationContentPrice: {
    display: "flex",
    flexDirection: "column",
    marginTop: 25,
  },
  cardPrenotationContentPriceButton: {
    marginTop: 21,
    width: 223,
    height: 58,
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#176FF2",
  },
  cardBookButton: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    width: 150,
  },
});
