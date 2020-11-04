import React from 'react';

import { Text, View, StyleSheet } from 'react-native';


import Body from '../components/Body';
import Nav from '../components/Nav';
import Info from '../components/Info';
import Main from '../components/Main';


function Inicio({ navigation }) {

    return (
 
        <Body>

            <Nav>INICIO</Nav>

            <Info>PÁGINA INICIAL</Info>

            <Main>

                <View style={styles.styleView }>
                    <Text style={styles.styleText}>Olá, bem vindo!</Text>
                    <Text style={styles.styleText}>
                        BQM é uma plataforma gratuita que tem o objetivo de facilitar a elaboração de atividades avaliativas de matemática. É um banco com mais de XXX questões organizadas conforme eixo temático, objeto de conhecimento, ciclo de ensino e nível de dificuldade. Aproveite!
                    </Text>

                <View style={{width:500, height:200, backgroundColor: '#0b2639', alignItems: 'center', justifyContent: 'center', marginTop:10}}>
                    <Text style={{color: 'white'}}>Video</Text>
                </View>
                </View>

            </Main>

        </Body>
       
    )};


const styles = StyleSheet.create({

    styleView:{
        backgroundColor: '#fff',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    styleText: {
        fontSize: 17,
        color:'#0b2639',
        padding: 20,
        marginTop: 10,
        textAlign : 'justify',
    }
    
});


export default Inicio;
