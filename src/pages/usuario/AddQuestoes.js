import React, { useState } from 'react';
import { 
    View,
    Text,
    TouchableOpacity, 
    ScrollView, 
    StyleSheet, 
    TextInput,
    AsyncStorage,
    Button
} from 'react-native';
import { Formik } from 'formik';
import axios from 'axios';
import * as yup from "yup";
import InfoModal from '../../components/InfoModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';


import Nav from '../../components/Nav';
import Info from '../../components/Info';
import SelectedEtapa from '../../components/SelectedEtapa';
import SelectedAno from '../../components/SelectedAno';
import SelectUnidade from '../../components/SelectUnidade';
import SelectConhecimento from '../../components/SelectConhecimento';
import SelectNivel from '../../components/SelectNivel';
import FormRow from '../../components/FormRow';
import Axios from 'axios';
import { set } from 'react-native-reanimated';


const validationSchema = yup.object().shape({
    pergunta: yup
        .string()
        .required("*obrigatorio")
        .label('Pergunta')
        .min(8, 'Minimo de 8 caracteres!')
        .max(1000, 'Maximo 500 caracteres!'),

    resposta: yup
        .string()
        .required("*obrigatorio")
        .label('Resposta')
        .min(8, 'Minimo de 8 caracteres!')
        .max(1000, 'Maximo 500 caracteres!'),

    nivel: yup
        .string()
        .required("*obrigatorio")
        .label('Nível!'),

    etapa: yup
        .string()
        .required("*obrigatorio")
        .label('Etapa!'),
    
    ano: yup
        .string()
        .required("*obrigatorio")
        .label('Ano!'),

    unidade: yup
        .string()
        .required("*obrigatorio")
        .label('Unidade temática!'),

    conhecimento: yup
        .string()
        .required("*obrigatorio")
        .label('Objet de Conhecimento!'),
});

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


