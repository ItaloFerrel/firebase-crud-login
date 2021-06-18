import React, {useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import firebase from '../database/firebase'

const CreateSchoolScreen = (props) => {

    const  [state, setState] = useState({
        name: "",
        code:"",
    });

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value});
    };
    
    const saveNewSchool = async () => {
        if (state.name === '') {
            alert('Please provide a name')
        } else {
            try {
                await firebase.db.collection('schools').add({
                    name: state.name,
                    code: state.code,
                 })
                 props.navigation.navigate('SchoolsList');
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
                <TextInput placeholder="Code" 
                onChangeText={(value) => handleChangeText('code', value)} />
            </View>
            <View>
            <Button title="Save School" onPress={() => saveNewSchool()} />
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

export default CreateSchoolScreen
