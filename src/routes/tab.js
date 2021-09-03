import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome, Entypo, FontAwesome5
} from '@expo/vector-icons';

import Inicio from '../pages/Inicio';
import Sobre from '../pages/Sobre';
import PoliticaDePrivacidade from '../pages/PoliticaDePrivacidade';
import Entrar from '../pages/Entrar';
import Header from '../components/Header'


const Tab = createMaterialTopTabNavigator();

const RoutesTab = () => (
    <Tab.Navigator
         initialRouteName= 'Inicio'
        screenOptions={{ header: () => <Header /> }}
        tabBarOptions={{
          showIcon:true,
          iconStyle: {
            width: '100%',
          },
          tabStyle: {alignItems: 'center'},
          style: {
            borderBottomColor: 'transparent',
          },
          activeTintColor: '#286090',
          inactiveTintColor: '#286090',
          labelStyle: { 
            fontSize: 8,
            //paddingTop: 10
          },
          tabStyle: {
            padding: 0
          }
        }}
        >

        <Tab.Screen
            name='Home'
            component={ Inicio }
            options={{
              tabBarIcon: ({ size, color}) => (<FontAwesome name='home' size={30} color={color}/>),
            }}
        />

        <Tab.Screen
            name='Sobre'
            component={ Sobre }
            options={{
              tabBarIcon: ({ size, color}) => (<Entypo name='info-with-circle' size={30} color={color}/>),
            }}            
            />
       
        <Tab.Screen
            name='Privacidade'
            component={ PoliticaDePrivacidade }
            options={{
              tabBarIcon: ({ size, color}) => (<FontAwesome5 name='shield-alt' size={30} color={color}/>),
              }}            
        />

        <Tab.Screen
            name='Entrar'
            component={ Entrar }
            options={{
              tabBarIcon: ({ size, color}) => (<Entypo name='login' size={30} color={color}/>),
            }}
        />
    </Tab.Navigator>
);


export default RoutesTab;
