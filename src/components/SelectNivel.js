import React from 'react';
import { View, Picker, StyleSheet} from 'react-native';


const selectNivel = (props) => {
     
    return(
        <View style={Styles.select}>
            <Picker 
            style={{width: '100%', height: '100%'}}
            selectedValue={props.selectedValue}
            onValueChange={(itemValue, itemIndex) => { 
            props.onValueChange(itemValue)}}
            >
            {(props.op != '0')
                ?[
                 <Picker.Item key={1} label='Fácil' value='Fácil' />,
                 <Picker.Item key={2} label='Médio' value='Médio' />,
                 <Picker.Item key={3} label='Difícil' value='Difícil' />]
                :<Picker.Item label='Selecione o Nível' value='' />
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