import React, { useState, useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity,
    Button,
    Alert
} from 'react-native';
import Nav from '../../components/Nav';
import Info from '../../components/Info';
import QuestaoAvaliacao from '../../components/QuestaoAvaliacao';
import FabButtonAvaliacao from '../../components/FabButtonAvaliacao';
import axios from  'axios';
import {RNHTMLtoPDF} from 'react-native-html-to-pdf';
//import Pdf from 'react-native-pdf';
import Modal from 'react-native-modal';
import { number } from 'yup/lib/locale';



// Para instalar as bibliotecas necessárias basta executar: 'yarn add react-native-modal or npm i react-native-modal.' 
function ListarQuestoes({route}) {
    const { values } =  route.params
    const [data, setData] = useState([]);
    const [listaQuestoes, setQuestoes] = useState([]);
    const [isVisible, setVisible] = useState(false)
    let num = 0

    async function getQuestoes(){
        const token = await AsyncStorage.getItem('user_token')
        const id = await AsyncStorage.getItem('user_id')
        
        const options= {
            'status': 3,
            'cadastro_pelo_usuario': id,
            'etapa' : values.etapa,
            'ano' : values.ano,
            'unidade_tematica':  values.unidade,
            'objeto_de_conhecimento':  values.conhecimento,
            'nivel_de_dificuldade':  values.nivel,
        }
        //alert(JSON.stringify(options))
       
        const ApiGet = axios.create({
            baseURL: 'https://bq.mat.br/api/v1',
            timeout: 100,
            //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
            headers: {'Authorization': 'Token ' + token},
            data: options
        });
        
        try{
            const response = await ApiGet.get(`/questao/`, {
                'status': 3,
                'cadastro_pelo_usuario': id,
                'etapa' : 4,
                'ano' : 2,
                'unidade_tematica':  6,
                'objeto_de_conhecimento':  18,
                'nivel_de_dificuldade':  1,
            })
            const { results } = response.data
            setData(results);
        }
        catch(erro) {
            alert(erro)
        }

        // const geraPDF = () => `<div>
        // <span>Hi Jeferson, how are you?
        // </span>
        // </div>`;
    
        // const html = geraPDF()
    
        // const options = {html,
        //     fileName: "test",
        //     directory: "Documents"
        //     };
        //     async function createPDF(){
        //         var file = await RNHTMLtoPDF.convert(options);
        //         var pdfSource = { uri: file.filePath };
        //     }
        //     createPDF()
        // try{
        //     let options = {
        //       html: '<h1>PDF TEST</h1>',
        //       fileName: 'test',
        //       directory: './data/',
        //     };
        
        //     let file1 = await RNHTMLtoPDF.convert(options)
        //     alert('oi')
        //     // console.log(file.filePath);
        //     setFile(file1)
        //     alert(file1.filePath);
        // }
        // catch(err){
        //     alert(err)
        // }
    }

    useEffect(() =>{getQuestoes()}, [])


    return (
        <View style={styles.body}>
            <Nav>EPSILON</Nav>

            <Info>BQP  {'>'} SELECIONAR QUESTÕES </Info>

            <View style={styles.main}>
                <ScrollView style={styles.conteinerQuestoes}
                    showsVerticalScrollIndicator={false}
                >
                    {
                        data.map(questao => (
                            <QuestaoAvaliacao key={questao.id } data={questao} list={listaQuestoes} setList={setQuestoes}/>
                        ))
                    }
{/* 
                    <Pdf
                    source={pdfSource}
                    /> */}

                </ScrollView>
            </View>
            <Modal isVisible={ isVisible }>
                <View style={ {backgroundColor: 'white', height: '100%',}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>AVALIAÇÃO</Text>
                    {
                        //alert(JSON.stringify(listaQuestoes))
                        listaQuestoes.map(questao => {
                            return(
                                <View key={num++} style={styles.questao}>

                                    <Text style={styles.num}>{num}) <Text style={styles.texte}>{questao.pergunta}</Text></Text>
                                    <Text style={styles.num}>   R: <Text style={styles.texte}>{questao.resposta}</Text></Text>
                                </View>
                                )
                        })
                    }
                    </ScrollView>

                    <TouchableOpacity onPress={() => { setVisible(false)}}>
                        <Button color='#0b2639' title='Fechar' onPress={() => { setVisible(false)}}/>
                    </TouchableOpacity>
                </View>
            </Modal>

            <FabButtonAvaliacao  setVisible={setVisible} isVisible={isVisible} style={{bottom: 80, right: 60}} list={listaQuestoes}/>
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
    },

    questao: {
        //alignItems: 'center',
        paddingHorizontal: '2%',
        paddingVertical: '1%',
        marginBottom: 2
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: '3%',
        alignSelf: 'center'
    },

    num:{
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 3
    },

    texte:{
        fontSize: 15,
        fontWeight: 'normal'
    }


});


export default ListarQuestoes;