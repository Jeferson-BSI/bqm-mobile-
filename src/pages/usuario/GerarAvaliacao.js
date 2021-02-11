import React, { useState } from 'react';
import { 
    View,
    Text,
    TouchableOpacity, 
    ScrollView, 
    StyleSheet, 
} from 'react-native';

import Nav from '../../components/Nav';
import Info from '../../components/Info';
import SelectedEtapa from '../../components/SelectedEtapa';
import SelectedAno from '../../components/SelectedAno';
import SelectUnidade from '../../components/SelectUnidade';
import SelectConhecimento from '../../components/SelectConhecimento';
import SelectNivel from '../../components/SelectNivel';
import { Formik } from 'formik';
import * as yup from "yup";


const validationSchema = yup.object().shape({
    nivel: yup
        .string()
        .label('Nível!'),
        //.required(),

    etapa: yup
        .string()
        .label('Etapa!'),
        //.required(),
    
    ano: yup
        .string()
        .label('Ano!'),
        //.required(),

    unidade: yup
        .string()
        .label('Unidade temática!'),
        //.required(),

    conhecimento: yup
        .string()
        .label('Objet de Conhecimento!')
        // .required(),
})



const GerarAvaliacao = ({navigation}) => {

    // let Questao = {
    //     etapa: selectedEtapa,
    //     ano: selectedAno,
    //     unidade: selectedUnidade,
    //     conhecimento: selectedConhecimento,
    //     nivel: selectedNivel,
    // }

    const valoresIniciais = {
        nivel: '',
        etapa: '',
        ano: '',
        unidade: '',
        conhecimento: '',
    }


    return(
        <View style={Styles.body}>

            <Nav>EPSILON</Nav>
            <Info>GERAR AVALIAÇÃO</Info>

            <ScrollView 
             style={Styles.main}
             contentContainerStyle={Styles.ScrollStyle}
             >
                <Formik
                initialValues={valoresIniciais}
                onSubmit={values => {
                    //alert(JSON.stringify(values))
                    navigation.navigate('Avaliacao',{ values: values})
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
                        />

                        </View>

                        <View style={ Styles.touchable }>
                            <TouchableOpacity 
                                style={Styles.bnt}
                                // onPress={() =>(
                                // alert("Buscar no BQP")
                                // )}
                                onPress={formikProps.handleSubmit}
                                >
                                <Text style={Styles.bntText}> Buscar no BQP </Text> 
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={Styles.bnt}
                                // onPress={() =>(
                                // alert("Buscar no BQM")
                                // )}
                                onPress={formikProps.handleSubmit}
                                >
                                <Text style={Styles.bntText}> Buscar no BQM </Text> 
                            </TouchableOpacity>
                        </View>
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

    touchable: {
        alignItems: "center",
        width: '100%',
        backgroundColor: '#f8f8f8',
    },

    bnt:{
        alignItems: "center",
        justifyContent: "center",

        width: '90%',
        height: 50,
        marginVertical: '2%',


        borderWidth: 2,
        borderColor: '#002907',
        backgroundColor: '#ebebeb',//'#e8e8e8'//'#F4F5F6',
        elevation: 5,
        borderRadius: 8,
    },

    bntText: {
        color:'#0b2639',
        fontSize: 20,
        fontWeight: 'bold',
    },
    
    styleErro: {
        borderColor:'red'
    }

});


export default GerarAvaliacao;