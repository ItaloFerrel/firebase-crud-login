import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const ColoniaDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    streetname: "",
  };

  const [colony, setColony] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setColony({ ...colony, [prop]: value });
  };

  const getColonyById = async (id) => {
    const dbRef = firebase.db.collection("colonys").doc(id);
    const doc = await dbRef.get();
    const colony = doc.data();
    setColony({ ...colony, id: doc.id });
    setLoading(false);
  };

  const deleteColony = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("colonys")
      .doc(props.route.params.colonyId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("ColoniasList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the Colony",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteColony() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateColony = async () => {
    const colonyRef = firebase.db.collection("colonys").doc(colony.id);
    await colonyRef.set({
      name: colony.name,
      streetname: colony.secondname,
    });
    setColony(initialState);
    props.navigation.navigate("ColoniasList");
  };

  useEffect(() => {
    getColonyById(props.route.params.colonyId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          style={styles.inputGroup}
          value={colony.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Street Name"
          style={styles.inputGroup}
          value={colony.streetname}
          onChangeText={(value) => handleTextChange(value, "streetname")}
        />
      </View>

      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateColony()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default ColoniaDetailScreen;