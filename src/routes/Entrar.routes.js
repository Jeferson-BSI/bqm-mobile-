import React from 'react';
import Entrar from '../pages/Entrar';
import Sobre from '../pages/Sobre';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header'

const EntrarStack = createStackNavigator();

const EntrarRoutes = () => (
    <EntrarStack.Navigator screenOptions={{ header: () => <Header /> }}>

        <EntrarStack.Screen
            name='Entrar'
            component={ Entrar }
            //options={{ headerShown:false }}
        />
        
        <EntrarStack.Screen
            name='Sobre'
            component={ Sobre }
            
        />
    </EntrarStack.Navigator>
);


export default EntrarRoutes;
