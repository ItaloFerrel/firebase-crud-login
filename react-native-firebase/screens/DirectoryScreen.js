import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const DirectoryScreen = (props) => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [colonys, setColonys] = useState([]);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, secondname, email } = doc.data();
        users.push({
          id: doc.id,
          name,
          secondname,
          email,
        });
      });
      setUsers(users);
    })
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
      })
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
      })
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
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("UserDetailScreen", {
                userId: user.id,
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
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
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

export default DirectoryScreen;