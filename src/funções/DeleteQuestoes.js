import React from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';


async function DeleteQuestoes(id){
    const token = await AsyncStorage.getItem('user_token')

    const ApiDelete = axios.create({
        baseURL: 'https://bq.mat.br/api/v1/',
        timeout: 100,
        //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
        headers: {'Authorization': 'Token ' + token}
    });

    try{
        const response = await ApiDelete.delete(`questao/${1}`)
        alert(JSON.stringify(response))
    }
    catch(err){
        alert(err+ ' ao deletar1')
    }
}


export default DeleteQuestoes;