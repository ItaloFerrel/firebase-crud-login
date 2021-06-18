import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const ContactScreen = (props) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    firebase.db.collection("contacts").onSnapshot((querySnapshot) => {
      const contacts = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, country, phone } = doc.data();
        contacts.push({
          id: doc.id,
          name,
          country,
          phone,
        });
      });
      setContacts(contacts);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateContactScreen")}
        title="Create Contact"
      />
      {contacts.map((contact) => {
        return (
          <ListItem
            key={contact.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("ContactDetailScreen", {
                contactId: contact.id,
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
              <ListItem.Title>{contact.name}</ListItem.Title>
              <ListItem.Subtitle>{contact.phone}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default ContactScreen;