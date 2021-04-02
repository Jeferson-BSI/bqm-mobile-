import { 
    AsyncStorage
} from 'react-native';
import axios from 'axios';


async function QuestionStorage(op){
    const token = await AsyncStorage.getItem('user_token')

    const ApiGet = axios.create({
        baseURL: 'http://10.0.2.2:8000/api/v1', //'https://bq.mat.br/api/v1',
        timeout: 50,
        //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
        headers: {'Authorization': 'Token ' + token}
    });

    
    try{
        let page = 1
        let dados = []
        while (true) {
            const response = await ApiGet.get(`/${op}/?page=${page}`)
            const { results, next } = response.data
            dados = dados.concat(results)
            //alert(op)


            if(next !== null){
                page++}
            else{
                break}
        }
        //lert(JSON.stringify(dados[0]))
        
        if(dados !== null){
            try{
                await AsyncStorage.setItem(op, JSON.stringify(dados))
            }
            catch(erro){
                alert(erro)
            }
        }
    }
    catch(erro) {
        alert(erro)
    }

};


export default QuestionStorage;