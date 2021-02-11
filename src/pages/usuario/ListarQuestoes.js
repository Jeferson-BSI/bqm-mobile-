import React, { useState, useEffect} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import Nav from '../../components/Nav';
import Info from '../../components/Info';
import Questao from '../../components/Questao';
import FabButton from '../../components/FabButton';
import axios from  'axios';



// Para instalar as bibliotecas necessárias basta executar: 'yarn add react-native-modal or npm i react-native-modal.' 
function ListarQuestoes() {
    const [data, setData] = useState([]);
    const [listaQuestoes, setQuestoes] = useState([]);

    async function getQuestoes(){
        const token = await AsyncStorage.getItem('user_token')
        const id = await AsyncStorage.getItem('user_id')
       
        const ApiGet = axios.create({
            baseURL: 'https://bq.mat.br/api/v1',
            timeout: 100,
            //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
            headers: {'Authorization': 'Token ' + token},
        });
        
        try{
            const response = await ApiGet.get(`/questao/`,{
                'status': 3,
                'cadastro_pelo_usuario': id
            })
            const { results } = response.data
            setData(results);
        }
        catch(erro) {
            alert(erro)
        }
    }

    useEffect(() =>{getQuestoes()}, [])

    return (
        <View style={styles.body}>
            <Nav>EPSILON</Nav>

            <Info>BQP  {'>'} QUESTÕES </Info>

            <View style={styles.main}>
                <ScrollView style={styles.conteinerQuestoes}
                    showsVerticalScrollIndicator={false}
                >
                    {
                        data.map(questao => (
                            <Questao key={questao.id } data={questao} list={listaQuestoes} setList={setQuestoes}/>
                        ))
                    }

                </ScrollView>
            </View>

            <FabButton style={{bottom: 80, right: 60}} list={listaQuestoes}/>
        </View>   
    )
};


const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        fontSize: 14,
        alignItems: 'center',
    },

    main: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        width: '100%',
        alignItems: 'center'
    },

    conteinerQuestoes: {
        flex: 1,
        width: '90%'
    }


});


export default ListarQuestoes;