import React from 'react';
import Entrar from '../pages/Entrar';
import { createStackNavigator } from '@react-navigation/stack';

const EntrarStack = createStackNavigator();

const EntrarRoutes= () => (
    <EntrarStack.Navigator>
        <EntrarStack.Screen
            name='Entrar'
            component={Entrar}
            options={{ headerShown:false }}
        />
    </EntrarStack.Navigator>
);

export default EntrarRoutes;
