import React from 'react';
import { View, Picker, StyleSheet} from 'react-native';


const selectConhecimento = (props) => {
    const {data, op } = props
    const { pages } = JSON.parse(data)

    return(
        <View style={Styles.select}>
            <Picker 
            style={{width: '100%', height: '100%'}}
            selectedValue={props.selectedValue}
            onValueChange={(itemValue) => { 
            props.onValueChange(itemValue)}}
            >
                <Picker.Item label='Objeto de Conhecimento' value='' />
                {
                (op.unidade != '0' || op.unidade != '')
                    ?pages.map(tematica =>{
                        if(op.etapa == tematica.etapa && op.ano == tematica.ano && op.unidade == tematica.unidade_tematica){
                            return(
                                <Picker.Item 
                                key={tematica.objeto_de_conhecimento} 
                                label={tematica.objeto_de_conhecimento_nome} 
                                value={tematica.objeto_de_conhecimento} />)}
                        })
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
        color: 'red',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#0b2639',
        marginBottom: 15
    },
});


export default selectConhecimento;