import React from 'react';
import { View, Picker, StyleSheet} from 'react-native';



const selectedUnidade = (props) => {
    const {data, op, fun} = props
    const { pages } = JSON.parse(data)
        let pickerItem = null
    if(op.etapa != '0' || op.etapa != ''){
            pickerItem = pages.map(tematica =>{
                if(op.etapa == tematica.etapa && op.ano == tematica.ano){
                    return(
                        <Picker.Item 
                        key={tematica.unidade_tematica} 
                        label={tematica.unidade_tematica_nome} 
                        value={tematica.unidade_tematica} />
                        )}
                })}
                else{ pickerItem = null}
    
    return(
        <View style={Styles.select}>
            <Picker 
            style={{width: '100%', height: '100%'}}
            selectedValue={props.selectedValue}
            //onValueChange={(i) => 'gsh'}
             onValueChange={(itemValue) =>( 
             fun(itemValue))}
            >
            {/* <Picker.Item key={0} label='Selecione a Unidade temática' value='' /> */}
            {pickerItem}
            {/* {
            (op.etapa != '0' || op.etapa != '')
                ?pages.map(tematica =>{
                    if(op.etapa == tematica.etapa && op.ano == tematica.ano){
                        return(
                            <Picker.Item 
                            //key={tematica.unidade_tematica} 
                            label={tematica.unidade_tematica_nome} 
                            value={tematica.unidade_tematica} />
                            )}
                    })
                :null
            } */}

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