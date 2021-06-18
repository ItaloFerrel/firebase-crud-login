import "react-native-gesture-handler";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import * as firebase from 'firebase';
import apiKeys from './config/keys'

  const Stack = createStackNavigator()
  import WelcomeScreen from './screens/WelcomeScreen'
  import SignUp from './screens/SignUp'
  import SignIn from './screens/SignIn'
  import LoadingScreen from './screens/LoadingScreen'
  import Dashboard from './screens/Dashboard'
  import ProfileScreen from "./screens/ProfileScreen";
  import UsersList from './screens/UsersList'
  import CreateUserScreen from './screens/CreateUserScreen'
  import UserDetailScreen from './screens/UserDetailScreen'
  import ContactList from './screens/ContactList'
  import CreateContactScreen from './screens/CreateContactScreen'
  import ContactDetailScreen from './screens/ContactDetailScreen'
  import ColoniasList from './screens/ColoniasList'
  import CreateColoniaScreen from './screens/CreateColoniaScreen'
  import ColoniaDetailScreen from './screens/ColoniaDetailScreen'
  import SchoolsList from './screens/SchoolsList'
  import CreateSchoolScreen from './screens/CreateSchoolScreen'
  import SchoolDetailScreen from './screens/SchoolDetailScreen'
  import DirectoryScreen from './screens/DirectoryScreen'

function MyStack() {
  return (
<Stack.Navigator>
<Stack.Screen name='Loading' 
  component={LoadingScreen} 
  options={{ headerShown: false }}
  />
<Stack.Screen name='Home' 
  component={WelcomeScreen} 
  options={{ headerShown: false }}
  />
  <Stack.Screen 
  name="Profile" 
  component={ProfileScreen} 
  />
  <Stack.Screen name='Sign Up' 
  component={SignUp} 
  options={{ headerShown: false }}
  />
  <Stack.Screen name='Sign In' 
  component={SignIn} 
  options={{ headerShown: false }}
  />
  <Stack.Screen name={'Dashboard'} 
  component={Dashboard} 
  options={{ headerShown: false }} 
  />
  
  <Stack.Screen 
  name="UsersList" 
  component={UsersList} 
  options={{title: "users list"}}
  />
  <Stack.Screen 
  name="CreateUserScreen" 
  component={CreateUserScreen} 
  options={{title: "Create a new user"}}
  />
  <Stack.Screen 
  name="UserDetailScreen" 
  component={UserDetailScreen} 
  options={{title: "user detail"}}
  />
  
  <Stack.Screen 
  name="ContactList" 
  component={ContactList} 
  options={{title: "contacts list"}}
  />
  <Stack.Screen 
  name="CreateContactScreen" 
  component={CreateContactScreen} 
  options={{title: "Create a new contact"}}
  />
  <Stack.Screen 
  name="ContactDetailScreen" 
  component={ContactDetailScreen} 
  options={{title: "contact detail"}}
  />

<Stack.Screen 
  name="ColoniasList" 
  component={ColoniasList} 
  options={{title: "colonys list"}}
  />
  <Stack.Screen 
  name="CreateColoniaScreen" 
  component={CreateColoniaScreen} 
  options={{title: "Create a new colony"}}
  />
  <Stack.Screen 
  name="ColoniaDetailScreen" 
  component={ColoniaDetailScreen} 
  options={{title: "colony detail"}}
  />

<Stack.Screen 
  name="SchoolsList" 
  component={SchoolsList} 
  options={{title: "Schools list"}}
  />
  <Stack.Screen 
  name="CreateSchoolScreen" 
  component={CreateSchoolScreen} 
  options={{title: "Create a new school"}}
  />
  <Stack.Screen 
  name="SchoolDetailScreen" 
  component={SchoolDetailScreen} 
  options={{title: "school detail"}}
  />
  <Stack.Screen 
  name="DirectoryScreen" 
  component={DirectoryScreen} 
  options={{title: "directory detail"}}
  />
</Stack.Navigator>
  )
}


export default function App() { //if (!firebase.apps.length) {
  //console.log('Connected with Firebase')
  //firebase.initializeApp(apiKeys.firebaseConfig);
//}

  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
