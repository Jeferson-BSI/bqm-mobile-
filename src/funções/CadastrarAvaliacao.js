import {AsyncStorage } from 'react-native';
import axios from  'axios';


async function CadastrarAvaliacao(listaId, setAvaliacao){

    let token = null;
    let id = null;
    let qids = "";
    const horas = new Date();

    for (let i in listaId){
        qids += listaId[i]
        if((listaId.length -1) == i)
            break;
        else
            qids += ",";
    }

    try{
        token = await AsyncStorage.getItem('user_token')
        id = await AsyncStorage.getItem('user_id');
    }
    catch(erro){
        //alert(erro+"ao recupera do storage")
    };

    try{
        const ApiGet = axios.create({
            //baseURL: 'http://10.0.2.2:8000/api/v1', //'https://bq.mat.br/api/v1',
            baseURL: 'https://bq.mat.br/api/v1/',
            timeout: 500,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Token ' + token}
        });

        const avalicao = {
            'nome': `${horas.getTime()}`,
            'qids': qids,
            'cadastro_pelo_usuario': id
        };
        setAvaliacao(avalicao)
        
        //console.log(JSON.stringify(avalicao));
        const response = await ApiGet.post('imprimir/', avalicao);
        // (response !== null)
        // ?alert('Avaliação cadastrada com Sucesso!')
        // :null
    }

    catch(erro){
        //alert(erro);
        //alert('O correu um erro ao cadastra a Avaliação!');
    }

}



export default CadastrarAvaliacao;