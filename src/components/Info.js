import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Info = (props) => {
    const { children } = props  
    return (
        <View style={styles.info}>  
            <Text style={styles.InfoText}>{ children }</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    info:{
        //backgroundColor: '#f8f8f8',
        backgroundColor: 'rgba(152, 148, 148, 0.1)',
        width: '95%',
        alignSelf: 'center',

        height: 40,
        marginTop: 5,
        padding: 5,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingLeft: '5%',

        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray'
    },
    
    InfoText: {
        fontSize: 17,
        color:'#0b2639',
        paddingLeft:10,
        fontWeight: 'bold',
    },
});


export default Info;