import React from 'react';
import { 
    View,
    Text,
    TouchableOpacity, 
    ScrollView, 
    StyleSheet, 
} from 'react-native';

import SelectedEtapa from '../../components/SelectedEtapa';
import SelectedAno from '../../components/SelectedAno';
import SelectUnidade from '../../components/SelectUnidade';
import SelectConhecimento from '../../components/SelectConhecimento';
import SelectNivel from '../../components/SelectNivel';
import Modal from 'react-native-modal';

import { Formik } from 'formik';
import * as yup from "yup";


const validationSchema = yup.object().shape({
    nivel: yup
        .string()
        .label('Nível!'),

    etapa: yup
        .string()
        .label('Etapa!'),
    
    ano: yup
        .string()
        .label('Ano!'),

    unidade: yup
        .string()
        .label('Unidade temática!'),

    conhecimento: yup
        .string()
        .label('Objet de Conhecimento!')
})


const PlusQuestion = (props) => {
 const {setVisible, isVisible,  getQuestoes } = props;

    const valoresIniciais = {
        status: '',
        etapa: '',
        ano: '',
        unidade: '',
        conhecimento: '',
        nivel: '',
    }


    return(
        <Modal isVisible={isVisible} 
        animationType={"fade"}
        transparent={true}
        onRequestClose={() => {
            setVisible(!isVisible);
        }}
        >
            <View style={Styles.centeredView}>
            <ScrollView 
             style={Styles.modalView}
             contentContainerStyle={Styles.ScrollStyle}
             >
                <Formik
                initialValues={valoresIniciais}
                onSubmit={(values, { resetForm }) => {
                    setVisible(!isVisible)
                    resetForm(values)
                    getQuestoes(values)
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
                                onPress={() => {
                                    formikProps.setFieldValue('status', '3')
                                    formikProps.handleSubmit()
                                }}
                                >
                                <Text style={Styles.bntText}> Buscar no BQP </Text> 
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={Styles.bnt}
                                onPress={() => {
                                    formikProps.setFieldValue('status', '2')
                                    formikProps.handleSubmit()
                                }}
                                >
                                <Text style={Styles.bntText}> Buscar no BQM </Text> 
                            </TouchableOpacity>
                        </View>
                    </>
                    )}
                </Formik>

            </ScrollView>
            </View>
        </Modal>
    )
};


const Styles = StyleSheet.create({

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
        marginVertical: '3%',


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
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width: '100%'
      },

});


export default PlusQuestion;