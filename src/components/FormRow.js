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
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        //borderBottomColor: '#0b2639',
        marginTop: 5,
        marginBottom: 12,
        elevation: 1,
        //paddingHorizontal: 100,
        width: '90%',
        borderRadius: 10,
        //alignItems: 'center'
    },
});


export default FormRow;