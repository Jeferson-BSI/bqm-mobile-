import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from './src/routes/index';

//import Entrar from './src/pages/Entrar';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
        <Routes />
        {/*<Stack.Navigator>
        <Stack.Screen
          name='Entrar'
          component= { Entrar }
          options={{ headerShown:false }}
          />
      </Stack.Navigator>*/}
    </NavigationContainer>
  );
}



export default App;
