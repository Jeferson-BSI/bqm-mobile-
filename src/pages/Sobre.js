import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import NavColumns from '../components/NavColumns';


function Sobre() {
    return (
        <View style={{backgroundColor: '#f8f8f8'}}>
            <NavColumns />

            <View style={styles.info}>
                <Text style={styles.InfoText}>PÁGINA INICIAL</Text>
            </View>

            <View style={styles.styleView }>
                <Text style={styles.styleText}>Olá, bem vindo!</Text>
                <Text style={styles.styleText}>
                    BQM é uma plataforma gratuita que tem o objetivo de facilitar
                    a elaboração de atividades avaliativas de matemática. É um banco
                    com mais de XXX questões organizadas conforme eixo temático, objeto de conhecimento, ciclo de ensino e nível de dificuldade.Aproveite!
                </Text>

            <View style={{width:500, height:200, backgroundColor: '#0b2639', alignItems: 'center', justifyContent: 'center', marginTop:10}}>
                <Text style={{color: 'white'}}>Video</Text>
            </View>
            </View>
        </View>
    )};


const styles = StyleSheet.create({
    info:{
        backgroundColor: '#f8f8f8',
        height: 40,
        marginTop: 0,
        alignItems: 'stretch',
        justifyContent: 'center',
      },
    
      InfoText: {
        fontSize: 17,
        color:'#0b2639',
        paddingLeft:10
      },

    styleView:{
        backgroundColor: '#f8f8f8',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

      styleText: {
        fontSize: 17,
        color:'#0b2639',
        paddingLeft: 20,
        marginTop: 10,
        justifyContent: 'center',
      }
    
});


export default Sobre;
