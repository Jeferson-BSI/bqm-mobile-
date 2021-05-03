import React, { useState, useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity,
    Button,
} from 'react-native';

import Modal from 'react-native-modal';
import axios from  'axios';

import Nav from '../../components/Nav';
import Info from '../../components/Info';
import CadastrarAvaliacao from '../../funções/CadastrarAvaliacao';
import OptionModal from '../../components/OptionModal';
import QuestaoAvaliacao from '../../components/QuestaoAvaliacao';
import FabButtonAvaliacao from '../../components/FabButtonAvaliacao';
import FabButtonPlus from '../../components/FabButtonPlus';
import PlusQuestion from '../usuario/PlusQuestion';
import FabButtonQuestions from '../../components/FabButtonQuestions';
import { useNavigation } from '@react-navigation/native';
//import RenderHtml from "react-native-render-html";



// Para instalar as bibliotecas necessárias basta executar: 'yarn add react-native-modal or npm i react-native-modal.' 
function ListarQuestoes({route, navigation: { goBack }}) {
    const { values, buscar, listId} =  route.params;
 
    const navigation = useNavigation();
    const [avaliacao, setAvaliacao] = useState(null) 
    const [stateToken, setToken] = useState(null) 

    const [data, setData] = useState([]);
    const [listaQuestoes, setQuestoes] = useState([]);
    const [listaId, setId] = useState([...listId]);

    const [isVisible, setVisible] = useState(false);
    const [isVisible2, setVisible2] = useState(false);
    const [isVisible3, setVisible3] = useState(false);
    const [isVisible4, setVisible4] = useState(true);

    const [isVisible5, setVisible5] = useState(false);
    const [isSelected, setselected] = useState(false);
    const [isPlus, setPlus] = useState(false);

    const [ visibleQuestao, setVisibleQuestao] = useState(false);
    const [ dataQuestao, setDataQuestao] = useState(false);


    let num = 0;

    async function getQuestoes(values){
        const token = await AsyncStorage.getItem('user_token');
        const id = await AsyncStorage.getItem('user_id');
        setToken(token)
        
        const parametros = `?status=${values.status}`
                            +`&etapa=${values.etapa}`
                            +`&ano=${values.ano}`
                            +`&unidade_tematica=${values.unidade}`
                            +`&objeto_de_conhecimento=${values.conhecimento}`
                            +`&nivel=${values.nivel}`;

       // alert(JSON.stringify(parametros)), resetForm
       
        const ApiGet = axios.create({
            baseURL: 'https://bq.mat.br/api/v1',

            //baseURL: 'http://10.0.2.2:8000/api/v1',
            timeout: 500,
            headers: {'Authorization': 'Token ' + token},
        });
        
        try{
            let page = 1
            let dados = []
            while (true) {
                const response = await ApiGet.get(`/questao/${parametros}&page=${page}`);
                const { results, next } = response.data
                dados = dados.concat(results)
                //console.log(dados);
               
                setData(dados);
                if(next !== null){
                    page++}
                else{
                    break}
            }

        }
        catch(erro) {
            //alert(erro)
        };
    };


    const cadastrarAvaliacao = () => {
        CadastrarAvaliacao(listaId, setAvaliacao);
    }

    const ShowAvaliacao = () =>{
        let qids = "";
        for (let i in listaId){
            qids += listaId[i]
            if((listaId.length -1) == i)
                break;
            else
                qids += ",";
        }

        if(avaliacao !== null){
            //console.log(TK, avaliacao)
            navigation.navigate('ShowAvaliacao', {token: stateToken, qids: avaliacao.qids})
            setAvaliacao(null)
            return
        }
        navigation.navigate('ShowAvaliacao', {token: stateToken, qids: qids})


    }

    useEffect(() =>{getQuestoes(values)}, [buscar]);
    
    // if(buscar){
    //     getQuestoes()
    // }
    
    return (
        <View style={styles.body}>
            <Nav>EPSILON</Nav>

            <Info>BQP  {'>'} SELECIONAR QUESTÕES </Info>

            <View style={styles.main}>
                <ScrollView style={styles.conteinerQuestoes}
                    showsVerticalScrollIndicator={false}
                >
                {
                    (isPlus)?
                    data.filter(({ id }) => !listaId.includes(id))
                    .map(questao => (
                        <QuestaoAvaliacao 
                            key={questao.id } 
                            data={questao} 
                            list={listaQuestoes} 
                            setList={setQuestoes} 
                            id={listaId} 
                            setDataQuestao={setDataQuestao}
                            setVisibleQuestao={setVisibleQuestao}
                            selected={isSelected}
                            setId={setId}/>
                    ))
                    :(isSelected)?
                    listaQuestoes.map(questao => (
                        <QuestaoAvaliacao 
                            key={questao.id } 
                            data={questao} 
                            list={listaQuestoes} 
                            setList={setQuestoes} 
                            id={listaId} 
                            setDataQuestao={setDataQuestao}
                            setVisibleQuestao={setVisibleQuestao}
                            selected={isSelected}
                            setId={setId}/>
                    )):
                    data.map(questao => (
                        <QuestaoAvaliacao 
                            key={questao.id } 
                            data={questao} 
                            list={listaQuestoes} 
                            setList={setQuestoes} 
                            id={listaId} 
                            setDataQuestao={setDataQuestao}
                            setVisibleQuestao={setVisibleQuestao}
                            selected={isSelected}
                            setId={setId}/>
                    ))

                }
                </ScrollView>
                {/* <PDFExample /> */}
            </View>

            <Modal isVisible={ isVisible }
                onRequestClose={() => {
                    setVisible(!isVisible);
                }}
            >
                <View style={ styles.centeredView}>
                    <ScrollView 
                     style={styles.modalView}
                     showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>                     AVALIAÇÃO</Text>
                    {
                        listaQuestoes.map(questao => {
                            return(
                                <View key={num++} style={styles.questao}>

                                    <Text style={styles.num}>{num}) <Text style={styles.texte}>{questao.pergunta}</Text></Text>
                                    <Text style={styles.num}>R: </Text>
                                    <Text style={[styles.texte, {paddingLeft: 5}]}>{questao.resposta}</Text>
                                </View>
                        )})
                    }
                    </ScrollView>

                    <TouchableOpacity onPress={() => { setVisible(false)}}>
                        <Button color='#0b2639' title='Fechar' onPress={() => { setVisible(false)}}/>
                    </TouchableOpacity>
                </View>
            </Modal>
            <PlusQuestion 
            isVisible={isVisible5}
            setVisible={setVisible5}
            getQuestoes={ getQuestoes}
            />
            
            <OptionModal 
            texto='Deseja criar uma avaliação com as questões selecionadas?'
            setVisible={setVisible2} 
            isVisible={isVisible2}
            onPress={()=>{
                setVisible2(false);
                setVisible3(true);
            }}

            onPress2={() => {
                setVisible2(false);
            }}
            />

            <OptionModal 
             texto='Deseja salvar a avaliação a ser gerada, para acessá-la futuramente através do seu painel inicial?'
             setVisible={setVisible3} 
             isVisible={isVisible3}
             onPress={()=>{
                setVisible3(false);
                cadastrarAvaliacao();
                ShowAvaliacao()
            }}

            onPress2={() => {
                setVisible3(false);
                setVisible(true);
            }}
            />

            <OptionModal 
             texto={`Encontramos ${data.length} resultados correspondentes para o filtro que você aplicou. Deseja ver as questões encontradas?`}
             setVisible={setVisible4} 
             isVisible={isVisible4}
             onPress={()=>{
                setVisible4(false);
            }}

            onPress2={()=>{
                goBack();
            }}
            />


            <Modal isVisible={ visibleQuestao }
                animationType={"fade"}
                transparent={true}
                onRequestClose={() => {
                    setVisibleQuestao(!visibleQuestao);
                }}>
                <View style={styles.centeredView}>
                    <ScrollView style={styles.modalView}
                        showsVerticalScrollIndicator={false}
                        >

                        <View >
                            <Text style={ styles.textAp }>Pergunta:  </Text>
                            <Text style={ styles.textPergunta } >{ (dataQuestao)?
                            dataQuestao.pergunta.replace(/[</]ul[>]/g, '\n').replace(/[\\<]/g, '')
                        :dataQuestao.pergunta } </Text>
                        </View>

                        <View style={{marginBottom: 50}}>
                            <Text style={ styles.textAp}>Resposta:  </Text>
                            <Text style={ styles.textPergunta }> { (dataQuestao)?
                            dataQuestao.resposta.replace(/['</]ul[>]/g, '').replace(/[\\<]/g, '').replace(/[br>div]/, '')
                            :dataQuestao.resposta} </Text>
                        </View>
                    </ScrollView>
                    <TouchableOpacity onPress={() => { setVisibleQuestao(false)}}>
                        <Button color='#0b2639' title='Fechar' onPress={() => { setVisibleQuestao(false)}}/>
                    </TouchableOpacity>

                </View>
            </Modal>

            <FabButtonAvaliacao  
             setVisible={setVisible} 
             isVisible={isVisible} 
             setVisible2={setVisible2}
             style={{bottom: 80, right: 40}} 
             list={listaQuestoes}/>

            <FabButtonPlus  
             setPlus = {setPlus}
             style={{bottom: 160, right: 40}} 
             setVisible5={setVisible5}
             setData={setData}
             setselected={setselected}
             />

            <FabButtonQuestions  
            setPlus={setPlus}
            values={values}
            isSelected={isSelected}
            setselected={setselected}
            cont={listaQuestoes.length}

             style={{bottom: 240, right: 40}} 
             />
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
        width: '90%',
        marginBottom: 5,
    },

    questao: {
        //alignItems: 'center',
        paddingHorizontal: '2%',
        paddingVertical: '1%',
        marginBottom: 20
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: '3%',
        alignSelf: 'center'
    },

    num:{
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 3
    },

    texte:{
        fontSize: 15,
        fontWeight: 'normal'
    },


    title: {
        fontSize: 20,
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
        marginBottom: 15,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width: '100%'
      },

    modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 15,
    width: '95%', 
    padding: 20,
    //paddingBottom: 50,
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