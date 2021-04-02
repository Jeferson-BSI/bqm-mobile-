import React from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback,
} from 'react-native';
import {AntDesign} from '@expo/vector-icons';


export default function FabButtonAvaliacao(props){
    const {list, isVisible, setVisible, setVisible2 } = props
    


    return(
        <View style={[styles.conteiner, props.style]}>
            <TouchableWithoutFeedback
                //onPress={()=>setVisible(!isVisible)}
                onPress={()=>setVisible2(true)}

                >
                <View style={[styles.button, styles.menu]}>
                    <AntDesign name='pdffile1' size={30} color='#fff'/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}


const styles = StyleSheet.create({
    conteiner: {
        alignItems: 'center',
        position: 'absolute',
    },

    button:{
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#00213b',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10
        }
    },

    menu: {
        backgroundColor: '#00213b',
    }
});