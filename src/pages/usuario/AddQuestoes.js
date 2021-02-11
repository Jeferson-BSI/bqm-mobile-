import React, { useState } from 'react';
import { 
    View,
    Text,
    TouchableOpacity, 
    ScrollView, 
    StyleSheet, 
    TextInput,
    AsyncStorage,
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
import { Formik} from 'formik';
import * as yup from "yup";


const validationSchema = yup.object().shape({
    pergunta: yup
        .string()
        .required()
        .label('Pergunta')
        .min(8, 'Minimo de 8 caracteres!')
        .max(250, 'Maximo 250 caracteres!'),

    resposta: yup
        .string()
        .required()
        .label('Resposta')
        .min(8, 'Minimo de 8 caracteres!')
        .max(250, 'Maximo 250 caracteres!'),

    nivel: yup
        .string()
        .required()
        .label('Nível!'),

    etapa: yup
        .string()
        .required()
        .label('Etapa!'),
    
    ano: yup
        .string()
        .required()
        .label('Ano!'),

    unidade: yup
        .string()
        .required()
        .label('Unidade temática!'),

    conhecimento: yup
        .string()
        .required()
        .label('Objet de Conhecimento!'),
})


const AddQuestoes = () => {

    async function cadastarQuestao(values, resetForm) {
        let token = null
        let id = null
        try{
            token = await AsyncStorage.getItem('user_token')
            id = await AsyncStorage.getItem('user_id');
        }
        catch(erro){
            alert(erro+"ao recupera do storage")
        }
 
        const questao = {
            "status": "3",
            "etapa": values.etapa,
            "ano": values.ano,
            "unidade_tematica": values.unidade,
            "objeto_de_conhecimento": values.conhecimento,
            "nivel_de_dificuldade": values.nivel,
            "imagem": values.image,
            "pergunta": values.pergunta,
            "resposta": values.resposta,
            "cadastro_pelo_usuario": id
        }
        const questao2 = JSON.stringify(questao)
        try{
            const ApiGet = axios.create({
                baseURL: 'https://bq.mat.br/api/v1',
                timeout: 100,
                //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
                headers: {'Authorization': 'Token ' + token}
            });
            
            const response = await ApiGet.post('/questao/', questao);
            (response !== null)
            ?alert('Questão cadastrada com Sucesso!')
            :null
            resetForm(valoresIniciais)
        }
        catch(erro){
            alert(erro)
            alert('O correu um erro ao cadastra a questão!')
        }

    }

    const valoresIniciais = {
        pergunta: '',
        resposta: '',
        nivel: '',
        imagem: '',
        etapa: '',
        ano: '',
        unidade: '',
        conhecimento: '',
    }

    return(
        <View style={Styles.body}>

            <Nav>EPSILON</Nav>
            <Info>BQP {'>'} CADASTRAR {'>'} QUESTÃO</Info>

            <ScrollView 
            style={Styles.main}
            contentContainerStyle={Styles.ScrollStyle}>
                <Formik
                    //initialValues={{pergunta: '', resposta: '', nivel: ''}}
                    initialValues={valoresIniciais}
                    onSubmit={(values, {resetForm}) => {
                        //alert(JSON.stringify(values))
                        cadastarQuestao(values, resetForm)
                        //resetForm(valoresIniciais)
                    }}
                    validationSchema={validationSchema}
                >
                {formikProps => ( 
                    <>   
                    <View style={ Styles.contenerSelects }>

                        <Text style={Styles.text} >Etapa</Text>
                        <SelectedEtapa
                        //selectedValue={selectedEtapa}
                        //onValueChange={setSelectedEtapa}
                        formikKey={'etapa'}
                        formikProps={formikProps}
                        styleErro={Styles.styleErro}
                        />

                        <Text style={Styles.text} >Ano</Text>
                        <SelectedAno 
                        op={formikProps.values.etapa}
                        //selectedValue={selectedAno}
                        //onValueChange={setSelectedAno}
                        formikKey={'ano'}
                        formikProps={formikProps}
                        styleErro={Styles.styleErro}
                        />
        
                        <Text style={Styles.text} >Unidade temática</Text>
                        <SelectUnidade
                        // selectedValue={selectedUnidade}
                        // onValueChange={setSelectedUnidade}
                        op={{etapa: formikProps.values.etapa, ano: formikProps.values.ano}}
                        formikKey={'unidade'}
                        formikProps={formikProps}
                        styleErro={Styles.styleErro}                
                        />

                        <Text style={Styles.text} >Objeto de conhecimento</Text>
                        <SelectConhecimento
                        // selectedValue={selectedConhecimento}
                        // onValueChange={setSelectedConhecimento} 
                        op={{etapa: formikProps.values.etapa, ano: formikProps.values.ano, unidade: formikProps.values.unidade}}
                        formikKey={'conhecimento'}
                        formikProps={formikProps}
                        styleErro={Styles.styleErro}               
                        />
        
                        <Text style={Styles.text} >Nível de dificuldade</Text>
                        <SelectNivel
                        //op={selectedConhecimento}
                        op={formikProps.values.conhecimento}
                        formikKey={'nivel'}
                        formikProps={formikProps}
                        styleErro={Styles.styleErro}
                        //selectedValue={formikProps.values.nivel}
                        //selectedValue={selectedNivel}
                        //onValueChange={formikProps.setFieldValue}
                        //onValueChange={setSelectednivel}
                        />
                        <Text style={{color: "red"}}>{formikProps.touched.nivel && formikProps.errors.nivel}</Text>

                    </View>

                    <Text style={Styles.text}>URL da imagem, caso haja.</Text>
                    <FormRow>
                    <TextInput
                    style={ [Styles.textInput, {width: '100%'}] }
                    placeholderTextColor= { '#0b2639' }
                    placeholder='URL'
                    onChangeText={formikProps.handleChange('imagem')}
                    value={formikProps.values.imagem}
                    /> 
                
                    </FormRow>

                    <Text style={Styles.text}>Pergunta</Text>
                    <TextInput
                    style={ [Styles.textInput, Styles.textInputPR, (formikProps.touched.pergunta && formikProps.errors.pergunta)?Styles.styleErro: null ] }
                    placeholderTextColor= { '#0b2639' }
                    placeholder='Digite a pergunta aqui!'
                    textAlignVertical= 'top'
                    multiline={true}
                    //onChangeText={text => setPerguta(text)}
                    onChangeText={formikProps.handleChange('pergunta')}
                    value={formikProps.values.pergunta}
                    onBlur={formikProps.handleBlur('pergunta')}
                    //errorMessage={erroPergunta}
                    /> 
                    <Text style={{color: "red"}}>{formikProps.touched.pergunta && formikProps.errors.pergunta}</Text>

                    <Text style={Styles.text}>Resposta</Text>
                    <TextInput
                    style={ [Styles.textInput, Styles.textInputPR, (formikProps.touched.resposta && formikProps.errors.resposta)?Styles.styleErro: null ] }
                    placeholderTextColor= { '#0b2639' }
                    placeholder='Digite a respota aqui!'
                    //onChangeText={text => setResposta(text)}
                    textAlignVertical= 'top'
                    multiline= {true}
                    value={formikProps.values.resposta}
                    onBlur={formikProps.handleBlur('resposta')}
                    onChangeText={formikProps.handleChange('resposta')}
                    //errorMessage={erroResposta}
                    />

                    <Text style={{color: "red"}}>{formikProps.touched.resposta && formikProps.errors.resposta}</Text>
                    
                    {/* <Button title='subimit' onPress={formikProps.handleSubmit} /> */}

                    <TouchableOpacity 
                    style={Styles.bnt}
                    onPress={formikProps.handleSubmit}
                    // onPress={() => (
                    //     //salvar()
                    //     cadastarQuestao()
                    //     //alert( `${Questao.etapa} ${Questao.ano} ${Questao.unidade} ${Questao.conhecimento} ${Questao.nivel} ${Questao.imag} ${Questao.pergunta} ${Questao.resposta}`)
                    //     // alert('')
                    //     )}
                        >
                        <Text style={{color: 'white', fontSize: 18,}}> Cadastrar questão </Text> 
                    </TouchableOpacity>
                </>
                    )}
                </Formik>

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

    styleErro: {
        borderColor:'red'
    }
});


export default AddQuestoes;