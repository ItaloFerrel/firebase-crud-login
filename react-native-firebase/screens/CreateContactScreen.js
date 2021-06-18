import React, {useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import firebase from '../database/firebase'

const CreateContactScreen = (props) => {

    const  [state, setState] = useState({
        name: "",
        country: "",
        phone: "",
    });

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value});
    };
    
    const saveNewContact = async () => {
        if (state.name === '') {
            alert('Please provide a name')
        } else {
            try {
                await firebase.db.collection('contacts').add({
                    name: state.name,
                    country: state.country,
                    phone: state.phone
                 })
                 props.navigation.navigate('ContactList');
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <ScrollView style={styles.container}>
            <View style = {styles.inputGroup}>
                <TextInput placeholder="Name User" 
                onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style = {styles.inputGroup}>
                <TextInput placeholder="Country"
                onChangeText={(value) => handleChangeText('country', value)} />
            </View>
            <View style = {styles.inputGroup}>
                <TextInput placeholder="Phone User"
                onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
            <View>
            <Button title="Save Contact" onPress={() => saveNewContact()} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export default CreateContactScreen
