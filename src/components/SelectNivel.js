import React from 'react';
import { View, Picker, StyleSheet} from 'react-native';


const selectNivel = (props) => {
    const {data, op } = props
    const { results } = JSON.parse(data)
     
    return(
        <View style={Styles.select}>
            <Picker 
            style={{width: '100%', height: '100%'}}
            selectedValue={props.selectedValue}
            onValueChange={(itemValue, itemIndex) => { 
            props.onValueChange(itemValue)}}
            >
            {
            (op != '0' || op != '')
                ?results.map(tematica =>(
                            <Picker.Item 
                            key={tematica.nivel_de_dificuldade} 
                            label={tematica.nivel_de_dificuldade_nome} 
                            value={tematica.nivel_de_dificuldade} />
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


export default selectNivel;