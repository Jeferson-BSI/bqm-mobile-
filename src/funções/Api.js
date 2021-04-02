import axios from 'axios';
import {AsyncStorage} from 'react-native';

async function token(){
  const token = await AsyncStorage.getItem('user_token');
  return token;
}

//alert(token)
const Api = axios.create({
    baseURL: 'http://10.0.2.2:8000/api/v1',//'https://beta.bq.mat.br/api/v1',
    timeout: 100,
    headers: {'Authorization': 'Token ' + token()}
  });

export default Api;