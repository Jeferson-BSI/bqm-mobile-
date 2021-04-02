import React, {useState, useEffect}from 'react';
import { View, Picker, StyleSheet, AsyncStorage} from 'react-native';

import QuestionStorage from '../funções/QuestionStorage';


const selectedUnidade = (props) => {
    const {op, formikProps, formikKey, styleErro } = props
    const [ data, setData] = useState(null);

    async function getData(){
        try {
            let dados = await AsyncStorage.getItem('unidadetematica');
            if(dados === null){
                QuestionStorage('unidadetematica');
            }
    
            dados = await AsyncStorage.getItem('unidadetematica');

            //alert(dados)
            setData(JSON.parse(dados))
        }
        catch (erro){
            alert(erro)
        }

        //alert(data)
    };

    useEffect(() =>{getData()}, [])

    function PickerItems(){
        let dados = []
        for(let tematica of data){
            if(op.etapa == tematica.etapa && op.ano == tematica.ano){
                dados = dados.concat( <Picker.Item 
                    key={tematica.unidade_tematica} 
                    label={tematica.unidade_tematica_nome} 
                    value={tematica.unidade_tematica} />)
            }
        }

        return dados
    }

    return(
        <View style={[Styles.select, (formikProps.touched[formikKey] && formikProps.errors[formikKey])?styleErro: null]}>
            <Picker 
            style={{width: '100%', height: '100%'}}
            // selectedValue={props.selectedValue}
            // onValueChange={(itemValue) => { 
            //     props.onValueChange(itemValue)}}
            selectedValue={formikProps.values[formikKey]}
            onValueChange={value => {
                formikProps.setFieldValue(formikKey, value)
            }}
            >
            <Picker.Item key={0} label='Selecione a Unidade temática' value='' />
            {/* {
             (data !== null)
             //
                ?(op.etapa !== '' && op.ano !== '')
                    ?data.map(tematica =>{
                        let cont = 1
                        if(op.etapa == tematica.etapa && op.ano == tematica.ano){
                            return(
                                <Picker.Item 
                                key={tematica.unidade_tematica} 
                                label={tematica.unidade_tematica_nome} 
                                value={tematica.unidade_tematica} />
                                )}
                        })
                    :<Picker.Item key={0} label='Selecione a Unidade temática' value='' />
                :null
            } */}
            {
                (data !== null)
                    ?PickerItems()
                    :null
            }

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


export default selectedUnidade;