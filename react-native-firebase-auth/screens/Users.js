import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert, FlatList,
  Modal, StyleSheet, Text,
  TextInput, TouchableOpacity, View
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { db } from "../firebase.config";
import Loader from "./Loader";

const Users = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dataRec, setDataRec] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [singleItem, setSingleItem] = useState(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dataBase = collection(db, "users");

  const navigation = useNavigation();

  function handleCreate() {
    setShowModal(false);
    setShouldRender(true);
    addDoc(dataBase, {
      name: name,
      password: password,
    });
  }

  function handleDelete(name, docId) {
    Alert.alert(
      "Attention!",
      `Are you sure you want to delete user ${name}?`,
      [
        {
          text: "Yes",
          onPress: () => {
            setShouldRender(true);
            deleteDoc(doc(db, "users", docId));
          },
        },
        { text: "No", onPress: () => {}, style: "cancel" },
      ],
      {
        cancelable: true,
      }
    );
  }

  const handleUpdate = () => {
    setShowModal(false);
    setShouldRender(true);
    updateDoc(doc(db, "users", singleItem), {
      name: name,
      password: password,
    })
      .then(() => {
        console.warn("User updated");
      })
      .catch((error) => {
        console.log(error);
      });
    setName("");
    setPassword("");
    setSingleItem(null);
  };

  const loadData = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(dataBase);
    let temp = [];
    querySnapshot.forEach((doc) => {
      temp.push({
        userData: doc.data(),
        userId: doc.id,
      });
    });
    setIsLoading(false);
    setDataRec(temp);
    setName("");
    setPassword("");
  };

  useEffect(() => {
    if (shouldRender === true) {
      loadData();
    }
    return () => {
      setShouldRender(false);
      setSingleItem(null);
    };
  }, [shouldRender]);

  useEffect(() => {
    setIsLoading(true);
    loadData();
  }, []);

  return (
    <>
      <Loader visible={isLoading} />
      <View style={styles.container}>
      <TouchableOpacity
          style={[
            styles.singleModalButton,
            {
              backgroundColor: "red",
            },
          ]}
          onPress={() => navigation.navigate("Cards")}
        >
          <Text style={styles.singleModalButtonText}>Cards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.singleModalButton,
            {
              backgroundColor: "red",
            },
          ]}
          onPress={() => navigation.navigate("Testing")}
        >
          <Text style={styles.singleModalButtonText}>Testing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.singleModalButton,
            {
              backgroundColor: "white",
            },
          ]}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.singleModalButtonText}>Create User</Text>
        </TouchableOpacity>
        {dataRec && dataRec.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.articles}
            nestedScrollEnabled={true}
            data={dataRec}
            renderItem={({ item }) => (
              <View style={styles.allData}>
                <View style={styles.userDataContainer}>
                  <Text style={styles.userData}>
                    <Text style={styles.userDataLabel}>Username: </Text>
                    {item.userData["name"]}
                  </Text>
                  <Text style={styles.userData}>
                    <Text style={styles.userDataLabel}>Password: </Text>
                    {item.userData["password"]}
                  </Text>
                </View>
                <View style={styles.icons}>
                  <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => {
                      setShowModal(true);
                      setSingleItem(item.userId);
                      setName(item.userData["name"]);
                      setPassword(item.userData["password"]);
                    }}
                  >
                    <Icon name="account-edit" size={30} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() =>
                      handleDelete(item.userData["name"], item.userId)
                    }
                  >
                    <Icon name="delete-forever" size={30} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.userNotFound}>No data found...</Text>
        )}
        <Modal
          visible={showModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalInputLabel}>Username:</Text>
              <TextInput
                style={styles.modalInput}
                value={name}
                onChangeText={(e) => setName(e)}
              />

              <Text style={styles.modalInputLabel}>Password:</Text>
              <TextInput
                style={styles.modalInput}
                value={password}
                onChangeText={(e) => setPassword(e)}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.singleModalButton]}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.singleModalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    singleItem === null ? handleCreate() : handleUpdate();
                    setShowModal(false);
                    setName("");
                    setPassword("");
                  }}
                  style={styles.singleModalButton}
                >
                  <Text style={styles.singleModalButtonText}>Submit data </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  allData: {
    marginTop: 20,
    backgroundColor: "#e4f2f7",
  },
  userDataContainer: {
    padding: 10,
  },
  userData: {
    fontSize: 18,
    marginBottom: 5,
  },
  userDataLabel: {
    color: "blue",
  },
  modalView: {
    flex: 1,
    backgroundColor: "#e4f2f7",
    justifyContent: "center",
    alignContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  modalContent: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
  },
  modalInput: {
    fontSize: 20,
    marginBottom: 10,
    backgroundColor: "white",
    borderColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  modalInputLabel: {
    fontSize: 15,
  },
  singleModalButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  singleModalButtonText: {
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  userNotFound: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 200,
    backgroundColor: "#e4f2f7",
    fontSize: 20,
    textAlign: "center",
  },
});
