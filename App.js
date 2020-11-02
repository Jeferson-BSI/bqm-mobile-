import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes/index';

//import Entrar from './src/pages/Entrar';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

function App() {
  return (
    <NavigationContainer>
        <Routes />
    </NavigationContainer>
  );
}



export default App;
