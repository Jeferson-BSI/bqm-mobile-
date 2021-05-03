import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Inicio from '../pages/Inicio';
import Entrar from '../pages/Entrar';
import Sobre from '../pages/Sobre';
import Cadastro from '../pages/Cadastro';

import GerarAvaliacao from '../pages/usuario/GerarAvaliacao';
import Avaliacao from '../pages/usuario/Avaliacao';
import PlusQuestion from '../pages/usuario/PlusQuestion';

import Configuracao from '../pages/usuario/Configuracao';
import Bdquestoes from '../pages/usuario/Bdquestoes';
import AddQuestoes from '../pages/usuario/AddQuestoes';
import ListarQuestoes from '../pages/usuario/ListarQuestoes';
import ModficarSenha from '../pages/usuario/ModficarSenha';
import Manual from '../pages/usuario/Manual';
import ShowAvaliacao from '../pages/usuario/ShowAvaliacao';


import Epsilon from '../pages/usuario/Epsilon';


import PoliticaDePrivacidade from '../pages/PoliticaDePrivacidade';


import Header from '../components/Header'



import { Easing } from "react-native";


const config = {
  animation: 'timing',
  config: {
    duration: 150,
    easing: Easing.bezier(0.18,0.45,0.89,0.55) 
  },
};


const RoutesStack = createStackNavigator();
 
const Routes = () => (
    <RoutesStack.Navigator
        initialRouteName= 'Inicio'
        screenOptions={{ header: () => <Header /> }}>

        <RoutesStack.Screen
            name='Inicio'
            component={ Inicio }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}
        />


        <RoutesStack.Screen
            name='Epsilon'
            component={ Epsilon }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}
        />


        <RoutesStack.Screen
            name='Entrar'
            component={ Entrar }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}
        />
        
        <RoutesStack.Screen
            name='Sobre'
            component={ Sobre }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}            
        />

        <RoutesStack.Screen
            name='Configuracao'
            component={ Configuracao }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}            
        />

        <RoutesStack.Screen
            name='Bdquestoes'
            component={ Bdquestoes }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}            
        />
        

        <RoutesStack.Screen
            name='GerarAvaliacao'
            component={ GerarAvaliacao }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}            

        />

        <RoutesStack.Screen
            name='Avaliacao'
            component={ Avaliacao }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}
        />

        <RoutesStack.Screen
            name='PlusQuestion'
            component={ PlusQuestion }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}
        />

        
        <RoutesStack.Screen
            name='Manual'
            component={ Manual }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}            
        />

        <RoutesStack.Screen
            name='AddQuestoes'
            component={ AddQuestoes }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}            
        />

        <RoutesStack.Screen
            name='ListarQuestoes'
            component={ ListarQuestoes }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}
        />

        <RoutesStack.Screen
            name='PoliticaDePrivacidade'
            component={ PoliticaDePrivacidade }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}            
        />

        <RoutesStack.Screen
            name='ModficarSenha'
            component={ ModficarSenha }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}            
        />

        <RoutesStack.Screen
            name='ShowAvaliacao'
            component={ ShowAvaliacao }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}
        />

        <RoutesStack.Screen
            name='Cadastro'
            component={ Cadastro }
            options={{
                transitionSpec: {
                  open: config,
                  close: config,
                },
            }}
        />


    </RoutesStack.Navigator>
);


export default Routes;
