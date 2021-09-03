import React, {useState} from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback,
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import OptionModal from '../components/OptionModal';


export default function FabButtonPlus(props){
    const {setVisible5, setData, setPlus, setselected } = props
    const [plusVisible, setplusVisible] = useState(false);

    return(
        <View style={[styles.conteiner, props.style]}>
            <TouchableWithoutFeedback
                onPress={()=>setplusVisible(true)}
                >
                <View style={[styles.button, styles.menu]}>
                    <FontAwesome name='search-plus' size={30} color='#fff'/>
                </View>
            </TouchableWithoutFeedback>

            <OptionModal 
            texto='Deseja Buscar mais questões no bacon de dados?'
            isVisible={plusVisible}
            setVisible={setplusVisible}
            onPress={()=>{
                //setData([...listaQuestoes])
                setPlus(true)
                setselected(false)
                setData([])
                setplusVisible(false);
                setVisible5(true)
            }}
            onPress2={() => {
                setplusVisible(false);
            }}
            />
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
        width: 55,
        height: 55,
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
        backgroundColor: '#286090',
    }
});