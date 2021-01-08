import React, {useState, useEffect} from 'react';
import { View, Picker, StyleSheet, AsyncStorage} from 'react-native';
import axios from 'axios';

import QuestionStorage from '../funções/QuestionStorage';

const selectNivel = (props) => {
    const {op } = props

    const [ dataNivel, setData] = useState(null);
    
    async function getData(){
        try {
            let dados = await AsyncStorage.getItem('niveldedificuldade');
            if(dados === null){
                QuestionStorage('niveldedificuldade');
            }
    
            dados = await AsyncStorage.getItem('niveldedificuldade');
            setData(JSON.parse(dados))
        }
        catch (erro){
            alert(erro)
        }
    };

    useEffect(() =>{getData()}, [])
    
     
    return(
        <View style={Styles.select}>
            <Picker 
            style={{width: '100%', height: '100%'}}
            selectedValue={props.selectedValue}
            onValueChange={(itemValue) => { 
            props.onValueChange(itemValue)}}
            >

            <Picker.Item key={0} label='Nível de dificuldade' value='' />

            {
            (dataNivel !== null)
                ?(op.selectedConhecimento !== '')
                    ?dataNivel.map(nivel =>(
                                <Picker.Item 
                                key={nivel.nivel_de_dificuldade} 
                                label={nivel.nivel_de_dificuldade_nome} 
                                value={nivel.nivel_de_dificuldade} />
                            ))
                    :null
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


export default selectNivel;