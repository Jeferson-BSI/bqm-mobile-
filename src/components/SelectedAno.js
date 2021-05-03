import React from 'react';
import { View, Picker, StyleSheet} from 'react-native';


const selectedAno = (props) => {
    //alert(props.selectedValue)
    const {formikProps, formikKey, styleErro } = props


    const PickerItem = (i,f) => {
        const list = [<Picker.Item  key={0} label='Selecione o ano' value='' />]
            for ( i ; i <= f; i++){
                list.push(<Picker.Item key={i}label={`${i}`} value={i} />);
            }
            return list
        }
     

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

            {(props.op=='4')
                ?PickerItem(1,6)
                :(props.op=='5')
                    ?PickerItem(7,9)
                    :PickerItem()}
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


export default selectedAno;
