import React, {useState} from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback,
} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import DeleteQuestoes from '../funções/DeleteQuestoes';
import OptionModal from '../components/OptionModal';



export default function FabButton(props){
    const { list, setList, data, setData  } = props
    const questoes = [...data]
    const listaQuestoes = [...list]
    const [ isVisible, setVisible] = useState(false);


    function Deletar(){
        setVisible(!isVisible);
        if(list.length == 0){
            return 
        }

        for (let ind in list) {
            const id = list[ind].id
            DeleteQuestoes(id);
            listaQuestoes.splice(listaQuestoes.indexOf(list[ind]), 1);
            questoes.splice(questoes.indexOf(list[ind]), 1)
        }

        setList(listaQuestoes)

        if(listaQuestoes.length == 0){
            //alert('Questões deletadas');
            setData(questoes)
        }
    }


    return(
        <View style={[styles.conteiner, props.style]}>
            <TouchableWithoutFeedback
                onPress={()=> setVisible(!isVisible)}
                >
                <View style={[styles.button, styles.menu]}>
                    <AntDesign name='delete' size={30} color='#fff'/>
                </View>
            </TouchableWithoutFeedback>

            <OptionModal 
                texto={'Deseja excluir às questões?'} 
                isVisible={isVisible}
                onPress={Deletar}
                onPress2={()=>setVisible(!isVisible)}
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