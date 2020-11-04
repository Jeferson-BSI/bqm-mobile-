import React, {useState, useEffect}  from 'react';

import FormRow from '../components/FormRow';
import Api from '../components/Api';

import Body from '../components/Body';
import Nav from '../components/Nav';
import Info from '../components/Info';
import Main from '../components/Main';

import {
  Text, View,ScrollView,
  StyleSheet, Image,
  TextInput, TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import { SvgXml } from 'react-native-svg';

import axios from 'axios';


import { useNavigation } from '@react-navigation/native';



function Entrar() {
 

  const navigation = useNavigation();

  async function CheckLogin(){

    ///let Access =''

    let Refresh = ''

      try {
      
        //Access = await AsyncStorage.getItem('access')

        Refresh = await AsyncStorage.getItem('refresh')

        //alert(Refresh)

        if (Refresh !== '') {

          try {

            const response = await Api.post('/token/bearer/refresh/', {
              "refresh": Refresh,
            });

            const { access } = response.data;

            //alert(access)

            if (access) {
            try {
            
              await AsyncStorage.setItem('access', access)
              //await AsyncStorage.setItem('refresh', refresh)

              navigation.navigate('Epsilon', {token:access})
             
            } catch (_err) {
                 //alert('Não foi possivel atualizar as informacoes em cache')
            }
            }

          } catch (_err) {

              //alert('Não foi possivel conectar ao servidor')
          }

        } else {
          //alert('Não tem dados em cache')
        }
        
      } catch (_err) {
          //alert('Não foi possivel buscar as informacoes em cache')
      }

  }

  React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        CheckLogin()
      });

      return unsubscribe;

    }, [navigation]);


  var token = ''

  async function ApiGetEtapa(){

    const ApiGet = axios.create({
      baseURL: 'https://bq.mat.br/api/v1',
      timeout: 30,
      headers: {'Authorization': 'Bearer ' + token}
    });

    try {
      const response = await ApiGet.get('/etapa/');
      const { results } = response.data;

        alert(results[4].etapa_nome)

      } catch (_err) {
        alert('Não foi possivel buscar as etapas')
    }

  }

  const [shouldShow, setShouldShow] = useState(false);
  const [loginShow, setLoginShow] = useState(true);

  async function handlesLogin(){
  
    try {

      
      setShouldShow(!shouldShow)
      setLoginShow(!loginShow)

      const response = await Api.post('/token/bearer/', {
        "email": User.email,
        "password": User.senha,
      });

      const { access, refresh } = response.data;

      if (access) {

        try {
        
          //salva as informacoes em cache
          await AsyncStorage.setItem('access', access)
          await AsyncStorage.setItem('refresh', refresh)

          setShouldShow(shouldShow)
          setLoginShow(loginShow)

          navigation.navigate('Epsilon', {token:access})
         
        } catch (_err) {
             alert('Não foi possivel salvar as informacoes em cache')
        }

      } else {
        
        setShouldShow(shouldShow)
        setLoginShow(loginShow)

        alert('Houve um problema com o login, verifique suas credenciais!')


      }

    } catch (_err) {

        setShouldShow(shouldShow)
        setLoginShow(loginShow)

        alert('Não foi possivel conectar ao servidor')
    }

    
  }
 
  const [email, onChangeEmail] = React.useState('epsilon@bq.mat.br');
  const [senha, onChangeSenha] = React.useState('23571113');

  const User = {
    'email': email,
    'senha': senha
  }

 
  const bqmIcon = `<svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 496.485 496.485" style="enable-background:new 0 0 496.485 496.485;" xml:space="preserve"> <circle style="fill:#d9d9d9;" cx="273.067" cy="191.612" r="191.612"/> <path style="fill:#d9d9d9;" d="M416.582,442.958c0-25.6,20.945-46.545,46.545-46.545H79.903c-25.6,0-46.545,20.945-46.545,46.545 s20.945,46.545,46.545,46.545h383.224C437.527,489.503,416.582,468.558,416.582,442.958z"/> <path style="fill:#0b2639;" d="M463.127,496.485H79.903c-29.479,0-53.527-24.048-53.527-53.527s24.048-53.527,53.527-53.527h383.224 c3.879,0,6.982,3.103,6.982,6.982c0,3.879-3.103,6.982-6.982,6.982c-21.721,0-39.564,17.842-39.564,39.564 c0,21.721,17.842,39.564,39.564,39.564c3.879,0,6.982,3.103,6.982,6.982C470.109,493.382,467.006,496.485,463.127,496.485z M79.903,402.618c-21.721,0-39.564,17.842-39.564,39.564c0,21.721,17.842,39.564,39.564,39.564h347.539 c-10.861-10.085-17.842-24.048-17.842-39.564c0-15.515,6.982-30.255,17.842-39.564H79.903z"/> <path style="fill:#FFFFFF;" d="M79.903,464.679c-11.636,0-21.721-10.085-21.721-21.721c0-11.636,10.085-21.721,21.721-21.721 h314.958c-2.327,6.982-3.103,13.964-3.103,21.721s1.552,14.739,3.103,21.721H79.903z"/> <g> <rect x="93.867" y="435.976" style="fill:#0b2639;" width="13.964" height="13.964"/> <rect x="194.715" y="435.976" style="fill:#0b2639;" width="13.964" height="13.964"/> </g> <rect x="294.788" y="435.976" style="fill:#0b2639;" width="13.964" height="13.964"/> <g> <rect x="144.291" y="435.976" style="fill:#0b2639;" width="13.964" height="13.964"/> <rect x="244.364" y="435.976" style="fill:#0b2639;" width="13.964" height="13.964"/> </g> <rect x="345.212" y="435.976" style="fill:#0b2639;" width="13.964" height="13.964"/> <rect x="82.23" y="323.491" style="fill:#d9d9d9;" width="380.897" height="72.145"/> <path style="fill:#0b2639;" d="M463.127,402.618H82.23c-3.879,0-6.982-3.103-6.982-6.982v-72.145c0-3.879,3.103-6.982,6.982-6.982 h380.897c3.879,0,6.982,3.103,6.982,6.982v72.145C470.109,399.515,467.006,402.618,463.127,402.618z M89.212,388.655h366.933 v-58.182H89.212V388.655z"/> <g> <rect x="128.776" y="330.473" style="fill:#FFFFFF;" width="7.758" height="58.182"/> <rect x="146.618" y="330.473" style="fill:#FFFFFF;" width="18.618" height="58.182"/> <rect x="409.057" y="330.861" style="fill:#FFFFFF;" width="7.758" height="58.182"/> <rect x="380.664" y="330.861" style="fill:#FFFFFF;" width="18.618" height="58.182"/> <path style="fill:#FFFFFF;" d="M363.055,58.958H183.079c-10.085,0-18.618,8.533-18.618,18.618v226.521 c0,10.085,8.533,18.618,18.618,18.618h179.976c10.085,0,18.618-8.533,18.618-18.618V78.352 C381.673,67.491,373.139,58.958,363.055,58.958z"/> </g> <path style="fill:#0b2639;" d="M363.055,51.976H183.079c-13.964,0-25.6,11.636-25.6,25.6v226.521c0,13.964,11.636,25.6,25.6,25.6 h179.976c13.964,0,25.6-11.636,25.6-25.6V78.352C388.655,63.612,377.018,51.976,363.055,51.976z M374.691,304.873 c0,6.982-5.43,11.636-11.636,11.636H183.079c-6.982,0-11.636-5.43-11.636-11.636V78.352c0-6.982,5.43-11.636,11.636-11.636h179.976 c6.982,0,11.636,5.43,11.636,11.636L374.691,304.873L374.691,304.873z"/> <path style="fill:#d9d9d9;" d="M251.345,234.279h-53.527c-5.43,0-10.085,4.655-10.085,10.085v41.115 c0,5.43,4.655,10.085,10.085,10.085h53.527c5.43,0,10.085-4.655,10.085-10.085v-41.115 C261.43,238.933,256.776,234.279,251.345,234.279z"/> <path style="fill:#0b2639;" d="M347.539,234.279h-52.752c-5.43,0-10.085,4.655-10.085,10.085v41.115 c0,5.43,4.655,10.085,10.085,10.085h53.527c5.43,0,10.085-4.655,10.085-10.085v-41.115 C357.624,238.933,352.97,234.279,347.539,234.279z"/> <g> <path style="fill:#d9d9d9;" d="M345.988,155.152h-51.976c-5.43,0-10.085,4.655-10.085,10.085v40.339 c0,5.43,4.655,10.085,10.085,10.085h51.976c5.43,0,10.085-4.655,10.085-10.085v-40.339 C356.073,159.03,351.418,155.152,345.988,155.152z"/> <path style="fill:#d9d9d9;" d="M251.345,155.152H199.37c-5.43,0-10.085,4.655-10.085,10.085v40.339 c0,5.43,4.655,10.085,10.085,10.085h51.976c5.43,0,10.085-4.655,10.085-10.085v-40.339 C261.43,159.03,256.776,155.152,251.345,155.152z"/> </g> <path style="fill:#d9d9d9;" d="M347.539,86.885H198.594c-4.655,0-8.533,3.879-8.533,8.533v34.909c0,4.655,3.879,8.533,8.533,8.533 h148.945c4.655,0,8.533-3.879,8.533-8.533V95.418C356.073,90.764,352.194,86.885,347.539,86.885z"/> <g> <polygon style="fill:#0b2639;" points="242.036,179.976 231.176,179.976 231.176,168.339 220.315,168.339 220.315,179.976 208.679,179.976 208.679,190.061 220.315,190.061 220.315,201.697 231.176,201.697 231.176,190.061 242.036,190.061   "/> <rect x="207.903" y="259.879" style="fill:#0b2639;" width="34.133" height="10.861"/> </g> <g> <rect x="304.097" y="269.964" style="fill:#FFFFFF;" width="34.133" height="10.861"/> <rect x="304.097" y="249.018" style="fill:#FFFFFF;" width="34.133" height="10.861"/> </g> <g> <polygon style="fill:#0b2639;" points="335.903,193.164 327.37,184.63 335.903,176.873 328.145,169.115 320.388,177.648 311.855,169.115 304.873,176.873 312.63,184.63 304.873,193.164 311.855,200.145 320.388,192.388 328.145,200.145   "/> <rect x="234.279" y="107.055" style="fill:#0b2639;" width="13.964" height="12.412"/> </g> <g> <rect x="266.085" y="107.055" style="fill:#0b2639;" width="13.964" height="12.412"/> <rect x="297.891" y="107.055" style="fill:#0b2639;" width="13.964" height="12.412"/> </g> </svg>`;
 
  return(
 
        <Body>

            <Nav>ENTRAR</Nav>

            <Info>ENTRAR</Info>

            <Main>

              <SvgXml style= {styles.bqmIcon} xml={bqmIcon} />

              <FormRow>
                <TextInput
                  style= {styles.mainTextInput}
                  placeholderTextColor= { '#0b2639' }
                  placeholder='Email'
                  autoCorrect={false}
                  keyboardType={'email-address'}
                  onChangeText={text => onChangeEmail(text)}
                  value={email}
                />
              </FormRow>

              <FormRow >
                <TextInput
                  style={ styles.mainTextInput }
                  placeholderTextColor= { '#0b2639' }
                  placeholder='Senha'
                  secureTextEntry={true}
                  onChangeText={text => onChangeSenha(text)}
                  value={senha}
                />
              </FormRow>

              {loginShow ? (
                <TouchableOpacity
                  style={styles.mainTouchableOpacity}
                  onPress={handlesLogin} >
                  <Text style={styles.mainTouchableOpacityText}> ENTRAR </Text>
                </TouchableOpacity>
               ) : null}

              {shouldShow ? (
                <View style={ styles.mainActivityIndicator }>
                  <ActivityIndicator  size='large' color='#fff'  />
                </View>
              ) : null}



            </Main>

        </Body>
 
  )
}
 

const styles = StyleSheet.create({

 
  mainActivityIndicator: {
      backgroundColor: '#0b2639', 
      width: '90%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 20,
  },


  bqmIcon: {
    marginTop: 30,
    marginBottom: 50,
    width: 200,
    height: 200,    
  
  },

  mainTextInput: {
      fontSize: 17,
      padding: 10,
      borderRadius: 10,
      width: '70%',
      height: 50,
  },

  mainTouchableOpacity: {
      backgroundColor: '#0b2639', //'#3397de',
      width: '90%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 20,
  },

  mainTouchableOpacityText: {
      color: 'white',
      fontSize: 18,
  }

});


export default Entrar;
