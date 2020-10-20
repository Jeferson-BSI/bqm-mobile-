
import React from 'react';
import Sobre from '../pages/Sobre';
import { createStackNavigator } from '@react-navigation/stack';

const SobreStack = createStackNavigator();

const SobreRoutes = () => (
    <SobreStack.Navigator>
        <SobreStack.Screen
            name='Sobre'
            component={Sobre}
        />
    </SobreStack.Navigator>
);


export default SobreRoutes;
