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

const ContactDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    country: "",
    phone: "",
  };

  const [contact, setContact] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setContact({ ...contact, [prop]: value });
  };

  const getContactById = async (id) => {
    const dbRef = firebase.db.collection("contacts").doc(id);
    const doc = await dbRef.get();
    const contact = doc.data();
    setContact({ ...contact, id: doc.id });
    setLoading(false);
  };

  const deleteContact = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("contacts")
      .doc(props.route.params.contactId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("ContactList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the Contact",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteContact() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateContact = async () => {
    const contactRef = firebase.db.collection("contacts").doc(contact.id);
    await contactRef.set({
      name: contact.name,
      country: contact.country,
      phone: contact.phone,
    });
    setContact(initialState);
    props.navigation.navigate("ContactList");
  };

  useEffect(() => {
    getContactById(props.route.params.contactId);
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
          autoCompleteType="username"
          style={styles.inputGroup}
          value={contact.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          
          placeholder="Country"
          style={styles.inputGroup}
          value={contact.country}
          onChangeText={(value) => handleTextChange(value, "country")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Phone"
          autoCompleteType="tel"
          style={styles.inputGroup}
          value={contact.phone}
          onChangeText={(value) => handleTextChange(value, "phone")}
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
        <Button title="Update" onPress={() => updateContact()} color="#19AC52" />
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

export default ContactDetailScreen;