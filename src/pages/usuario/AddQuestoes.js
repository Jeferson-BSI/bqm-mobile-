import React, { useState } from 'react';
import { View,
    Text,
    TouchableOpacity, 
    ScrollView, 
    StyleSheet, 
    TextInput} 
    from 'react-native';
import Nav from '../../components/Nav';
import Info from '../../components/Info';
import SelectedEtapa from '../../components/SelectedEtapa';
import SelectedAno from '../../components/SelectedAno';
import SelectUnidade from '../../components/SelectUnidade';
import SelectConhecimento from '../../components/SelectConhecimento';
import SelectNivel from '../../components/SelectNivel';
import FormRow from '../../components/FormRow';



const AddQuestoes = () => {
    const [ selectedEtapa, setSelectedEtapa ] = useState('0')
    const [ selectedAno, setSelectedAno ] = useState('0')
    const [ selectedUnidade, setSelectedUnidade ] = useState('0')
    const [ selectedConhecimento, setSelectedConhecimento ] = useState('0')
    const [ selectedNivel, setSelectednivel ] = useState('0')
    const [ urlImag, setUrlImage ] = useState(null)
    const [ pergunta, setPerguta ] = useState('')
    const [ resposta, setResposta ] = useState('')

    const Questao = {
        etapa: selectedEtapa,
        ano: selectedAno,
        unidade: selectedUnidade,
        conhecimento: selectedConhecimento,
        nivel: selectedNivel,
        imag: urlImag,
        pergunta: pergunta,
        resposta: resposta
    }

    return(
        <View style={Styles.body}>

            <Nav>EPSILON</Nav>
            <Info>BQP {'>'} CADASTRAR {'>'} QUESTÃO</Info>

            <ScrollView 
            style={Styles.main}
            contentContainerStyle={Styles.ScrollStyle}>

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
                op={selectedAno}
                onValueChange={setSelectedUnidade}                
                />

                <Text style={Styles.text} >Objeto de conhecimento</Text>
                <SelectConhecimento
                selectedValue={selectedConhecimento}
                op={selectedUnidade}
                onValueChange={setSelectedConhecimento}                
                />

                <Text style={Styles.text} >Nível de dificuldade</Text>
                <SelectNivel
                op={selectedConhecimento}
                selectedValue={selectedNivel}
                onValueChange={setSelectednivel}
                />

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
                    alert( `${Questao.etapa} ${Questao.ano} ${Questao.unidade} ${Questao.conhecimento} ${Questao.nivel} ${Questao.imag} ${Questao.pergunta} ${Questao.resposta}`)
                )}
                >
                    <Text style={{color: 'white', fontSize: 18,}}> Cadastrar questao </Text> 
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
        marginTop: 0,
        backgroundColor: '#f8f8f8',
        width: '100%'
    },

    ScrollStyle: {
        alignItems: 'center', 
        justifyContent: 'center',
    },

    select: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: 'center',
        width: '90%',
        maxHeight: 40,
        color: 'red',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#0b2639',
        elevation: 3,

        //backgroundColor: 'red'
    },

    text: {
        alignSelf: 'flex-start',
        color:'#0b2639',
        fontSize: 17,

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