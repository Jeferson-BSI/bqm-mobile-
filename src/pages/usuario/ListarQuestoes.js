import React, { useState, useEffect} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    AsyncStorage,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    Button
} from 'react-native';
import Nav from '../../components/Nav';
import Info from '../../components/Info';
import Questao from '../../components/Questao';
import FabButton from '../../components/FabButton';
import axios from  'axios';
import Modal from 'react-native-modal';



// Para instalar as bibliotecas necessárias basta executar: 'yarn add react-native-modal or npm i react-native-modal.' 
function ListarQuestoes() {
    const [data, setData] = useState([]);
    const [listaQuestoes, setQuestoes] = useState([]);
    const [loginShow, setLoginShow] =useState(true);
    const [ visible, setVisible] = useState(false);
    const [ dataQuestao, setDataQuestao] = useState(false);


    async function getQuestoes(){
        const token = await AsyncStorage.getItem('user_token')
        //const id = await AsyncStorage.getItem('user_id')
       
        const ApiGet = axios.create({
            baseURL: 'https://bq.mat.br/api/v1',

           // baseURL: 'http://10.0.2.2:8000/api/v1',
            timeout: 100,
            //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
            headers: {'Authorization': 'Token ' + token},
        });
        
        try{
            const response = await ApiGet.get(`/questao/?status=3`)
            const { results } = response.data
            setData(results);
            setLoginShow(false)
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
                {
                    (loginShow)
                    ?<ActivityIndicator  size='large' color='blue'  />
                    :<ScrollView style={styles.conteinerQuestoes}
                        showsVerticalScrollIndicator={false}
                     >
                        {
                            data.map(questao => (
                                <Questao 
                                 key={questao.id } 
                                 data={questao} 
                                 list={listaQuestoes} 
                                 setList={setQuestoes}
                                 setDataQuestao={setDataQuestao}
                                  setVisible={setVisible}
                                  />
                            ))
                        }
                     </ScrollView>
                }
                
            </View>

            <FabButton 
             style={{bottom: 80, right: 60}} 
             list={listaQuestoes} 
             setList={setQuestoes}
             data={data} 
             setData={setData} 
            />

            <Modal isVisible={ visible }
                animationType="slide"
                transparent={true}>
                <View style={styles.centeredView}>
                    <ScrollView style={styles.modalView}>

                        {/* <View style={ {flexDirection: 'row'}}>
                            <Text  style={ styles.textAp }>Área: </Text>
                            <Text style={ styles.title }>{ dataQuestao.area } </Text>
                        </View> */}

                        <View >
                            <Text style={ styles.textAp }>Pergunta:  </Text>
                            <Text style={ styles.textPergunta } >{ dataQuestao.pergunta } </Text>
                        </View>

                        <View style={{marginBottom: 50}}>
                            <Text style={ styles.textAp}>Resposta:  </Text>
                            <Text style={ styles.textPergunta }> { dataQuestao.resposta } </Text>
                        </View>
                    </ScrollView>
                    <TouchableOpacity onPress={() => { setVisible(false)}}>
                        <Button color='#0b2639' title='Fechar' onPress={() => { setVisible(false)}}/>
                    </TouchableOpacity>

                </View>
            </Modal>

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
        alignItems: 'center',
        marginBottom: 10
    },

    conteinerQuestoes: {
        flex: 1,
        width: '90%'
    },
    
    questao: {
        alignItems: 'center',
        paddingHorizontal: '2%',
        paddingVertical: '1%',
    },

    title: {
        fontSize: 16,
        color: '#0b2639'

    },

    textAp: {
        fontSize: 16,
        fontWeight: '700',
        marginRight: '2%'
    },

    textPergunta: {
        fontSize: 14,
        textAlign: 'justify',
        lineHeight: 20,
        marginLeft: '2%',
        fontFamily: 'sans-serif',

    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width: '100%'
      },

    modalView: {
    margin: 20,
    backgroundColor: "white",
    //borderRadius: 15,
    minWidth: '80%', 
    padding: 20,
    paddingBottom: 50,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    },

});


export default ListarQuestoes;