const AddQuestoes = () => {
    const [ isVisible, setVisible ] = useState(false);
    const [ imgData, setImgData ] = useState();
    const [ imgUri, setImgUri ] = useState('');
    


    async function imagePickerCall(){
        const data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });
        //console.log(data);

        if(data.cancelled){
            return;
        }
        
        if(!data.uri){
            return;
        }
        setImgData(data)
    }

    async function uploadImage(){
        let token = null;

        const data = new FormData();
            token = await AsyncStorage.getItem('user_token')

        data.append('upload', {
            "name": "1c544f80",
            "uri": imgData.uri,
            "type": imgData.type,
        })

        data.append('upload', {
            "name": "1c544f80",
            "uri": imgData.uri,
            "type": imgData.type,
        })
        //alert(token)
        const Apipost = axios.create({
        baseURL: 'http://10.0.2.2:8000/api/v1',//'https://beta.bq.mat.br/api/v1',
        timeout: 100,
            headers: {'Authorization': 'Token ' + token},
            headers: {'Content-Type': 'multipart/form-data'},
          });

        try{
         // console.log(JSON.stringify( data));
          const response = await Apipost.post('/upload/', {data});
          console.log(response);
          alert(response);
        }
        catch(err_){
            alert(err_);
        }
    
    }

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

        try{
            const ApiGet = axios.create({
                baseURL: 'http://10.0.2.2:8000/api/v1', //'https://bq.mat.br/api/v1',
                timeout: 100,
                //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
                headers: {'Authorization': 'Token ' + token}
            });
            
            const response = await ApiGet.post('/questao/', questao);
            (response !== null)
            ?setVisible(true)
            :null
            resetForm(valoresIniciais)
        }
        catch(erro){
            alert(erro)
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
                <Formik
                    initialValues={valoresIniciais}
                    onSubmit={(values, {resetForm}) => {
                        cadastarQuestao(values, resetForm)
                    }}
                    validationSchema={validationSchema}
                >
                {formikProps => ( 
                    <>   
                    <View style={ Styles.contenerSelects }>

                        <Text style={Styles.text} >Etapa</Text>
                        <SelectedEtapa
                        formikKey={'etapa'}
                        formikProps={formikProps}
                        styleErro={Styles.styleErro}
                        />

                        <Text style={Styles.text} >Ano</Text>
                        <SelectedAno 
                        op={formikProps.values.etapa}
                        formikKey={'ano'}
                        formikProps={formikProps}
                        styleErro={Styles.styleErro}
                        />
        
                        <Text style={Styles.text} >Unidade temática</Text>
                        <SelectUnidade
                        op={{etapa: formikProps.values.etapa, ano: formikProps.values.ano}}
                        formikKey={'unidade'}
                        formikProps={formikProps}
                        styleErro={Styles.styleErro}                
                        />

                        <Text style={Styles.text} >Objeto de conhecimento</Text>
                        <SelectConhecimento
                        op={{etapa: formikProps.values.etapa, ano: formikProps.values.ano, unidade: formikProps.values.unidade}}
                        formikKey={'conhecimento'}
                        formikProps={formikProps}
                        styleErro={Styles.styleErro}               
                        />
        
                        <Text style={Styles.text} >Nível de dificuldade</Text>
                        <SelectNivel
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

                    <TouchableOpacity style={Styles.imgStyle} onPress={imagePickerCall}>
                        <MaterialCommunityIcons name='image-plus' color='#286090' size={30}/>
                        <Text style={[Styles.text, {paddingRight: 15, fontSize: 15} ]}>Adicionar imagem</Text>
                    </TouchableOpacity>

{/*                     
                    <Text style={Styles.text}>URL da imagem, caso haja.</Text>
                    <FormRow>
                    <TextInput
                        style={ [Styles.textInput, {width: '100%'}] }
                        placeholderTextColor= { '#0b2639' }
                        placeholder='URL'
                        onChangeText={formikProps.handleChange('imagem')}
                        value={formikProps.values.imagem}
                    /> 
                
                    </FormRow> */}

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
                    /> 
                    <Text style={{color: "red"}}>{formikProps.touched.pergunta && formikProps.errors.pergunta}</Text>

                    <Text style={Styles.text}>Resposta</Text>
                    <TextInput
                        style={ [Styles.textInput, Styles.textInputPR, (formikProps.touched.resposta && formikProps.errors.resposta)?Styles.styleErro: null ] }
                        placeholderTextColor= { '#0b2639' }
                        placeholder='Digite a respota aqui!'
                        textAlignVertical= 'top'
                        multiline= {true}
                        value={formikProps.values.resposta}
                        onBlur={formikProps.handleBlur('resposta')}
                        onChangeText={formikProps.handleChange('resposta')}
                    />

                    <Text style={{color: "red"}}>{formikProps.touched.resposta && formikProps.errors.resposta}</Text>
                    
                    <TouchableOpacity 
                    style={Styles.bnt}
                    onPress={formikProps.handleSubmit}
                        >
                        <Text style={{color: 'white', fontSize: 18,}}> Cadastrar questão </Text> 
                    </TouchableOpacity>
                </>
                    )}
                </Formik>
            </ScrollView>
            <Button
            onPress={uploadImage}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />

            <InfoModal 
             isVisible={isVisible}
             texto={'Maravilha! Questão registrada com sucesso!'}
             onPress={() => setVisible(!isVisible)}
             option={'OK'}
             />
        </View>
    )
};


const Styles = StyleSheet.create({

    body: {
        flex: 1,
        //backgroundColor: '#f8f8f8',
        backgroundColor: '#e8f0ff',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },

    main: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        width: '90%',
        marginBottom: 5,

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
        marginBottom: 10,
        backgroundColor: '#fff',

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
    },

    imgStyle: {
        padding: 10,
        alignItems: 'center',
        borderColor: '#e8f0ff',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#e8f0ff',
        marginBottom: 5,
        elevation: 5

    }
});


export default AddQuestoes;