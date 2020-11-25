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
        backgroundColor: '#f8f8f8',
        height: 40,
        marginTop: 0,
        padding: 5,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    
    InfoText: {
        fontSize: 17,
        color:'#0b2639',
        paddingLeft:10,
    },
});


export default Info;