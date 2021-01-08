import React, {useState, useEffect} from 'react';
import { View, Picker, StyleSheet, AsyncStorage} from 'react-native';
import QuestionStorage from '../funções/QuestionStorage';


const selectConhecimento = (props) => {
    const { op } = props
    const [ data, setData] = useState(null);

    async function getData(){
        try {
            let dados = await AsyncStorage.getItem('objetodeconhecimento');
            
            if(dados === null){
                QuestionStorage('objetodeconhecimento');
            }
    
            dados = await AsyncStorage.getItem('objetodeconhecimento');
            setData(JSON.parse(dados))
        }
        catch (erro){
            alert(erro)
        }
    };

    useEffect(() =>{getData()}, [])


    function PickerItems(){
        let dados = []
        for(let objeto of data){
            if(op.etapa == objeto.etapa && op.ano == objeto.ano && op.unidade == objeto.unidade_tematica){
                dados = dados.concat( 
                    <Picker.Item 
                    key={objeto.objeto_de_conhecimento} 
                    label={objeto.objeto_de_conhecimento_nome} 
                    value={objeto.objeto_de_conhecimento} />)
        }}

        return dados
    }

    return(
        <View style={Styles.select}>
            <Picker 
            style={{width: '100%', height: '100%'}}
            selectedValue={props.selectedValue}
            onValueChange={(itemValue) => { 
            props.onValueChange(itemValue)}}
            >
                <Picker.Item label='Selecione Objeto de Conhecimento' value='' />
                {/* {
                (op.unidade != '0' && op.unidade != '')
                    ?data.map(tematica =>{
                        if(op.etapa == tematica.etapa && op.ano == tematica.ano && op.unidade == tematica.unidade_tematica){
                            return(
                                <Picker.Item 
                                key={tematica.objeto_de_conhecimento} 
                                label={tematica.objeto_de_conhecimento_nome} 
                                value={tematica.objeto_de_conhecimento} />
                            )}
                        })
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


export default selectConhecimento;