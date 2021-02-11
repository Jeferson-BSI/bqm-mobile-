import React, {useState, useEffect } from 'react';
import { 
    View, 
    Picker, 
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import QuestionStorage from '../funções/QuestionStorage';


const selectedEtapa = (props) => {
    const {formikProps, formikKey, styleErro } = props
    const [ data, setData] = useState(null);
    
    async function getData(){
        try {
            let dados = await AsyncStorage.getItem('etapa');
            if(dados === null){
                QuestionStorage('etapa');
            }
    
            dados = await AsyncStorage.getItem('etapa');
            setData(JSON.parse(dados))
        }
        catch (erro){
            alert(erro)
        }  
    };

    useEffect(() =>{getData()}, [])

    return(

        <View style={[Styles.select, (formikProps.touched[formikKey] && formikProps.errors[formikKey])?styleErro: null]}>
            <Picker 
            style={{width: '100%', height: '100%'}}
            // selectedValue={props.selectedValue}
            // onValueChange={(itemValue) => {
            // props.onValueChange(itemValue)}}
            selectedValue={formikProps.values[formikKey]}
            onValueChange={value => {
                formikProps.setFieldValue(formikKey, value)
            }}
            >
            <Picker.Item label='Selecione a Etapa de Educação' value='' />
            {(data !== null)
                ?data.map(etapa =>(
                    <Picker.Item key={etapa.etapa} label={etapa.etapa_nome} value={etapa.etapa}/>
                ))
                :<Picker.Item label='Selecione a Etapa de Educação' value='' />
            }   
            {/* <Picker.Item label='Selecione a Etapa de Educação' value='' />
            <Picker.Item label='Educação infantil - Bebês ' value='1' />
            <Picker.Item label='Educação infantil - Crianças pequenas ' value='2' />
            <Picker.Item label='Educação infantil - Crianças pequenas' value='3' />
            <Picker.Item label='Ensino fundamental - Anos iniciais' value='4' />
            <Picker.Item label='Ensino fundamental - Anos finais' value='5' />
            <Picker.Item label='Ensino médio' value='6' />*/}
            </Picker> 
        </View>
        )
};



const Styles = StyleSheet.create({

    select: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: 'center',

        width: '90%',
        maxHeight: 40,
        marginBottom: 15,
        marginLeft: '2%',

        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#0b2639',


    },
});


export default selectedEtapa;