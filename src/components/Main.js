import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

const Main = (props) => {
    const { children } = props  
    return (
        <ScrollView>
            <View style={styles.main}>
                { children }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    main: {
        backgroundColor: '#e8f0ff',
        flex: 1,
        flexDirection:'column',
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

});


export default Main;