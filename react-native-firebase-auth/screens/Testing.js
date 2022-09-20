import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createPackage,
  deletePackage,
  getCardsList,
  updatePackage,
  reset,
} from "../reducers/cardSlice";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SwiperFlatList from "react-native-swiper-flatlist";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ContainerView } from "../container/ContainerView";
import Loader from "./Loader";

const Testing = () => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [singleItem, setSingleItem] = useState(null);
  //const [isLoading, setIsLoading] = useState(card.loading);

  console.log("cards", card.cards)

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setImage("");
    setSingleItem(null);
  };

  const onSubmit = () => {
    dispatch(createPackage({ title, description, image }));
    handleReset();
  };

  const handleDelete = (id) => {
    dispatch(deletePackage(id));
    setSingleItem(null);
  };

  const handleUpdate = (singleItem) => {
    dispatch(updatePackage(singleItem));
    handleReset();
  };

  useEffect(() => {
    dispatch(getCardsList());
    
  }, []);


  // useEffect(() => {
  //   card.loading === true && dispatch(getCardsList());
  //   return () => setIsLoading(false);
  // }, [card.loading]);

  return (
    <>
      <View>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text
            style={{
              color: "black",
              backgroundColor: "white",
              width: 50,
              height: 40,
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
        {/* {card.loading && <Loader visible={isLoading}>Loading...</Loader>} */}
        {card.loading && <Text>Loading..</Text>}
        {card.error && !card.loading ? <Text>{card.error}</Text> : null}
        {card.cards && card.cards.length > 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            horizontal={false}
            // showPagination
            // paginationActiveColor="#1061cc"
            // paginationStyle={{position:'absolute'}}
            // paginationStyleItem={{ width:10, height:10, borderRadius:5, marginTop:9 }}
            data={card.cards}
            renderItem={({ item }) => (
              <ScrollView
                contentContainerStyle={{
                  alignItems: "center",
                  margin: 10,
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text>{item.title}</Text>
                <TouchableOpacity onPress={() => handleDelete(item._id)}>
                  <View>
                    <Icon color="#176FF2" name="delete" size={30} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowModal(true);
                    setSingleItem(item._id);
                    setTitle(item.title);
                    setDescription(item.description);
                    setImage(item.image);
                  }}
                >
                  <View>
                    <Icon color="#176FF2" name="account-edit" size={30} />
                  </View>
                </TouchableOpacity>
              </ScrollView>
            )}
          />
        ) : (
          <Text>No data found...</Text>
        )}
        <Modal visible={showModal}>
          <View
            style={{
              paddingVertical: 10,
              marginHorizontal: 40,
              marginTop:40,
              alignItems: "center",
              backgroundColor: "gray",
            }}
          >
            <Pressable onPress={() => setShowModal(!showModal)}>
              <View
                style={{
                  backgroundColor: "gray",
                  width: 200,
                  height: 40,
                  alignItems: "center",
                }}
              >
                <Text>Hide Modal</Text>
              </View>
            </Pressable>
            <TextInput
              style={styles.formIpunt}
              onChangeText={(e) => setTitle(e)}
              value={title}
              placeholder="Title"
            />
            <TextInput
              style={styles.formIpunt}
              onChangeText={(e) => setDescription(e)}
              value={description}
              placeholder="Description"
            />
            <TextInput
              style={styles.formIpunt}
              onChangeText={(e) => setImage(e)}
              value={image}
              placeholder="Image Url"
            />
            <Pressable
              onPress={() => {
                singleItem === null
                  ? onSubmit()
                  : handleUpdate({
                      title: title,
                      description: description,
                      image: image,
                      id: singleItem,
                    });
                setShowModal(!showModal);
              }}
            >
              <Text>Sbumit data</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default Testing;

const styles = StyleSheet.create({
  formIpunt: {
    backgroundColor: "white",
    width: 300,
    height: 40,
    marginVertical: 20,
  },
});
