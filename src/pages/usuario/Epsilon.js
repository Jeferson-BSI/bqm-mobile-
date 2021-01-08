import React, { useState, useEffect }from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

import Nav from '../../components/Nav';
import Info from '../../components/Info';
import CardProva from '../../components/CardProva';
import axios from 'axios';
import { SvgXml } from 'react-native-svg';



function Epsilon({ route, navigation }) {
    const iconEdit = `
        <svg width="100%" height="100%" viewBox="0 0 576 512">
            <path
            fill="#286090"
            d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
        />
        </svg> `;


    const { token } = route.params;
    const [ provas, setProvas] = useState(null);
 
    const ApiGet = axios.create({
        baseURL: 'https://bq.mat.br/api/v1',
        timeout: 200,
        //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
        headers: {'Authorization': 'Token ' + token}
    });

    //alert(token);

    async function getProva(){
        try{
            let page = 1
            let dados = []
            while (true) {
                const response = await ApiGet.get(`/imprimir/?page=${page}`)
                const { results, next } = response.data
                dados = dados.concat(results)

                if(next !== null){
                    page++}
                else{
                    break}
            }

            setProvas(dados)
        }
        catch(erro) {
            alert(erro)
        }
    };

    useEffect(() =>{getProva()}, [])

    return (
        <View style={ styles.body }>

            <Nav>EPSILON</Nav>

            <Info>DASHBOARD</Info>

            <View style={ styles.main }>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        AVALIAÇÕES GERADAS
                    </Text>
                </View>
                <ScrollView 
                 showsVerticalScrollIndicator={false}
                 contentContainerStyle={styles.conteiner}>
                    {
                     (provas !== null)
                     ?provas.map(name =>(
                        <CardProva key={name.nome} name={name.nome}/>
                     ))
                     :null
                    }
                </ScrollView>
            </View>
        </View>
)};


const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },

    main: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center'

    },

    conteiner :{    
        //paddingTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '95%',
        backgroundColor: 'rgba(152, 148, 148, 0.1)',//'#f7f7f9',
        borderRadius: 5,
        borderColor: '#e1e1e8',
    },

    title: {
        backgroundColor: 'rgba(152, 148, 148, 0.1)',
        
        alignItems: 'center',
        justifyContent: 'center',
        
        width: '95%',
        paddingVertical: 10,
        marginTop: '3%',

        borderTopEndRadius: 5,
        borderTopStartRadius:5,
        borderColor: '#e1e1e8',
        borderBottomWidth: 1,
        borderBottomColor:'gray'
    },

    titleText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#286090',
    }
});


export default Epsilon;