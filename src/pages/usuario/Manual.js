import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Nav from '../../components/Nav';
import Info from '../../components/Info';


function Configuracao({ navigation }) {

    return (
        <View style={styles.body}>

            <Nav>EPSILON</Nav>

            <Info>DASHBOARD {'>'} MANUAL</Info>

            <View style={styles.main}>
                <View style={styles.conteiner}>
                    <Text style={styles.text}>
                        Olá usuário, bem vindo ao Manual de Utilização do Banco de Questões de Matemática (BQM), aqui você encontrará informações que lhe permitirão entender a maneira em que esta plataforma funciona.
                    </Text>
                </View>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        fontSize: 14,
        alignItems: 'center'
    },

    main: {
        flex: 1,
        //marginTop: 30,
        backgroundColor: '#f8f8f8',
        alignItems: 'center'
    },

    conteiner: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(152, 148, 148, 0.1)',

        width: '95%',
        paddingVertical: 15,
        paddingHorizontal: '3%',
        marginVertical: '4%',

        borderRadius: 5,
        borderColor: '#e1e1e8',

        
    },

    text: {
        fontSize: 18,
        fontWeight: '700',
        color: '#286090',
        textAlign: 'justify'

    }
});


export default Configuracao;