import React from 'react';
import { View, Picker, StyleSheet} from 'react-native';



const selectedUnidade = (props) => {
    const tematica = ['Numeros', 'Álgebra', 'Geometria', 'Gradezas e medidas', 'Probabilidade e estatística']
 
    return(
        <View style={Styles.select}>
            <Picker 
            style={{width: '100%', height: '100%'}}
            selectedValue={props.selectedValue}
            onValueChange={(itemValue, itemIndex) => { 
            props.onValueChange(itemValue)}}
            >
                <Picker.Item label='Selecione a Unidade temática' value='' />
            {
                (props.op != '0' && props.op != '')
                    ?tematica.map(tematica =>(
                        <Picker.Item key={tematica} label={tematica} value={tematica} />
                    ))
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


export default selectedUnidade;