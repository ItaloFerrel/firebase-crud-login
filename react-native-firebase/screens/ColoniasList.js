import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const ColoniaScreen = (props) => {
  const [colonys, setColonys] = useState([]);

  useEffect(() => {
    firebase.db.collection("colonys").onSnapshot((querySnapshot) => {
      const colonys = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, streetname } = doc.data();
        colonys.push({
          id: doc.id,
          name,
          streetname,
        });
      });
      setColonys(colonys);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateColoniaScreen")}
        title="Create Colony"
      />
      {colonys.map((colony) => {
        return (
          <ListItem
            key={colony.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("ColoniaDetailScreen", {
                colonyId: colony.id,
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
              <ListItem.Title>{colony.name}</ListItem.Title>
              <ListItem.Subtitle>{colony.streetname}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default ColoniaScreen;