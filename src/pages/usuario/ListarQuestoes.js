import React from 'react';
import {
    View,
    StyleSheet, 
} from 'react-native';
import Nav from '../../components/Nav';
import Info from '../../components/Info';


function ListarQuestoes() {


    return (
        <View style={Styles.body}>
            <Nav>EPSILON</Nav>

            <Info>BQP  {'>'} QUESTÕES </Info>


            <View style={Styles.main}>
                

            </View>
        </View>

                  
    )
};


const Styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        fontSize: 14,
        alignItems: 'center',
    },

    main: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#f8f8f8',
        width: '100%'
    },


});


export default ListarQuestoes;