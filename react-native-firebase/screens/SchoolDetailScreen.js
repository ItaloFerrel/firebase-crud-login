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

const SchoolDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    code: "",
  };

  const [school, setSchool] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setSchool({ ...school, [prop]: value });
  };

  const getSchoolById = async (id) => {
    const dbRef = firebase.db.collection("schools").doc(id);
    const doc = await dbRef.get();
    const school = doc.data();
    setSchool({ ...school, id: doc.id });
    setLoading(false);
  };

  const deleteSchool = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("schools")
      .doc(props.route.params.schoolId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("SchoolsList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the School",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteSchool() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateSchool = async () => {
    const schoolRef = firebase.db.collection("schools").doc(school.id);
    await schoolRef.set({
      name: school.name,
      code: school.code,
    });
    setSchool(initialState);
    props.navigation.navigate("schoolsList");
  };

  useEffect(() => {
    getSchoolById(props.route.params.schoolId);
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
          value={school.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Second Name"
          style={styles.inputGroup}
          value={school.secondname}
          onChangeText={(value) => handleTextChange(value, "secondname")}
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
        <Button title="Update" onPress={() => updateSchool()} color="#19AC52" />
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

export default SchoolDetailScreen;