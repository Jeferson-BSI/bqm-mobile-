import React, {useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';

import Routes from './src/routes/index';

//import Entrar from './src/pages/Entrar';

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

function App() {

  async function obterPermissao(){
    //alert('Você pre dar permissão!')
    const { granted } = await MediaLibrary.requestPermissionsAsync();

    if(!granted){obterPermissao
      alert('Você pre dar permissão!')
    }
  }

  useEffect(() => { obterPermissao()}, []);

  return (
    <NavigationContainer>
        <Routes />
    </NavigationContainer>
  );
}



export default App;
