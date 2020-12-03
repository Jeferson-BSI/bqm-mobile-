import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Body from '../../components/Body';
import Nav from '../../components/Nav';
import Info from '../../components/Info';
import Main from '../../components/Main';
import { SvgXml } from 'react-native-svg';


function Configuracao({ navigation }) {
    const Icon = `      
    <svg width="300" height="100" viewBox="0 0 576 512">
        <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="url(#gradient)"
        d="M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9.4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9.1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z"
    />
    <defs>
        <linearGradient
        id="gradient"
        x1="0"
        y1="0"
        x2="0"
        y2="0"
        gradient-units="userSpaceOnUse">
        <stop offset="0" stop-color="#0b2639" />
        <stop offset="1" stop-color="#0b2639" />
        </linearGradient>
    </defs>
    </svg> `;


    return (
        <View style={Styles.body}>

            <Nav>EPSILON</Nav>

            <Info>DASHBOARD {'>'} CONFIGURAÇÃO</Info>

            <View style={Styles.main}>
                <View style={Styles.icon}>
                    <SvgXml xml={ Icon } />
                    <Text style={Styles.userText}>epsilon@bq.mat.br</Text>
                </View>

                <View style={Styles.touchable}>
                    <TouchableOpacity 
                    style={Styles.bnt}
                    onPress={() => (
                        navigation.navigate('ModficarSenha')
                    )}
                    >
                        <Text style={Styles.bntText}> Modificar senha </Text> 
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={Styles.bnt}>
                        <Text style={Styles.bntText}> Excluir conta </Text> 
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};


const Styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        fontSize: 14,
    },

    main: {
        flex: 1,
        marginTop: 30,
        backgroundColor: '#f8f8f8',
        alignItems: 'center'
    },

    icon: {
        flex:1,
        marginTop: 5,
        backgroundColor: '#f8f8f8',
        alignItems: "center",
        fontWeight: 'bold',
        //backgroundColor: 'black'
      },

    userText: {
          fontSize: 20,
          color:'#0b2639',
          paddingLeft:10,
          fontWeight: 'bold',
          marginTop:40
        },

    touchable: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        width: '100%',
        marginTop: 20,
    },

    bnt:{
        fontSize: 30,
        fontWeight: 'bold',
        color:'#0b2639',
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center",
        width: '90%',
        height: '23%',
        borderWidth: 2,
        borderColor: '#002907',
        backgroundColor: '#ebebeb',//'#e8e8e8'//'#F4F5F6',
        elevation: 3,
        borderRadius: 8,
    },

    bntText: {
        color:'#0b2639',
        fontSize: 20,
        fontWeight: 'bold',
    }
});


export default Configuracao;