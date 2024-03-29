import { AsyncStorage } from 'react-native';
import axios from 'axios';


async function DeleteQuestoes(id){
    const token = await AsyncStorage.getItem('user_token')

    const ApiDelete = axios.create({
        //baseURL: 'http://10.0.2.2:8000/api/v1',
        baseURL: 'https://beta.bq.mat.br/api/v1/',
        //baseURL: 'https://bq.mat.br/api/v1/',
        timeout: 500,
        //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
        headers: {'Authorization': 'Token ' + token}
    });

    try{
        const response = await ApiDelete.delete(`questao/${id}/`)
        //alert(JSON.stringify(response))
    }
    catch(err){
        //alert(err+ ' ao deletar')
        const response = await ApiDelete.delete(`questao/${id}/`)
    }

}


export default DeleteQuestoes;