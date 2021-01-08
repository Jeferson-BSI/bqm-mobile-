import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import Nav from '../../components/Nav';
import Info from '../../components/Info';
import { SvgXml } from 'react-native-svg';
import QuestionStorage from '../../funções/QuestionStorage'

function Bdquestoes({ navigation}) {

    //QuestionStorage('niveldedificuldade')

    const IconAdd = `      
        <svg width="100%" height="60%" viewBox="0 0 576 512">
            <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="url(#gradient)"
            d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z"
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

        const IconList = `      
        <svg width="100%" height="60%" viewBox="0 0 576 512">
            <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="url(#gradient)"
            d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"
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

    // const navAddQuestoes = async() =>{
    //     try {
    //         const value = await AsyncStorage.multiGet(['etapa', 'unidadetematica', 'objetodeconhecimento', 'niveldedificuldade']);
    //         if (value !== null) {
    //             navigation.navigate('AddQuestoes', value)

    //         }
    //     } 
    //     catch (error) {
    //         alert(error+' => aqui')
    //     }
        
    // };

    return (
        <View style={Styles.body}>
            <Nav>EPSILON</Nav>
            <Info>BANCO DE QUESTÕES PRIVADO (BQP)</Info>

            <View style={Styles.main}>
                <TouchableOpacity 
                    style={Styles.touchable}
                    onPress={() => navigation.navigate('AddQuestoes')}
                >
                    <SvgXml style={Styles.iconStyle} xml={ IconAdd } />
                    <Text style={Styles.iconText}> Adicionar questões </Text> 
                </TouchableOpacity>

                <TouchableOpacity 
                    style={Styles.touchable}
                    onPress={() => navigation.navigate('ListarQuestoes')}
                >
                    <SvgXml style={Styles.iconStyle} xml={ IconList } />
                    <Text style={[Styles.iconText, {paddingRight: 30}]}> Listar questões </Text>
                </TouchableOpacity>

            </View>
        </View>
)}



const Styles = StyleSheet.create({
    
    body: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    main: {
        flex: 1,
        //marginTop: 0,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',

    },
    
    touchable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 30,
        width: '90%',
        maxHeight: '30%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0b2639',
        elevation: 5,
    },
    
    iconStyle: {
        //backgroundColor: 'red',
        //paddingLeft: '90%',//300,
        paddingHorizontal: '45%'
        
    },
    
    iconText: {
        fontSize: 17,
        color:'#0b2639',
        paddingRight: 20,
        
    },
    
});


export default Bdquestoes;