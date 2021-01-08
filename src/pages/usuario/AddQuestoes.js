import React, { useState } from 'react';
import { View,
    Text,
    TouchableOpacity, 
    ScrollView, 
    StyleSheet, 
    TextInput,
    AsyncStorage
} from 'react-native';
import Nav from '../../components/Nav';
import Info from '../../components/Info';
import SelectedEtapa from '../../components/SelectedEtapa';
import SelectedAno from '../../components/SelectedAno';
import SelectUnidade from '../../components/SelectUnidade';
import SelectConhecimento from '../../components/SelectConhecimento';
import SelectNivel from '../../components/SelectNivel';
import FormRow from '../../components/FormRow';
import axios from 'axios';

const AddQuestoes = () => {


    const [ selectedEtapa, setSelectedEtapa ] = useState('')
    const [ selectedAno, setSelectedAno ] = useState('')
    const [ selectedUnidade, setSelectedUnidade ] = useState('')
    const [ selectedConhecimento, setSelectedConhecimento ] = useState('')
    const [ selectedNivel, setSelectednivel ] = useState('')
    const [ urlImag, setUrlImage ] = useState(null)
    const [ pergunta, setPerguta ] = useState('')
    const [ resposta, setResposta ] = useState('')
    const [ idUser, setIdUser ] = useState(null)
    const status = 3

    const questao = {
        "status": "3",
        "etapa": selectedEtapa,
        "ano": selectedAno,
        "unidade_tematica": selectedUnidade,
        "objeto_de_conhecimento": selectedConhecimento,
        "nivel_de_dificuldade": selectedNivel,
        "imagem": urlImag,
        "pergunta": pergunta,
        "resposta": resposta,
        "cadastro_pelo_usuario": idUser
    }


    async function cadastarQuestao() {
        let token = null
        let id = null
        try{
            token = await AsyncStorage.getItem('user_token')
            id = await AsyncStorage.getItem('user_id');
            setIdUser(parseInt(id))
        }
        catch(erro){
            alert(erro+"ao recupera do storage")
        }
        //alert(token)

        try{
            const ApiGet = axios.create({
                baseURL: 'https://bq.mat.br/api/v1',
                timeout: 300,
                //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
                headers: {'Authorization': 'Token ' + token}
            });
            //alert(JSON.stringify(questao))
            const response = await ApiGet.post('/questao/',questao);
            (response !== null)
            ?alert('Questão cadastrada com Sucesso!')
            :null
        }
        catch(erro){
            alert('O correu um erro ao cadastra a questão!')
        }
    }

    return(
        <View style={Styles.body}>

            <Nav>EPSILON</Nav>
            <Info>BQP {'>'} CADASTRAR {'>'} QUESTÃO</Info>

            <ScrollView 
            style={Styles.main}
            contentContainerStyle={Styles.ScrollStyle}>
                <View style={ Styles.contenerSelects }>

                    <Text style={Styles.text} >Etapa</Text>
                    <SelectedEtapa
                    selectedValue={selectedEtapa}
                    onValueChange={setSelectedEtapa}/>

                    <Text style={Styles.text} >Ano</Text>
                    <SelectedAno 
                    selectedValue={selectedAno}
                    op={selectedEtapa}
                    onValueChange={setSelectedAno}/>
    
                    <Text style={Styles.text} >Unidade temática</Text>
                    <SelectUnidade
                    selectedValue={selectedUnidade}
                    op={{etapa: selectedEtapa, ano: selectedAno}}
                    onValueChange={setSelectedUnidade}                
                    />

                    <Text style={Styles.text} >Objeto de conhecimento</Text>
                    <SelectConhecimento
                    selectedValue={selectedConhecimento}
                    op={{etapa: selectedEtapa, ano: selectedAno, unidade: selectedUnidade}}
                    onValueChange={setSelectedConhecimento}                
                    />
    
                    <Text style={Styles.text} >Nível de dificuldade</Text>
                    <SelectNivel
                    op={selectedConhecimento}
                    selectedValue={selectedNivel}
                    onValueChange={setSelectednivel}
                    />
                </View>

                <Text style={Styles.text}>URL da imagem, caso haja.</Text>
                <FormRow>
                <TextInput
                style={ [Styles.textInput, {width: '100%'}] }
                placeholderTextColor= { '#0b2639' }
                placeholder='URL'
                onChangeText={text => setUrlImage(text)}
                value={urlImag}
                /> 
                </FormRow>

                <Text style={Styles.text}>Pergunta</Text>
                <TextInput
                style={ [Styles.textInput, Styles.textInputPR] }
                placeholderTextColor= { '#0b2639' }
                placeholder='Digite a pergunta aqui!'
                textAlignVertical= 'top'
                multiline={true}
                onChangeText={text => setPerguta(text)}
                value={pergunta}
                /> 

                <Text style={Styles.text}>Resposta</Text>
                <TextInput
                style={ [Styles.textInput, Styles.textInputPR] }
                placeholderTextColor= { '#0b2639' }
                placeholder='Digite a respota aqui!'
                onChangeText={text => setResposta(text)}
                textAlignVertical= 'top'
                multiline= {true}
                value={resposta}
                />

                <TouchableOpacity 
                style={Styles.bnt}
                onPress={() => (
                    cadastarQuestao()
                    //alert( `${Questao.etapa} ${Questao.ano} ${Questao.unidade} ${Questao.conhecimento} ${Questao.nivel} ${Questao.imag} ${Questao.pergunta} ${Questao.resposta}`)
                   // alert('')
                )}
                >
                    <Text style={{color: 'white', fontSize: 18,}}> Cadastrar questão </Text> 
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
};


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
        backgroundColor: '#f8f8f8',
        width: '100%'
    },

    ScrollStyle: {
        alignItems: 'center', 
        justifyContent: 'center',
    },

    contenerSelects: {
        width: '100%', 
        alignItems: 'center',
        paddingVertical: '2%'
    },

    text: {
        alignSelf: 'flex-start',
        color:'#0b2639',
        fontSize: 17,
        fontWeight: 'bold',


        paddingLeft: '5%',
        marginBottom: 5
    },

    textInput: {
        fontSize: 17,
        padding: 10,
        borderRadius: 10,
        width: '90%',
        height: 50,
        borderWidth: 2,
        borderColor: '#0b2639',
    },

    textInputPR: {
        height: 150, 
        marginBottom: 10
    },

    bnt:{
        fontSize: 30,
        fontWeight: 'bold',
        color:'#0b2639',
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        width: '90%',
        height: 45,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#002907',
        backgroundColor: '#0b2639',
        elevation: 3,
    },

});


export default AddQuestoes;