import React, {useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import firebase from '../database/firebase'

const CreateColoniaScreen = (props) => {

    const  [state, setState] = useState({
        name: "",
        streetname: "",
    });

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value});
    };
    
    const saveNewColony = async () => {
        if (state.name === '') {
            alert('Please provide a name')
        } else {
            try {
                await firebase.db.collection('colonys').add({
                    name: state.name,
                    streetname: state.streetname
                 })
                 props.navigation.navigate('ColoniasList');
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <ScrollView style={styles.container}>
            <View style = {styles.inputGroup}>
                <TextInput placeholder="Name" 
                onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style = {styles.inputGroup}>
                <TextInput placeholder="Streetname" 
                onChangeText={(value) => handleChangeText('streetname', value)} />
            </View>
            <View>
            <Button title="Save Colony" onPress={() => saveNewColony()} />
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

export default CreateColoniaScreen
