import React from 'react';
import { View, 
    Picker, 
    StyleSheet,
    AsyncStorage,
    Alert

} from 'react-native';


const selectedEtapa = (props) => {
    const { results } = JSON.parse(props.data)

    return(

        <View style={Styles.select}>
            <Picker 
            style={{width: '100%', height: '100%'}}
            selectedValue={props.selectedValue}
            onValueChange={(itemValue, itemIndex) => { 
            props.onValueChange(itemValue)}}
            >
            <Picker.Item label='Selecione a Etapa de Educação' value='' />
            {(results !== null)
                ?results.map(etapa =>(
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
        color: 'red',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#0b2639',
        elevation: 3,
        marginBottom: 15

    },
});


export default selectedEtapa;