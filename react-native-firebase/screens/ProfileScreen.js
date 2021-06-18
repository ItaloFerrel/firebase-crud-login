import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProfileScreen = ({ route, navigation }) => {
  const handlePress = () => {
    navigation.replace('Home');
  };
  const { user } = route.params;
  console.log("user from google", user);
  
  return (

    <View style={styles.container}>
      <Text style={styles.titleText}>Dashboard</Text>
      <Text style={styles.text}>Welcome {user.name}</Text>
  
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UsersList')}>
        <Text style={styles.buttonText}>Usuarios</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ContactList')}>
        <Text style={styles.buttonText}>Contactos</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ColoniasList')}>
        <Text style={styles.buttonText}>Colonias</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SchoolsList')}>
        <Text style={styles.buttonText}>Escuelas</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DirectoryScreen')}>
        <Text style={styles.buttonText}>Directorio</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    padding: 5,
    backgroundColor: '#ff9999',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize:20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#3FC5AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    marginTop: '2%',
    marginBottom: '10%',
    fontWeight: 'bold',
    color: 'black',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E6194',
  },
});
export default ProfileScreen;


