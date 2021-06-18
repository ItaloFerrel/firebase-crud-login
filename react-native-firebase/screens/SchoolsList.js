import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const SchoolScreen = (props) => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    firebase.db.collection("schools").onSnapshot((querySnapshot) => {
      const schools = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, code } = doc.data();
        schools.push({
          id: doc.id,
          name,
          code,
        });
      });
      setSchools(schools);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateSchoolScreen")}
        title="Create School"
      />
      {schools.map((school) => {
        return (
          <ListItem
            key={school.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("SchoolDetailScreen", {
                schoolId: school.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{school.name}</ListItem.Title>
              <ListItem.Subtitle>{school.code}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default SchoolScreen;