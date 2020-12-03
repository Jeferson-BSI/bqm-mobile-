import React, { useState } from 'react';
import { 
    AsyncStorage
} from 'react-native';

import axios from 'axios';


const storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(
        key,
        data
      );
    } catch (error) {
      alert(error)
    }
};



async function QuestionStorage(op){
    UserToken = await AsyncStorage.getItem('user_token')

    const ApiGet = axios.create({
        baseURL: 'https://bq.mat.br/api/v1',
        timeout: 200,
        headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
        // headers: {'Authorization': 'Token ' + UserToken}
    });

    let page = ''
    let dados = []
    let i = 2
    
    try {

        while(1){
            const response = await ApiGet.get(`/${op}/${page}`)
            var {data} = response
            const { results, next } = data
            if (next !== null){
                alert(results)
                dados = dados.concat(results)
                page = `?page=${i}`;
                i++;
            }
            else{
               dados = dados.concat(results)
                break
            }
        }

       
        (i==2)
            ?storeData(op, JSON.stringify(data))
            :storeData(op, JSON.stringify({'count': i-1, 'pages': dados}))
  
    }
    catch(erro) {
        alert(erro+op)
    }
}



export default QuestionStorage;