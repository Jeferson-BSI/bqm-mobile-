import React from 'react';
import { View, StyleSheet } from 'react-native';


const FormRow = (props) => {
    const { children } = props //var = props.children
    return (
        <View style={styles.conteiner}>
            { children }
        </View>
    )
}


const styles = StyleSheet.create({
    conteiner: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#c5c5c5',
        marginTop: 5,
        marginBottom: 12,
        elevation: 1,
        //paddingHorizontal: 100,
        width: '90%',
        borderRadius: 10
    },
});


export default FormRow;