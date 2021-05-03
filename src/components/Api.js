import axios from 'axios';


/* Endereços para cada emulador/simulador:
** Genymotion:              http://10.0.3.2:3333/
** Emulador Android Studio: http://10.0.2.2:3333/
** Simulador IOS:           http://localhost:3333/
*/

const Api = axios.create({
  baseURL: 'https://bq.mat.br/api/v1',
  
  //baseURL: 'http://10.0.2.2:8000/api/v1',//'https://bq.mat.br/api/v1',
});


export default Api;