import React from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback,
    AsyncStorage
} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import DeleteQuestoes from '../funções/DeleteQuestoes';
import axios from 'axios'

export default function FabButton(props){
    const {list} = props
    function Deletar(){
        if(list.length == 0){
            return}
        alert(list)
        DeleteQuestoes()
        // const array = list.filter(DeleteQuestoes)
        // if(array.length == 0){
        //     alert('Questões deletadas');
        // }
    }
    async function Deletar() {
        const token = await AsyncStorage.getItem('user_token')

        const ApiDelete = axios.create({
            baseURL: 'https://bq.mat.br/api/v1',
            timeout: 100,
            //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
            headers: {'Authorization': 'Token ' + token}
        });
    
        try{
            const response = await ApiDelete.delete(`/questao/${2}/`)
            alert(JSON.stringify(response))
        }
        catch(err){
           alert(err+ ' ao deletar')
        }
    }

    return(
        <View style={[styles.conteiner, props.style]}>
            <TouchableWithoutFeedback
                onPress={()=>Deletar()}
                >
                <View style={[styles.button, styles.menu]}>
                    <AntDesign name='delete' size={30} color='#fff'/>
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