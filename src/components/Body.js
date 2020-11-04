import React from 'react';

import { KeyboardAvoidingView, StyleSheet } from 'react-native';

const Body = (props) => {
    const { children } = props  
    return (
        <KeyboardAvoidingView style={ styles.body }>
            { children }
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({

  body: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    fontSize: 14,

  }

});

export default Body;