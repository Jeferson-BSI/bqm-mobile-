import React from 'react';
import { 
    View,
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback,
} from 'react-native';


export default function FabButtonQuestions(props){
    const {setselected, cont, setPlus, isSelected, setInfo, info } = props

    return(
        <View style={[styles.conteiner, props.style]}>
            <TouchableWithoutFeedback
                onPress={()=>{
                    setPlus(false)
                    setInfo(!info)
                    setselected(!isSelected)
                }}
                >
                <View style={[styles.button, styles.menu]}>
                <Text style={styles.text}>{cont}</Text>
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
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#286090',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10
        }
    },

    menu: {
        backgroundColor: '#286090',
    },

    text: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '700',
    }
});